var SQLSP = require('../lib/index')
var should = require("should");

describe("Test for SQLStoreProcedure lib", () => {

    it("Connection test", done => {

        let sp = new SQLSP("sa", "127.0.0.1", "contactos", "password.")

        sp.getConnectionStatus().then(estado => {
            estado.should.equal(true);
            done();
        })

    });

    it("Execute store procedure Test", done => {

        let sp = new SQLSP("sa", "127.0.0.1", "contactos", "password.")

        sp.exec('spRec_contactos_ObtieneDatosPorEstado', { estado: true }).then(response => {
            response.recordset.map(item => {
                item.estado.should.equal(true);
            })
            done();
        })
    });

});