var express = require('express');
var router = express.Router();
var facturasController = require('../controllers/facturasController.js');
const jwt = require('jsonwebtoken')

function ValidateToken(req, res, next) {
  const accessToken = req.headers['authorization'] || req.query.accessToken;
  if (!accessToken) {
    res.send('Access Denied');
  } else {
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
      if (err) {
        res.send('Access Denied due to token expired or incorrect');
      } else {
        var token = accessToken;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.data = decoded.user[0];

        next();
      }
    });
  }
}

router.get('/', async function(req, res, next) {
  const data = req.data; 
  switch(data.workplace){
    case 'facturador':
      const resultados = await facturasController.todos();
      res.json(resultados);
    break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});

router.post('/', async function(req, res, next) {
  const data = req.data; 
  switch(data.workplace){
    case 'facturador':
      const resultados = await facturasController.new(req.body);
      res.json(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.get("/:id",async function(req, res, next) {
  const data = req.data; 
  switch(data.workplace){
    case 'facturador':
      const resultados = await facturasController.search(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.put("/:id", async function(req, res, next) {
  const data = req.data; 
  switch(data.workplace){
    case 'facturador':
      const resultados = await facturasController.update(req.params.id , req.body);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.delete("/:id",async function(req, res, next) {
  const data = req.data; 
  switch(data.workplace){
    case 'facturador':
      const resultados = await facturasController.delete(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
})

module.exports = router;