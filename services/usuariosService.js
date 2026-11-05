

import pool from '../config/db.js';


export async function criar({ nome, email, senhaHash }) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return resultado.insertId;
}

export async function buscarPorEmail(email) {
  const [linhas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return linhas[0];
}
