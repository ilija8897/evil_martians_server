import pool from '../db.js';

export const userService = {
    registration: async (email: string, password: string) => {
        const newUser = await pool.query(
            `INSERT INTO users (login) values ('${email}');`
        );
        return newUser;
    },
};
