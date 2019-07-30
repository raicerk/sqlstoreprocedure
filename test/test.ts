import SQLSP from '../lib/index';

let sp: any = new SQLSP("sa", "127.0.0.1", "contactos", "password.")

sp.exec('spRec_contactos_ObtieneDatosPorEstado', { estado: true }).then(response => {
    console.log(response.recordset)
}).catch(err => {
    console.log(err)
})