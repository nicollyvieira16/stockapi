
import pool from '../config/db.js';
import { montarAtualizacao } from '../utils/montarAtualizacao.js';

const CAMPOS_ATUALIZAVEIS = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categoria_id'];

export async function criar(produto) {
  const { nome, descricao, preco, quantidade_estoque, categoria_id } = produto;


  const [resultado] = await pool.query(
    `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, categoria_id)
     VALUES (?, ?, ?, ?, ?)`,
    [nome, descricao ?? null, preco, quantidade_estoque ?? 0, categoria_id ?? null]
  );

  return resultado.insertId;
}

export async function listarTodos() {
  const [linhas] = await pool.query(
    `SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco,
            produtos.quantidade_estoque, categorias.nome AS categoria
     FROM produtos
     LEFT JOIN categorias
       ON produtos.categoria_id = categorias.id`
  );
  return linhas;
}


export async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco,
            produtos.quantidade_estoque, categorias.nome AS categoria
     FROM produtos
     LEFT JOIN categorias
       ON produtos.categoria_id = categorias.id
     WHERE produtos.id = ?`,
    [id]
  );
  return linhas[0];
}


export async function atualizar(id, campos) {
  const { setClause, valores } = montarAtualizacao(campos, CAMPOS_ATUALIZAVEIS);

  const [resultado] = await pool.query(
    `UPDATE produtos SET ${setClause} WHERE id = ?`,
    [...valores, id]
  );

  return resultado.affectedRows;
}

export async function deletar(id) {
  const [resultado] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
  return resultado.affectedRows;
}
