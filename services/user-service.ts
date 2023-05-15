import pool from "../db.js";
import bcript from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { mailService } from "./mail-service.js";
import { tokenService } from "./token-service.js";

export const userService = {
  registration: async (email: string, password: string) => {
    const candidate = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    if (candidate.rows[0]) {
      throw new Error("User alredy exist");
    }
    const hashPassword = await bcript.hash(password, 3);
    const activateLink = uuidv4();

    await pool.query(
      `INSERT INTO users (email, password, activate_link) VALUES ('${email}', '${hashPassword}', '${activateLink}');`
    );
    const createdUser = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );

    await mailService.sendMail(
      email,
      `https://evil-martians-server.onrender.com/api/activate/${activateLink}`
    );
    const tokens = tokenService.generateTokens({ role: "user" });
    await tokenService.saveToken(createdUser.rows[0].id, tokens.refreshToken);

    return {
      ...tokens,
      activateLink,
    };
  },
  activation: async (link: string) => {
    console.log(link);

    const user = await pool.query(
      `SELECT * FROM users WHERE activate_link = '${link}';`
    );
    console.log(user);

    if (!user.rows[0]) throw new Error("Activation error!");

    await pool.query(
      `UPDATE users SET is_activated='true' WHERE id='${user.rows[0].id}';`
    );
  },
};
