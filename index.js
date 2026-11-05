

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import produtosRoutes from './routes/produtosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import itensPedidoRoutes from './routes/itensPedidoRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

if (!process.env.JWT_SECRET) {
  console.warn('AVISO: JWT_SECRET não definido no .env — login e rotas protegidas vão falhar.');
}

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('StockAPI no ar'));


app.use('/api', produtosRoutes);
app.use('/api', clientesRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', itensPedidoRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', usuariosRoutes);


app.use((req, res) => {
  res.status(404).json({
    erro: `Rota ${req.method} ${req.originalUrl} não encontrada`,
  });
});


app.use((erro, req, res, next) => {
  console.error(erro);


  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }

  if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ erro: 'referência inválida — o registro relacionado não existe' });
  }


  if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(400).json({ erro: 'não é possível remover — existem registros vinculados a este' });
  }

  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
