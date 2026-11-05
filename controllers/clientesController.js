

import * as service from '../services/clientesService.js';


export async function criar(req, res, next) {
  try {
    const id = await service.criar(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (erro) {
    next(erro);
  }
}


export async function listar(req, res, next) {
  try {
    const clientes = await service.listarTodos();
    res.json(clientes);
  } catch (erro) {
    next(erro);
  }
}


export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params;
    const cliente = await service.buscarPorId(id);

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (erro) {
    next(erro);
  }
}


export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;

    const clienteExistente = await service.buscarPorId(id);
    if (!clienteExistente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    await service.atualizar(id, req.body);


    const clienteAtualizado = await service.buscarPorId(id);
    res.json(clienteAtualizado);
  } catch (erro) {
    next(erro);
  }
}



export async function deletar(req, res, next) {
  try {
    const { id } = req.params;
    const linhasRemovidas = await service.deletar(id);

    if (linhasRemovidas === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}
