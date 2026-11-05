

import express from 'express';
import * as controller from '../controllers/clientesController.js';
import { validarCliente, validarAtualizacaoCliente } from '../middlewares/validarCliente.js';

const router = express.Router();

router.post('/clientes', validarCliente, controller.criar);
router.get('/clientes', controller.listar);
router.get('/clientes/:id', controller.buscarPorId);
router.patch('/clientes/:id', validarAtualizacaoCliente, controller.atualizar); 
router.delete('/clientes/:id', controller.deletar);

export default router;
