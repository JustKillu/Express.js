var express = require('express');
var router = express.Router();
var facturasController = require('../controllers/facturasController.js');


router.get('/', function(req, res, next) {
  res.send(facturasController.check());
});


router.post('/', function(req, res, next) {
 
  const factura = facturasController.new(req.body);
  res.send(factura);

});


router.get("/:fecha", function(req, res, next) {

  res.send(facturasController.search(req.params.fecha));

});


router.put("/:id", function(req, res, next) {

  res.send(facturasController.update(req.params.id , req.body));
  
});


router.delete("/:id", function(req, res, next) {

  res.send(facturasController.delete(req.params.id));
  
});

module.exports = router;