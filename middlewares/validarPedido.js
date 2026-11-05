
import { responderValidacao } from '../utils/respostasErro.js';

const STATUS_MAX = 20;

function erroStatus(status) {
  if (typeof status !== 'string' || !status.trim()) return 'status deve ser um texto não vazio';
  if (status.length > STATUS_MAX) return `status deve ter no máximo ${STATUS_MAX} caracteres`;
  return null;
}


export function validarPedido(req, res, next) {
  const { cliente_id, status } = req.body;
  const erros = [];

  if (cliente_id === undefined) {
    erros.push('cliente_id é obrigatório');
  } else if (!Number.isInteger(cliente_id)) {
    erros.push('cliente_id deve ser um número inteiro');
  }

  if (status !== undefined && erroStatus(status)) erros.push(erroStatus(status));

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}

export function validarAtualizacaoPedido(req, res, next) {
  const { status } = req.body;
  const erros = [];

  if (status === undefined) erros.push('status é obrigatório');
  else if (erroStatus(status)) erros.push(erroStatus(status));

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}
