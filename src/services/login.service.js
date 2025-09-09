import pool from '../app/lib/db.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (email, password) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1;', [email]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
        return user;
    }else{
        throw new Error('Invalid email or password');
    }
};