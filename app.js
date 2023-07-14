var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { clientes } = require("./models/db.js");
var productosController = require('./controllers/productosController');
const { resultados } = productosController.todos()

var indexCuentas = require('./routes/cuentas');
var indexClientes = require('./routes/clientes');
var indexFacturas = require('./routes/facturas');
var indexProductos = require('./routes/productos');
var indexRepartidores = require('./routes/repartidores');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { clientes });
});
app.get('/viewproductos', (req, res) => {
  res.render('viewproductos',{ resultados: resultados } );
});
app.get('/addclients', (req, res) => {
  res.render('addclients');
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