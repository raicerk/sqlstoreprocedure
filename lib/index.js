const sql = require('mssql');

class SQLSP {

    constructor(UserDB, IPServer, DBName, Password) {
        this.connectionPool = null;
        this.connectionString = `workstation id=server;packet size=4096;user id=${UserDB};data source=${IPServer};initial catalog=${DBName};password=${Password}`;
    }

    connect() {

        const connectionString = this.connectionString;

        if (this.connectionPool) {
            return this.connectionPool;
        }

        this.connectionPool = new Promise((resolve, reject) => {

            const pool = new sql.ConnectionPool(connectionString);

            pool.on('close', () => {
            });

            pool.connect().then(connPool => {
                return resolve(connPool);
            }).catch(err => {
                return reject(err);
            });
        });

        return this.connectionPool;
        
    }



    getConnectionStatus() {
        return new Promise((resolve, reject) => {
            this.connect().then(res => {
                resolve(res.connected);
            }).catch(err => {
                reject(err)
            })
        })
    }

    exec(StoredProcedureaName, Parameters) {
        return new Promise((resolve, reject) => {
            this.connect().then(connPool => {
                const request = new sql.Request(connPool);

                for (var llave in Parameters) {
                    switch (typeof Parameters[llave]) {
                        case 'string':
                            request.input(String(llave), sql.VarChar(sql.MAX), Parameters[llave])
                            break;
                        case 'number':
                            request.input(String(llave), sql.Int, Parameters[llave])
                            break;
                        case 'object':
                            request.input(String(llave), sql.DateTime, Parameters[llave])
                            break;
                        case 'Boolean':
                            request.input(String(llave), sql.Bit, Parameters[llave])
                            break;
                        default:
                            request.input(String(llave), sql.VarChar(sql.MAX), Parameters[llave])
                            break;
                    }
                }

                request.execute(StoredProcedureaName, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })

                sql.on('error', err => {
                    reject(err);
                })
            })
        });
    }
}

module.exports = SQLSP;