

import pool from '../config/db.js';

export async function criar(pedido) {
  const { cliente_id, status } = pedido;

  const [resultado] = await pool.query(
    'INSERT INTO pedidos (cliente_id, status) VALUES (?, ?)',
    [cliente_id, status || 'pendente']
  );

  return resultado.insertId;
}

export async function listarTodos() {
  const [linhas] = await pool.query(
    `SELECT pedidos.id, pedidos.data_pedido, pedidos.status,
            clientes.nome AS cliente
     FROM pedidos
     INNER JOIN clientes
       ON pedidos.cliente_id = clientes.id`
  );
  return linhas;
}

export async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `SELECT pedidos.id, pedidos.data_pedido, pedidos.status,
            clientes.nome AS cliente
     FROM pedidos
     INNER JOIN clientes
       ON pedidos.cliente_id = clientes.id
     WHERE pedidos.id = ?`,
    [id]
  );
  return linhas[0];
}


export async function atualizarStatus(id, status) {
  const [resultado] = await pool.query(
    'UPDATE pedidos SET status = ? WHERE id = ?',
    [status, id]
  );
  return resultado.affectedRows;
}


export async function deletar(id) {
  const [resultado] = await pool.query('DELETE FROM pedidos WHERE id = ?', [id]);
  return resultado.affectedRows;
}
