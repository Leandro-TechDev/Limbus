const personagemModel = require("../models/personagemModel");

function infoPersonagem(req, res) {
  var Sinner = req.params.id;

  if (Sinner < 1 || Sinner > 12) {
    return req.status(404).send("Esse personagem não existe!", Sinner)
  }

  personagemModel.buscarPersonagem(Sinner).then(
    function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      if (resultado.length == 1) {
        console.log(resultado);
        res.status(200).json(resultado[0])
      } else if (resultado.length == 0) {
        res.status(403).send("Personagem não encontrado no MYSQL");
      } else {
        res.status(403).send("Dois personagens foram pegos");
      }
    }
  )
}

function personagens(req, res){
  var idUser = req.params.id
  if (idUser == undefined) { return res.status(404).send('Id inexistente') }

  personagemModel.buscarPersonagens(idUser).then(function (dados) {
    console.log(`Resultados: ${JSON.stringify(dados)}`)

    if (dados.length > 0) {
      res.status(200).json(dados)
    } else {
      res.status(403).send('Algum personagem não foi encontrado!')
    }
  })
}

function avaliacao(req, res) {
  let userId = req.body.usuarioId;
  let personagemId = req.body.personagemId;
  let nota = req.body.nota;
  let curio = req.body.curiosidade;


  if (userId == '' || userId == undefined) {
    res.status(401).send('Nenhum usuário identifiicado')
  } else if (personagemId == '' || personagemId == undefined) {
    res.status(401).send('Nenhum livro escolhido')
  } else if (nota == '' || nota == undefined) {
    res.status(401).send('Nenhuma nota enviada')
  } else if(curio == '' || curio == undefined){
    res.status(401).send('Nenhuma nota de curiosidade enviada')
  } else {
    personagemModel.avaliacao(userId, personagemId, nota, curio).then(
      function (resultado) {
        console.log(`Resultados: ${JSON.stringify(resultado)}`)

        if (resultado.affectedRows === 1 || resultado.affectedRows === 2) { res.status(200).json(resultado) } 
        else { res.status(400).send('Nenhum insert realizado!') }
      }
    )
  }
  
}

module.exports = {
  infoPersonagem,
  personagens,
  avaliacao
}