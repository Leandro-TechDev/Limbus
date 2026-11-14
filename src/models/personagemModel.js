const database = require("../database/config")

function buscarPersonagem(id) {
  const instrucaoSql = `
    SELECT
    p.id, p.nome, p.descricaoLivro, p.descricaoJogo, 
    l.titulo, l.autor
    from personagem p JOIN livro l
    ON p.livro_id = l.id
    WHERE p.id = '${id}';
  `
  console.log(`Executando a instrução: ${instrucaoSql}`);
  return database.executar(instrucaoSql)
}


module.exports = {
  buscarPersonagem
}