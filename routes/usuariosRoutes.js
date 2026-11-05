

import express from 'express';
import * as controller from '../controllers/usuariosController.js';
import { validarRegistro, validarLogin } from '../middlewares/validarUsuario.js';

const router = express.Router();

router.post('/usuarios/registro', validarRegistro, controller.registrar);
router.post('/usuarios/login', validarLogin, controller.login);

export default router;
