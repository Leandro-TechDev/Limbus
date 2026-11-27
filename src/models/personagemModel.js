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

function buscarPersonagens(idUser) {
  const instrucaoSql = `
    SELECT
      p.id, p.nome, p.descricaoLivro,
      up.nota, up.curiosidade,
      l.titulo
    from personagem p LEFT JOIN livro l
      ON l.id = p.livro_id
    LEFT JOIN usuario_personagem up
      ON p.id = up.personagem_id
      AND usuario_id = ${idUser};
  `
  console.log(`Executando a instrução: ${instrucaoSql}`);
  return database.executar(instrucaoSql)
}

function avaliacao(uId, pId, nota, curio) {
  const instrucaoSql = `
  INSERT INTO usuario_personagem (usuario_id, personagem_id, nota, curiosidade)
  VALUES (${uId}, ${pId}, ${nota}, '${curio}') as novo
    ON DUPLICATE KEY UPDATE
      nota = novo.nota, 
      curiosidade = novo.curiosidade;
  `
  console.log(`Executando a instrução: ${instrucaoSql}`)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarPersonagem,
  buscarPersonagens,
  avaliacao
}