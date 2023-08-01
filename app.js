var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const con = require("./models/db")
const jwt = require('jsonwebtoken')
require('dotenv').config();
var indexCuentas = require('./routes/cuentas');
var indexClientes = require('./routes/clientes');
var indexFacturas = require('./routes/facturas');
var indexProductos = require('./routes/productos');
var indexRepartidores = require('./routes/repartidores');
const fs = require('fs');
var app = express();
const cProducto = require('./controllers/productosController');
const cCliente = require('./controllers/clientController');
const cFacturas = require('./controllers/facturasController');
const cCuentas = require('./controllers/cuentasController');
const cRepartidores = require('./controllers/repartidoresController');
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', ValidateToken, (req, res) => {
  console.log(req.data)
  res.render('index', { currentId: req.userId, token: req.data });
});

app.get('/login', (req, res) => {
  res.render(`login`);

});

app.get('/listaproductos', ValidateToken, (req, res) => {
  if (req.userId.workplace === 'facturador') {
    con.query('SELECT * FROM productos', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      } else {
        
        res.render(`listaproductos`, { productos: results, token: req.data });
      }
    });
  } else {
    res.redirect('/acceso-denegado');
  }
});

app.get('/listaclients', ValidateToken, (req, res) => {
  if (req.userId.workplace === 'contador') {
    con.query('SELECT * FROM clientes', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      } else {
        
        res.render(`listaclients`, { clientes: results, token: req.data });
      }
    });
  } else {
    res.redirect('/acceso-denegado');
  }
});

app.get('/listafacturas', ValidateToken, (req, res) => {
  if (req.userId.workplace === 'facturador') {
    con.query('SELECT * FROM facturas', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      } else {
        
        res.render(`listafacturas`, { facturas: results, token: req.data });
      }
    });
  } else {
    res.redirect('/acceso-denegado');
  }
});

app.get('/edit',(req, res) => {
  const tipo = req.query.tipo;
  const id = req.query.id;
  console.log(tipo,id)
  res.render('edit', { tipo, id, token: req.query.accessToken });
});

app.get('/listacuentas', ValidateToken, (req, res) => {
  if (req.userId.workplace === 'contador') {
    con.query('SELECT * FROM cuentas', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      } else {
        
        res.render(`listacuentas`, { cuentas: results, token: req.data });
      }
    });
  } else {
    res.redirect('/acceso-denegado');
  }
});

app.get('/listarepartidores', ValidateToken, (req, res) => {
  if (req.userId.workplace === 'facturador') {
    con.query('SELECT * FROM repartidores', (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos');
      } else {
        
        res.render(`listarepartidores`, { repartidor: results, token: req.data });
      }
    });
  } else {
    res.redirect('/acceso-denegado');
  }
});


app.get('/acceso-denegado', (req, res) => {
  res.render('acceso-denegado');
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

app.get('/initialize-database', (req, res) => {
  
});

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const user = username;
  const pass = password;
  
  con.query(`SELECT * FROM trabajadores WHERE username = '${user}' AND password='${pass}'`, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      res.redirect('/acceso-denegado');
    } else {
      if (results.length === 0) {
        res.status(401).json({
          message: 'Usuario no encontrado',
        });
      } else {
        const accessToken = generateAccessToken(results);
        res.header('authorization', accessToken).json({
          message: 'Usuario autentificado',
          token: accessToken,
        });
      }
    }
  });
});

//////// Productos ////////////

app.post('/deleteproducto/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cProducto.delete(id)
    .then(() => {
      res.send('Datos borrados exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo eliminar los datos');
      console.log(error)
    });
});

app.post('/addproducto',ValidateToken, (req, res) => {
  cProducto.new(req.body)
    .then(() => {
      res.send('Datos añadidos exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo añadir los datos');
      console.log(error)
    });
});


//////// Clientes ////////////
app.post('/deletecliente/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cCliente.delete(id)
    .then(() => {
      res.send('Datos borrados exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo eliminar los datos');
      console.log(error)
    });
});

app.post('/addcliente', ValidateToken,(req, res) => {
  cCliente.new(req.body)
    .then(() => {
      res.send('Datos añadidos exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo añadir los datos');
      console.log(error)
    });
});


///////// Cuentas ////////////

app.post('/deletecuentas/:id',ValidateToken, (req, res) => {
  const id = req.params.id;
  cCuentas.delete(id)
    .then(() => {
      res.send('Datos borrados exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo eliminar los datos');
      console.log(error)
    });
});

app.post('/addcuentas',ValidateToken, (req, res) => {
  cCuentas.new(req.body)
    .then(() => {
      res.send('Datos añadidos exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo añadir los datos');
      console.log(error)
    });
});

///////// Facturas ////////////

app.post('/deletefacturas/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cFacturas.delete(id)
    .then(() => {
      res.send('Datos borrados exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo eliminar los datos');
      console.log(error)
    });
});

app.post('/addfacturas', ValidateToken,(req, res) => {
  cFacturas.new(req.body)
    .then(() => {
      res.send('Datos añadidos exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo añadir los datos');
      console.log(error)
    });
});

///////// Repartidores ////////////

app.post('/deleterepartidores/:id',ValidateToken, (req, res) => {
  const id = req.params.id;
  cRepartidores.delete(id)
    .then(() => {
      res.send('Datos borrados exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo eliminar los datos');
      console.log(error)
    });
});

app.post('/addrepartidores',ValidateToken, (req, res) => {
  cRepartidores.new(req.body)
    .then(() => {
      res.send('Datos añadidos exitosamente');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error y no se pudo añadir los datos');
      console.log(error)
    });
});

////// editcuenta /////////
app.post('/editcuenta/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cCuentas.update(id , req.body)
  .then(() => {
    res.send('Datos añadidos exitosamente');
  })
  .catch((error) => {
    res.status(500).send('Hubo un error y no se pudo añadir los datos');
    console.log(error)
  });
});


///// editcliente /////

app.post('/editclientes/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cCliente.update(id , req.body)
  .then(() => {
    res.send('Datos añadidos exitosamente');
  })
  .catch((error) => {
    res.status(500).send('Hubo un error y no se pudo añadir los datos');
    console.log(error)
  });
});

///// editproductos /////

app.post('/editproductos/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cProducto.update(id , req.body)
  .then(() => {
    res.send('Datos añadidos exitosamente');
  })
  .catch((error) => {
    res.status(500).send('Hubo un error y no se pudo añadir los datos');
    console.log(error)
  });
});

///// editfacturas /////

app.post('/editfacturas/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cFacturas.update(id , req.body)
  .then(() => {
    res.send('Datos añadidos exitosamente');
  })
  .catch((error) => {
    res.status(500).send('Hubo un error y no se pudo añadir los datos');
    console.log(error)
  });
});

///// editfacturas /////

app.post('/editrepartidores/:id', ValidateToken,(req, res) => {
  const id = req.params.id;
  cRepartidores.update(id , req.body)
  .then(() => {
    res.send('Datos añadidos exitosamente');
  })
  .catch((error) => {
    res.status(500).send('Hubo un error y no se pudo añadir los datos');
    console.log(error)
  });
});


function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '10m' })
}

function ValidateToken(req, res, next) {
  const accessToken = req.header['authorization'] || req.query.accessToken
  if (!accessToken) res.send('Access Denied')

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      res.redirect('/acceso-denegado');
    } else {
      var token = accessToken;
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.user[0];
      req.data = accessToken

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