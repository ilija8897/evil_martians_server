import pool from "../db.js";
import bcript from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { mailService } from "./mail-service.js";
import { tokenService } from "./token-service.js";
import { ApiError } from "../exceptions/api-errors.js";

type User = {
  id: number;
  email: string;
  password: string;
};
type UserQueryResult = {
  rows: User[];
};

export const userService = {
  registration: async (email: string, password: string) => {
    const candidate: UserQueryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    if (candidate.rows[0]) {
      throw ApiError.BadRequest("User alredy exist");
    }
    const hashPassword = await bcript.hash(password, 3);
    const activateLink = uuidv4();

    await pool.query(
      `INSERT INTO users (email, password, activate_link) VALUES ('${email}', '${hashPassword}', '${activateLink}');`
    );
    const createdUser: UserQueryResult = await pool.query(
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
    const user: UserQueryResult = await pool.query(
      `SELECT * FROM users WHERE activate_link = '${link}';`
    );

    if (!user.rows[0]) throw ApiError.BadRequest("Activation error!");

    await pool.query(
      `UPDATE users SET is_activated='true' WHERE id='${user.rows[0].id}';`
    );
  },
  login: async (email: string, password: string) => {
    const candidate = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    if (!candidate.rows[0]) {
      throw ApiError.BadRequest("User not found");
    }
    const passwordIsValid = await bcript.compare(
      password,
      candidate.rows[0].password
    );
    if (!passwordIsValid) {
      throw ApiError.BadRequest("Invalid password");
    }
    if (!candidate.rows[0].is_activated) {
      throw ApiError.BadRequest("Email not virify");
    }
    const tokens = tokenService.generateTokens({ role: "user" });
    const createdUser: UserQueryResult = await pool.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    await tokenService.saveToken(createdUser.rows[0].id, tokens.refreshToken);

    return {
      ...tokens,
    };
  },
};
