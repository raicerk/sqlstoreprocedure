const sql = require('mssql');

class sqlsp {

    /**
     * 
     * @param {*} UserDB 
     * @param {*} IPServer 
     * @param {*} DBName 
     * @param {*} Password 
     */
    constructor(UserDB, IPServer, DBName, Password) {
        this.connPoolPromise = null;
        this.cadenaConexion = `workstation id=server;packet size=4096;user id=${UserDB};data source=${IPServer};initial catalog=${DBName};password=${Password}`;
    }

    /**
     * 
     */
    connect() {

        var conexion = this.cadenaConexion;

        if (this.connPoolPromise) return this.connPoolPromise;

        this.connPoolPromise = new Promise(function (resolve, reject) {

            var conn = new sql.ConnectionPool(conexion);

            conn.on('close', function () {
                this.connPoolPromise = null;
            });

            conn.connect().then(function (connPool) {
                return resolve(connPool);
            }).catch(function (err) {
                connPoolPromise = null;
                return reject(err);
            });
        });

        return this.connPoolPromise;

    }

    /**
     * 
     * @param {*} ProcedimientoAlmacenado 
     * @param {*} ObjetoVariables 
     */
    exec(ProcedimientoAlmacenado, ObjetoVariables) {

        return new Promise((resolve, reject) => {


            this.connect().then(function (connPool) {

                var request = new sql.Request(connPool);

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
                        console.log('---------------------')
                        console.log(`Error: ${err}`);
                        console.log('1---------------------')
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })

                sql.on('error', err => {
                    console.log('---------------------')
                    console.log(`Error: ${err}`)
                    console.log('---------------------')
                    reject(err);
                })

            })

        });
    }
}

module.exports = sqlsp;