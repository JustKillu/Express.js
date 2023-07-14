const {productos} = require("../models/productosModels");

class productosController {
    
    check(){
      console.log('Todos las productos: ')
      return productos;
    }
  
    new(newProduacto){
      productos.push(newProduacto);
      console.log("Se ha creado una nuevo cuenta y se regresara la lista de las productos: ");
      return (productos);
    }
  
  
    search(searchID){
      var id = + searchID;
      var search = productos.findIndex(u => u.id == id)
      var res = "id: " + id + " pertenece a:  " + productos[search].producto;
      return(res);
    }
  
  
    update(searchID , newProduacto){
      var id = + searchID;
      var search = productos.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(productos[search].id == id){ 
        console.log("La cuenta con la id:  "+ id + "sera actualizado");
        console.log(productos[search]);
        productos[search]= newProduacto;
        console.log("La cuenta ha sido actualizado");
        console.log(productos[search]);
      }
    }
  
    delete(searchID){
      var id = + searchID;
      var search = productos.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(productos[search].id == id){
        console.log("La id que ha colocado: " + id + "Ha sido elimnado.");
        productos.splice(search,1);
      }
    }
  } 
  
  module.exports = new productosController();