const express = require("express");
const router = express.Router();

const personagemController = require("../controllers/personagemController");

router.get("/sinner/:id", function(req, res){
  personagemController.infoPersonagem(req, res)
})

module.exports = router;