var express = require('express');
var router = express.Router();
var cuentasController = require('../controllers/cuentasController');

router.get('/', async function(req, res, next) {
  try {
    const resultados = await cuentasController.todos();
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async function(req, res, next) {
  try {
    const resultados = await cuentasController.new(req.body);
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.get("/:id",async function(req, res, next) {
  try {
    const resultados = await cuentasController.search(req.params.id);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.put("/:id", async function(req, res, next) {
  try {
    const resultados = await cuentasController.update(req.params.id , req.body);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

  
});


router.delete("/:id",async function(req, res, next) {
  try {
    const resultados = await cuentasController.delete(req.params.id);
    res.send(resultados);
  } catch (error) {
   console.log(error)
  }
})

module.exports = router;