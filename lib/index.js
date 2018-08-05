const sql = require('mssql');

/**
 * sdsa
 */
class sqlsp {

    /**
     * 
     * @param {*} UserDB 
     * @param {*} IPServer 
     * @param {*} DBName 
     * @param {*} Password 
     */
    constructor(UserDB, IPServer, DBName, Password) {
        this.cadenaConexion = `workstation id=server;packet size=4096;user id=${UserDB};data source=${IPServer};initial catalog=${DBName};password=${Password}`;
    }


    connect() {
        try {
            pool = sql.connect(this.cadenaConexion)
            console.log('Servidor de base de datos conectado');
        } catch (err) {
            console.log(`Error en la conexion servidor de base de datos, error ${err}`);
        }

    }

    /**
     * 
     * @param {*} ProcedimientoAlmacenado 
     * @param {*} ObjetoVariables 
     */
    exec(ProcedimientoAlmacenado, ObjetoVariables) {
        
        return new Promise((resolve, reject) => {

            var request = pool.request();

            for (var llave in ObjetoVariables) {

                switch (typeof ObjetoVariables[llave]) {
                    case 'string':
                        request.input(String(llave), sql.VarChar(sql.MAX), ObjetoVariables[llave])
                        break;
                    case 'number':
                        request.input(String(llave), sql.Int, ObjetoVariables[llave])
                        break;
                    case 'object':
                        request.input(String(llave), sql.DateTime, ObjetoVariables[llave])
                        break;
                    case 'Boolean':
                        request.input(String(llave), sql.Bit, ObjetoVariables[llave])
                        break;
                    default:
                        request.input(String(llave), sql.VarChar(sql.MAX), ObjetoVariables[llave])
                        break;
                }
            }

            request.execute(ProcedimientoAlmacenado, (err, result) => {
                if (err) {
                    console.log('1---------------------')
                    console.log(err);
                    console.log('1---------------------')
                    reject(err);
                } else {
                    resolve(result);
                }
            })

            sql.on('error', err => {
                console.log('2---------------------')
                console.log(err)
                console.log('2---------------------')
                reject(err);
            })
        });
    }
}

module.exports = sqlsp;