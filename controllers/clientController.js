const con = require("../models/db")

class clientesController {

   todos() {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM clientes", function (error, results, fields) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log("Todos los clientes son: ", results);
          resolve(results);
        }
      });
    });
  }
  
   new(infodb) {
    return new Promise((resolve, reject) => {
      const { id, Nombre, Apellido, Pais } = infodb;
  
      const query = 'INSERT INTO clientes (id, Nombre, Apellido, Pais) VALUES (?, ?, ?, ?)';
      const values = [id, Nombre, Apellido, Pais];
      con.query(query, values, (error, results) => {
        if (error) {
          console.error('Error al insertar datos:', error);
          reject('Error al insertar datos en la base de datos');
        } else {
          console.log('Datos insertados correctamente');
          resolve('Datos insertados correctamente');
        }
      });
    });
  }
   
  search(query) {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM clientes WHERE id = '${query}'`, (error, results) => {
        if (error) {
          console.error('Error al ejecutar la consulta: ', error);
          reject(error);
        } else {
          console.log('Resultados de la consulta: ', results);
          resolve(results);
        }
      });
    });
  }
  

  
    update(query , data){
    return new Promise((resolve, reject) => {  
  const { id, Nombre, Apellido, Pais } = data;
  const sql = `UPDATE clientes SET nombre = '${Nombre}', apellido = '${Apellido}', pais = '${Pais}' WHERE id = ${query}`;
  con.query(sql, (error, result) => {
    if(error){
      console.log('Hubo un error y no se pudo actualizar los datos')
      reject(error);
    }else{
      console.log('Datos actualizados exitosamente');
      resolve(result);
    }
  })
}) 
}
   
delete(query){
  return new Promise((resolve, reject) => {  
const sql = `DELETE FROM clientes WHERE id = ${query}`;
con.query(sql, (error, result) => {
  if(error){
    console.log('Hubo un error y no se pudo eliminar los datos')
    reject(error);
  }else{
    console.log('Datos borrados exitosamente');
    resolve(result);
  }
})
}) 
}
  } 
  
  module.exports = new clientesController();