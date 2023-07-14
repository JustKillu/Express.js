const con = require("../models/db")

class facturasController {
  todos() {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM facturas", function (error, results, fields) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log("Todos los productos son: ", results);
          resolve(results);
        }
      });
    });
  }
  
   new(infodb) {
    return new Promise((resolve, reject) => {
      const { id, nombre, motivo, fecha, valor } = infodb;
  
      const query = 'INSERT INTO facturas (id, nombre, motivo, fecha, valor) VALUES (?, ?, ?, ?, ?)';
      const values = [id, nombre, motivo, fecha, valor];
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
      con.query(`SELECT * FROM facturas WHERE fecha = '${query}'`, (error, results) => {
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
  const {id, nombre, motivo, fecha, valor} = data;
  const sql = `UPDATE facturas SET nombre = '${nombre}', motivo = '${motivo}', fecha = '${fecha}', valor='${valor}' WHERE id = ${query}`;
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
const sql = `DELETE FROM facturas WHERE id = ${query}`;
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
  
  module.exports = new facturasController();