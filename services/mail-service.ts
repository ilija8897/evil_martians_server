import { pool } from '../db.js';

export const userService = {
    registration: async (email: string, password: string) => {
        const candidate = await pool.query('SELECT login FROM users');
        console.log(candidate);
    },
};
