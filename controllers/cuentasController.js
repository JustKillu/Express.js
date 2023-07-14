const con = require("../models/db")

class cuentasController {
   
  todos() {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM cuentas", function (error, results, fields) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log("Todos las cuentas son: ", results);
          resolve(results);
        }
      });
    });
  }
  
   new(infodb) {
    return new Promise((resolve, reject) => {
      const { id, acreditador, saldo, estado } = infodb;
  
      const query = 'INSERT INTO cuentas (id, acreditador, saldo, estado) VALUES (?, ?, ?, ?)';
      const values = [id,acreditador, saldo, estado];
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
      con.query(`SELECT * FROM cuentas WHERE id = '${query}'`, (error, results) => {
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
  const { id, acreditador, saldo, estado} = data;
  const sql = `UPDATE cuentas SET acreditador = '${acreditador}', saldo = '${saldo}', estado = '${estado}' WHERE id = ${query}`;
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
const sql = `DELETE FROM cuentas WHERE id = ${query}`;
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
  module.exports = new cuentasController();