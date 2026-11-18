const database = require("../database/config")

function buscarTemas(id) {
  const instrucaoSql = `
    SELECT
    t.descricao as tema
    FROM tema t JOIN personagem_tema pt
      ON t.id = pt.tema_id
    JOIN personagem p
      ON p.id = pt.personagem_id
    WHERE p.id = '${id}';
  `
  console.log(`Executando a instrução: ${instrucaoSql}`);
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarTemas
}