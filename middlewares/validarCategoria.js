
import { responderValidacao } from '../utils/respostasErro.js';

const NOME_MAX = 60;

export function validarCategoria(req, res, next) {
  const { nome } = req.body;
  const erros = [];

  if (nome === undefined) {
    erros.push('nome é obrigatório');
  } else if (typeof nome !== 'string' || !nome.trim()) {
    erros.push('nome deve ser um texto não vazio');
  } else if (nome.length > NOME_MAX) {
    erros.push(`nome deve ter no máximo ${NOME_MAX} caracteres`);
  }

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}
