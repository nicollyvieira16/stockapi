
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function autenticar(req, res, next) {

  const cabecalho = req.headers.authorization;


  if (!cabecalho) {
    return res.status(401).json({ erro: 'sem token' });
  }


  const token = cabecalho.split(' ')[1];

  try {

    const dados = jwt.verify(token, process.env.JWT_SECRET);


    req.usuario = dados;

    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'token invalido' });
  }
}
