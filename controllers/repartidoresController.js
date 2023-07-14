const con = require("../models/db")
class repartidoresController {    
    todos() {
      return new Promise((resolve, reject) => {
        con.query("SELECT * FROM repartidores", function (error, results, fields) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log("Todos los repartidores son: ", results);
            resolve(results);
          }
        });
      });
    }
    
     new(infodb) {
      return new Promise((resolve, reject) => {
        const { id, nombre, apellido, vehiculo, sector } = infodb;
    
        const query = 'INSERT INTO repartidores (id, nombre, apellido, vehiculo, sector) VALUES (?, ?, ?, ?, ?)';
        const values = [id, nombre, apellido, vehiculo, sector];
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
        con.query(`SELECT * FROM repartidores WHERE id = '${query}'`, (error, results) => {
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
    const {id, nombre, apellido, vehiculo, sector} = data;
    const sql = `UPDATE repartidores SET nombre = '${nombre}', apellido = '${apellido}',vehiculo='${vehiculo}', sector = '${sector}' WHERE id = ${query}`;
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
  const sql = `DELETE FROM repartidores WHERE id = ${query}`;
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

  module.exports = new repartidoresController();