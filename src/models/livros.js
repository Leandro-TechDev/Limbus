const database = require("../database/config")

function buscarLivros(id) {
  const instrucaoSql = `
    SELECT
      l.id, l.titulo, l.autor, l.urlCapa,
      ul.nota, ul.descricao
    from livro l LEFT JOIN usuario_livro ul
      ON l.id = ul.livro_id
      AND usuario_id = ${id};
  `
  console.log(`Executando a instrução: ${instrucaoSql}`);
  return database.executar(instrucaoSql)
}

function avaliacao(uId, lId, nota, desc) {
  const instrucaoSql = `
  INSERT INTO usuario_livro (usuario_id, livro_id, nota, descricao)
  VALUES (${uId}, ${lId}, ${nota}, '${desc}') as novo
   ON DUPLICATE KEY UPDATE
     nota = novo.nota,
     descricao = novo.descricao;
  `
  console.log(`Executando a instrução: ${instrucaoSql}`)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarLivros,
  avaliacao
}