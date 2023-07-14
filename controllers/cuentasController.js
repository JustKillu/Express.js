const {cuentas} = require("../models/cuentasModels");

class cuentasController {
    
    check(){
      console.log('Todos las cuentas: ')
      return cuentas;
    }
  
    new(newCuenta){
      cuentas.push(newCuenta);
      console.log("Se ha creado una nuevo cuenta y se regresara la lista de las cuentas: ");
      return (cuentas);
    }
  
  
    search(searchID){
      var id = + searchID;
      var search = cuentas.findIndex(u => u.id == id)
      var res = "id: " + id + " pertenece a:  " + cuentas[search].acreditador;
      return(res);
    }
  
  
    update(searchID , newCuenta){
      var id = + searchID;
      var search = cuentas.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(cuentas[search].id == id){ 
        console.log("La cuenta con la id:  "+ id + "sera actualizado");
        console.log(cuentas[search]);
        cuentas[search]= newCuenta;
        console.log("La cuenta ha sido actualizado");
        console.log(cuentas[search]);
      }
    }
  
    delete(searchID){
      var id = + searchID;
      var search = cuentas.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(cuentas[search].id == id){
        console.log("La id que ha colocado: " + id + "Ha sido elimnado.");
        cuentas.splice(search,1);
      }
    }
  } 
  
  module.exports = new cuentasController();