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
        res.status(201).json(resultado[0])
      } else if (resultado.length == 0) {
        res.status(403).send("Personagem não encontrado no MYSQL");
      } else {
        res.status(403).send("Dois personagens foram pegos");
      }
    }
  )
}

module.exports = {
  infoPersonagem
}