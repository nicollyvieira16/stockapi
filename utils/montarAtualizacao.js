
export function montarAtualizacao(corpo, camposPermitidos) {


  const campos = Object.keys(corpo).filter((campo) => camposPermitidos.includes(campo));

  const setClause = campos.map((campo) => `${campo} = ?`).join(', ');


  const valores = campos.map((campo) => corpo[campo]);

  return { setClause, valores };
}
