import pool from '../app/lib/db';
import bcrypt from 'bcryptjs';

export const registerUser = async (nombre, email, password, rol = 'cliente') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING usuario_id, nombre, email, rol, registrado_en;',
        [nombre, email, hashedPassword, rol]
    );
    return result.rows[0];
};