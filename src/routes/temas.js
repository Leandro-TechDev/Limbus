const express = require("express");
const router = express.Router();

const temaController = require("../controllers/temaController");

router.get("/temas/:id", function(req, res){
  temaController.temaPersonagem(req, res)
})

module.exports = router;