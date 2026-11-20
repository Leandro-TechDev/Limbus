const livroModel = require("../models/livros");

function infoLivros(req, res) {
  let userId = req.params.id;
  livroModel.buscarLivros(userId).then(
    function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      if (resultado.length >= 1) {
        console.log(resultado);
        res.status(200).json(resultado)
      } else {
        res.status(403).send("Nenhum livro encontrado");
      }
    }
  )
}

function avaliacoes(req, res) {
  let userId = req.body.usuarioId;
  let livroId = req.body.livroId;
  let nota = req.body.nota;
  let desc = req.body.descricao;
  if (userId == '' || userId == undefined) {
    res.status(401).send('Nenhum usuário identifiicado')
  } else if (livroId == '' || livroId == undefined) {
    res.status(401).send('Nenhum livro escolhido')
  } else if (nota == '' || nota == undefined) {
    res.status(401).send('Nenhuma nota enviada')
  } else {
    livroModel.avaliacao(userId, livroId, nota, desc).then(
      function (resultado) {
        console.log(`\n Resultados encontrados: ${resultado.length}`)
        console.log(`Resultados: ${JSON.stringify(resultado)}`)

        if (resultado.affectedRows === 1) { res.status(200).json(resultado) } 
        else { res.status(400).send('Nenhum insert realizado!') }
      }
    )
  }
  
}

module.exports = {
  infoLivros,
  avaliacoes
}