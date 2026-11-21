const express = require("express");
const router = express.Router();

const personagemController = require("../controllers/personagemController");

router.get("/sinner/:id", function(req, res){
  personagemController.infoPersonagem(req, res)
})

router.get("/:id", function(req, res){
  personagemController.personagens(req, res)
})

module.exports = router;