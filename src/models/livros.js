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


module.exports = {
  buscarLivros
}