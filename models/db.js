var mysql = require('mysql');
require('dotenv').config({ path: 'env.production' })
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USUARIO,
  password : process.env.DB_CLAVE,
  database: process.env.DB_DBNOMBRE,
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = connection