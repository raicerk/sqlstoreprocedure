import SQLSP from '../lib/index';

let sql = new SQLSP("sa", "127.0.0.1", "contactos", "R84857374r.")

sql.exec('spRec_contactos_ObtieneDatosPorEstado', { estado: true }).then(response => {
    console.log(response.recordset)
}).catch(err => {
    console.log(err)
})