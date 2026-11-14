const temaModel = require("../models/temaModel");

function temaPersonagem(req, res) {
  var Sinner = req.params.id;

  if (Sinner < 1 || Sinner > 12) {
    return req.status(404).send("Esse personagem não existe!", Sinner)
  }

  temaModel.buscarTemas(Sinner).then(
    function (resultado) {
      console.log(`\nResultados encontrados: ${resultado.length}`);
      console.log(`Resultados: ${JSON.stringify(resultado)}`);

      if (resultado.length >= 1) {
        console.log(resultado);
        res.status(200).json(resultado[0])
      } else if (resultado.length == 0) {
        res.status(403).send("Personagem não tem tema correlacionado");
      } else {
        res.status(403).send("Error");
      }
    }
  )
}

module.exports = {
  temaPersonagem
}