var express = require('express');
var router = express.Router();
var productosController = require('../controllers/productosController');


router.get('/', function(req, res, next) {
  res.send(productosController.check());
});


router.post('/', function(req, res, next) {
 
  const producto = productosController.new(req.body);
  res.send(producto);

});


router.get("/:id", function(req, res, next) {

  res.send(productosController.search(req.params.id));

});


router.put("/:id", function(req, res, next) {

  res.send(productosController.update(req.params.id , req.body));
  
});


router.delete("/:id", function(req, res, next) {

  res.send(productosController.delete(req.params.id));
  
});

module.exports = router;