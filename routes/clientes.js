var express = require('express');
var router = express.Router();
var clientesController = require('../controllers/clientController.js');
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
  switch (data.workplace) {
    case 'contador':
      const resultados = await clientesController.todos();
      res.json(resultados);
      break;
    default:
      res.json('No eres el contador');
      console.log('No eres el contador');
      break;
  }
});

router.post('/', ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'contador':
      const resultados = await clientesController.new(req.body);
      res.json(resultados);
      break;
    default:
      res.json('No eres el contador');
      console.log('No eres el contador');
      break;
  }
});


router.get("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'contador':
      const resultados = await clientesController.search(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el contador');
      console.log('No eres el contador');
      break;
  }
});


router.put("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'contador':
      const resultados = await clientesController.update(req.params.id , req.body);
      res.send(resultados);
      break;
    default:
      res.json('No eres el contador');
      console.log('No eres el contador');
      break;
  }
});


router.delete("/:id", ValidateToken,async function(req, res, next) {
  const data = req.data; 
  switch (data.workplace) {
    case 'contador':
      const resultados = await clientesController.delete(req.params.id);
      res.send(resultados);
      break;
    default:
      res.json('No eres el contador');
      console.log('No eres el contador');
      break;
  }
})

module.exports = router;