var express = require('express');
var router = express.Router();
var facturasController = require('../controllers/facturasController.js');


router.get('/', async function(req, res, next) {
  try {
    const resultados = await facturasController.todos();
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async function(req, res, next) {
  try {
    const resultados = await facturasController.new(req.body);
    res.json(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.get("/:id",async function(req, res, next) {
  try {
    const resultados = await facturasController.search(req.params.id);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }

});


router.put("/:id", async function(req, res, next) {
  try {
    const resultados = await facturasController.update(req.params.id , req.body);
    res.send(resultados);
  } catch (error) {
    console.log(error)
  }


});


router.delete("/:id",async function(req, res, next) {
  try {
    const resultados = await facturasController.delete(req.params.id);
    res.send(resultados);
  } catch (error) {
   console.log(error)
  }
})

module.exports = router;