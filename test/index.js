var sqlsp = require('../lib/index')

let sp = new sqlsp('userdb', '192.168.0.100', 'databasename', 'password');

var datos = {
    "Parametro" : "Valor",
    "Parametro2" : 2,
    "Parametro3" : true
};

sp.exec('ProcedimientoAlmacenado',datos).then(resultado=>{
    console.log(resultado);
    console.log("--------------------------------------------------------------")
}).catch(error=>{
    console.log(`error en la ejecución del sp: ${error}`);
})