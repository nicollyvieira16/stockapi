
import { responderValidacao } from '../utils/respostasErro.js';

const NOME_MAX = 100;
const PRECO_MAX = 99999999.99;


const CAMPOS_PRODUTO = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categoria_id'];

function erroNome(nome) {
  if (typeof nome !== 'string' || !nome.trim()) return 'nome deve ser um texto não vazio';
  if (nome.length > NOME_MAX) return `nome deve ter no máximo ${NOME_MAX} caracteres`;
  return null;
}

function erroPreco(preco) {
  if (typeof preco !== 'number' || !(preco > 0) || preco > PRECO_MAX) {
    return `preco deve ser um número maior que zero e até ${PRECO_MAX}`;
  }
  return null;
}

function erroEstoque(qtd) {


  if (!Number.isInteger(qtd) || qtd < 0) return 'quantidade_estoque deve ser um número inteiro maior ou igual a zero';
  return null;
}

function erroCategoria(id) {


  if (!Number.isInteger(id)) return 'categoria_id deve ser um número inteiro (ou null)';
  return null;
}

function erroDescricao(descricao) {
  if (typeof descricao !== 'string') return 'descricao deve ser um texto (ou null)';
  return null;
}


export function validarProduto(req, res, next) {
  const { nome, descricao, preco, quantidade_estoque, categoria_id } = req.body;


  const erros = [];

  if (nome === undefined) erros.push('nome é obrigatório');
  else if (erroNome(nome)) erros.push(erroNome(nome));

  if (preco === undefined) erros.push('preco é obrigatório');
  else if (erroPreco(preco)) erros.push(erroPreco(preco));


  if (quantidade_estoque !== undefined && erroEstoque(quantidade_estoque)) erros.push(erroEstoque(quantidade_estoque));
  if (descricao !== undefined && descricao !== null && erroDescricao(descricao)) erros.push(erroDescricao(descricao));
  if (categoria_id !== undefined && categoria_id !== null && erroCategoria(categoria_id)) erros.push(erroCategoria(categoria_id));

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}


export function validarAtualizacaoProduto(req, res, next) {
  const { nome, descricao, preco, quantidade_estoque, categoria_id } = req.body;
  const erros = [];

  const enviados = Object.keys(req.body).filter((campo) => CAMPOS_PRODUTO.includes(campo));
  if (enviados.length === 0) {
    erros.push(`envie pelo menos um campo para atualizar (${CAMPOS_PRODUTO.join(', ')})`);
  }

  if (nome !== undefined && erroNome(nome)) erros.push(erroNome(nome));
  if (preco !== undefined && erroPreco(preco)) erros.push(erroPreco(preco));
  if (quantidade_estoque !== undefined && erroEstoque(quantidade_estoque)) erros.push(erroEstoque(quantidade_estoque));
  if (descricao !== undefined && descricao !== null && erroDescricao(descricao)) erros.push(erroDescricao(descricao));
  if (categoria_id !== undefined && categoria_id !== null && erroCategoria(categoria_id)) erros.push(erroCategoria(categoria_id));

  if (erros.length > 0) return responderValidacao(res, erros);
  next();
}
