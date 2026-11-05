

import pool from '../config/db.js';
import { montarAtualizacao } from '../utils/montarAtualizacao.js';


const CAMPOS_ATUALIZAVEIS = ['quantidade', 'preco_unitario'];

export async function criar(item) {
  const { pedido_id, produto_id, quantidade, preco_unitario } = item;

  const [resultado] = await pool.query(
    `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
     VALUES (?, ?, ?, ?)`,
    [pedido_id, produto_id, quantidade, preco_unitario]
  );

  return resultado.insertId;
}
export async function listarTodos() {
  const [linhas] = await pool.query(
    `SELECT itens_pedido.id, itens_pedido.quantidade, itens_pedido.preco_unitario,
            produtos.nome AS produto,
            pedidos.id AS pedido_numero, pedidos.status AS pedido_status
     FROM itens_pedido
     INNER JOIN produtos ON itens_pedido.produto_id = produtos.id
     INNER JOIN pedidos ON itens_pedido.pedido_id = pedidos.id`
  );
  return linhas;
}

export async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `SELECT itens_pedido.id, itens_pedido.quantidade, itens_pedido.preco_unitario,
            produtos.nome AS produto,
            pedidos.id AS pedido_numero, pedidos.status AS pedido_status
     FROM itens_pedido
     INNER JOIN produtos ON itens_pedido.produto_id = produtos.id
     INNER JOIN pedidos ON itens_pedido.pedido_id = pedidos.id
     WHERE itens_pedido.id = ?`,
    [id]
  );
  return linhas[0];
}


export async function atualizar(id, campos) {
  const { setClause, valores } = montarAtualizacao(campos, CAMPOS_ATUALIZAVEIS);

  const [resultado] = await pool.query(
    `UPDATE itens_pedido SET ${setClause} WHERE id = ?`,
    [...valores, id]
  );

  return resultado.affectedRows;
}

export async function deletar(id) {
  const [resultado] = await pool.query('DELETE FROM itens_pedido WHERE id = ?', [id]);
  return resultado.affectedRows;
}
