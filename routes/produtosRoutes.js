
import express from 'express';
import * as controller from '../controllers/produtosController.js';
import { validarProduto, validarAtualizacaoProduto } from '../middlewares/validarProduto.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router();



router.post('/produtos', validarProduto, controller.criar);
router.get('/produtos', controller.listar);
router.get('/produtos/:id', controller.buscarPorId);

router.patch('/produtos/:id', validarAtualizacaoProduto, controller.atualizar);


router.delete('/produtos/:id', autenticar, controller.deletar);

export default router;
