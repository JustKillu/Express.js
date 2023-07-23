var express = require('express');
var router = express.Router();
var repartidoresController = require('../controllers/repartidoresController');
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

router.get('/', ValidateToken, async function (req, res, next) {
  const data = req.data; 
  console.log(data.workplace)
  switch (data.workplace) {
    case 'facturador':
      const resultados = await repartidoresController.todos();
      res.json(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});

router.post('/', ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'facturador':
      const resultados = await repartidoresController.new(req.body);
      res.json(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.get("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'facturador':
      const resultados = await repartidoresController.search(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.put("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'facturador':
      const resultados = await repartidoresController.update(req.params.id , req.body);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
});


router.delete("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'facturador':
      const resultados = await repartidoresController.delete(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el facturador');
      console.log('No eres el facturador');
      break;
  }
})

module.exports = router;