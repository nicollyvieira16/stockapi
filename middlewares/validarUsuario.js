

import { responderValidacao } from '../utils/respostasErro.js';

const NOME_MAX = 100;
const EMAIL_MAX = 120;
const SENHA_MIN = 6;
const SENHA_MAX = 72;

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export function validarRegistro(req, res, next) {
  const { nome, email, senha } = req.body;
  const erros = [];

  if (typeof nome !== 'string' || !nome.trim()) {
    erros.push('nome é obrigatório e deve ser um texto não vazio');
  } else if (nome.length > NOME_MAX) {
    erros.push(`nome deve ter no máximo ${NOME_MAX} caracteres`);
  }

  if (typeof email !== 'string' || !FORMATO_EMAIL.test(email)) {
    erros.push('email é obrigatório e deve ser um e-mail válido (ex.: nome@dominio.com)');
  } else if (email.length > EMAIL_MAX) {
    erros.push(`email deve ter no máximo ${EMAIL_MAX} caracteres`);
  }

  if (typeof senha !== 'string' || senha.length < SENHA_MIN || senha.length > SENHA_MAX) {
    erros.push(`senha é obrigatória e deve ter entre ${SENHA_MIN} e ${SENHA_MAX} caracteres`);
  }

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}

export function validarLogin(req, res, next) {
  const { email, senha } = req.body;
  const erros = [];

  if (typeof email !== 'string' || !email) erros.push('email é obrigatório e deve ser um texto');
  if (typeof senha !== 'string' || !senha) erros.push('senha é obrigatória e deve ser um texto');

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}
