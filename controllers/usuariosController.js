


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as service from '../services/usuariosService.js';

export async function registrar(req, res, next) {
  try {
    const { nome, email, senha } = req.body;


    const senhaHash = await bcrypt.hash(senha, 10);

    const id = await service.criar({ nome, email, senhaHash });


    res.status(201).json({ id, email });
  } catch (erro) {

    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'email em uso' });
    }
    next(erro);
  }
}


export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const usuario = await service.buscarPorEmail(email);


    if (!usuario) {
      return res.status(401).json({ erro: 'invalido' });
    }


    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'invalido' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (erro) {
    next(erro);
  }
}
