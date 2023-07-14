var express = require('express');
var router = express.Router();
var clientesController = require('../controllers/clientController.js');

router.get('/', async function(req, res, next) {
  try {
    const resultados = await clientesController.todos();
    res.json(resultados);
  } catch (error) {
    // Manejar el error de alguna manera
  }
});

router.post('/', async function(req, res, next) {
  try {
    const resultados = await clientesController.new(req.body);
    res.json(resultados);
  } catch (error) {
    // Manejar el error de alguna manera
  }

});


router.get("/:id",async function(req, res, next) {
  try {
    const resultados = await clientesController.search(req.params.id);
    res.send(resultados);
  } catch (error) {
    // Manejar el error de alguna manera
  }

});


router.put("/:id", async function(req, res, next) {
  try {
    const resultados = await clientesController.update(req.params.id , req.body);
    res.send(resultados);
  } catch (error) {
    // Manejar el error de alguna manera
  }

  
});


router.delete("/:id",async function(req, res, next) {
  try {
    const resultados = await clientesController.delete(req.params.id);
    res.send(resultados);
  } catch (error) {
   console.log(error)
  }
})

module.exports = router;