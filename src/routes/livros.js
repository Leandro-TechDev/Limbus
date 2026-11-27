const express = require("express");
const router = express.Router();

const livroController = require("../controllers/livroController");

router.get("/:id", function(req, res){
  livroController.infoLivros(req, res)
})

router.post('/avaliacoes', function(req, res){
  livroController.avaliacoes(req, res)
})

module.exports = router;