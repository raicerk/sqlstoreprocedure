var sqlsp = require('../lib/index');

var sp = new sqlsp('sa','192.168.0.60','Intranet','');

sp.connect();
var datos = {};
datos["variable1"] = "dato";
datos["variable2"] = 2;

sp.exec('procedimientoalmacenado',datos).then(resultado=>{
    console.log(resultado);
}).catch(error=>{
    console.log("error en la ejecucion del sp");
})