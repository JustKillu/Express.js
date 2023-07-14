var express = require('express');
var router = express.Router();
var cuentasController = require('../controllers/cuentasController');


router.get('/', function(req, res, next) {
  res.send(cuentasController.check());
});


router.post('/', function(req, res, next) {
 
  const cliente = cuentasController.new(req.body);
  res.send(cliente);

});


router.get("/:id", function(req, res, next) {

  res.send(cuentasController.search(req.params.id));

});


router.put("/:id", function(req, res, next) {

  res.send(cuentasController.update(req.params.id , req.body));
  
});


router.delete("/:id", function(req, res, next) {

  res.send(cuentasController.delete(req.params.id));
  
});

module.exports = router;