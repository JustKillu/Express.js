var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productosController');

router.get('/', async function(req, res, next) {
  try {
    const resultados = await productosController.todos();
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async function(req, res, next) {
  try {
    const resultados = await productosController.new(req.body);
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.get("/:id",async function(req, res, next) {
  try {
    const resultados = await productosController.search(req.params.id);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.put("/:id", async function(req, res, next) {
  try {
    const resultados = await productosController.update(req.params.id , req.body);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

  
});


router.delete("/:id",async function(req, res, next) {
  try {
    const resultados = await productosController.delete(req.params.id);
    res.send(resultados);
  } catch (error) {
   console.log(error)
  }
})

module.exports = router;