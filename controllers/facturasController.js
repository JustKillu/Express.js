const {facturas} = require("../models/facturasModels");

class facturasController {
    
    check(){
      console.log('Todos las facturas: ')
      return facturas;
    }
  
    new(newFactura){
      facturas.push(newFactura);
      console.log("Se ha creado una nuevo factura y se regresara la lista de las facturas: ");
      return (facturas);
    }
  
  
    search(searchfecha){
      const fechaBuscada = searchfecha;
      const facturasFiltradas = facturas.filter(factura => factura.fecha === fechaBuscada);
      
      facturasFiltradas.forEach(factura => {console.log(factura)
        });
    return("pertenece a:  " + JSON.stringify(facturasFiltradas))
    
    }
  
  
    update(searchID , newFactura){
      var id = + searchID;
      var search = facturas.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(facturas[search].id == id){ 
        console.log("La factura con la id:  "+ id + "sera actualizado");
        console.log(facturas[search]);
        facturas[search]= newFactura;
        console.log("La factura ha sido actualizado");
        console.log(facturas[search]);
      }
    }
  
    delete(searchID){
      var id = + searchID;
      var search = facturas.findIndex(u => u.id == id)
      if (search == "-1" ){
        console.log("La id que ha colocado: " + id + "No esta en la base de datos");
      }else if(facturas[search].id == id){
        console.log("La id que ha colocado: " + id + "Ha sido elimnado.");
        facturas.splice(search,1);
      }
    }
  } 
  
  module.exports = new facturasController();