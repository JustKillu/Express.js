var express = require('express');
var router = express.Router();
var repartidoresController = require('../controllers/repartidoresController');

router.get('/', async function(req, res, next) {
  try {
    const resultados = await repartidoresController.todos();
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async function(req, res, next) {
  try {
    const resultados = await repartidoresController.new(req.body);
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.get("/:id",async function(req, res, next) {
  try {
    const resultados = await repartidoresController.search(req.params.id);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.put("/:id", async function(req, res, next) {
  try {
    const resultados = await repartidoresController.update(req.params.id , req.body);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

  
});


router.delete("/:id",async function(req, res, next) {
  try {
    const resultados = await repartidoresController.delete(req.params.id);
    res.send(resultados);
  } catch (error) {
   console.log(error)
  }
})

module.exports = router;