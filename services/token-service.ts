import jwt from "jsonwebtoken";
import pool from "../db.js";

export const tokenService = {
  generateTokens: (payload: any) => {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    return { accessToken, refreshToken };
  },
  saveToken: async (userId: any, refreshToken: any) => {
    const tokenExist = await pool.query(
      `SELECT * FROM tokens WHERE userid = '${userId}';`
    );
    if (tokenExist) {
      await pool.query(
        `UPDATE tokens SET refreshtoken='${refreshToken}' WHERE userid='${userId}';`
      );
    }
    await pool.query(
      `INSERT INTO tokens (userid, refreshtoken) VALUES ('${userId}', '${refreshToken}');`
    );
  },
};
