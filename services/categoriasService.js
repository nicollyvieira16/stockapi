
import pool from '../config/db.js';


export async function criar(categoria) {
  const { nome } = categoria;

  const [resultado] = await pool.query(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );

  return resultado.insertId;
}


export async function listarTodos() {
  const [linhas] = await pool.query('SELECT * FROM categorias');
  return linhas;
}


export async function buscarPorId(id) {
  const [linhas] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
  return linhas[0];
}


export async function atualizar(id, categoria) {
  const { nome } = categoria;

  const [resultado] = await pool.query(
    'UPDATE categorias SET nome = ? WHERE id = ?',
    [nome, id]
  );

  return resultado.affectedRows;
}


export async function deletar(id) {
  const [resultado] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
  return resultado.affectedRows;
}
