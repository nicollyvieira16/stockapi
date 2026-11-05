

export function responderValidacao(res, detalhes) {

  return res.status(400).json({ erro: 'Dados inválidos', detalhes });
}
