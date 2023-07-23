var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const info=[]
const con = require("./models/db")
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
require('dotenv').config();
var indexCuentas = require('./routes/cuentas');
var indexClientes = require('./routes/clientes');
var indexFacturas = require('./routes/facturas');
var indexProductos = require('./routes/productos');
var indexRepartidores = require('./routes/repartidores');
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', ValidateToken, (req, res) => {
  res.render('index',{ currentId:req.userId });
});
app.get('/login', (req, res) => {
  res.render(`login`);
  
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cuentas', indexCuentas);
app.use('/clientes', indexClientes);
app.use('/facturas', indexFacturas);
app.use('/productos', indexProductos);
app.use('/repartidores', indexRepartidores);


app.post('/auth', (req, res) => {
  const { username, password } = req.body
  const user = username
  const pass = password
  con.query(`SELECT * FROM trabajadores WHERE username = '${user}' AND password='${pass}'`, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      res.send(error);
    }else{

      const accessToken = generateAccessToken(results);
      res.header('authorization',accessToken).json({
        message:'Usuario autentificado',
        token: accessToken,
      })
    }
  });
});


function generateAccessToken(user){
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '1m'})
}

function ValidateToken(req,res,next){
  const accessToken = req.header['authorization'] || req.query.accessToken
  if(!accessToken) res.send('Access Denied')

  jwt.verify(accessToken, process.env.SECRET, ( err,user)=>{
    if(err){
      res.send('Access Denied due token expired or incorrect')
    }else{
      var token = accessToken;
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.user[0];
      console.log(req.userId)
      next();
    }
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
console.log("Server is running!!");