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

module.exports = {
  infoLivros
}