# SQLStoreProcedure

Librería para proyectos de `nodejs` que permite la ejecución de procedimientos almacenados de `SQL Server` de manera rápida y sencilla.

La ejecución de los procedimientos almacenadas genera como resultado una promesa con el resultado de la `query`, por lo que puede ser consumido con promesas o usando await según lo necesite el usuario.

Para revisar documentación al respecto de `promises` y `await` pueden revisar los siguientes sitios:

- [Promises](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise)

- [Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/await)

# Instalación

`npm install sqlstoreprocedure --save`

# Uso

## Parámetros de procedimientos almacenados

Para enviar parámetros de entrada al procedimiento almacenado se debe crear un objeto js que se enviara como parámetro a la función de ejecución.
```js
// Parámetros multiformatos
var datos = {
    "Parametro" : "Valor",
    "Parametro2" : 2,
    "Parametro3" : true
};
```

## Método de ejecución

Para ejecutar el o los procedimientos almacenados se debe instanciar la librería, donde en su instancia se deben entregar como parámetros los valores de conexión de la base de datos de SQL Server.

```js
// Importando la librería
var sqlsp = require('sqlstoreprocedure')

// Instanciando la librería con los datos de SQL Server
let sp = new sqlsp('userdb', 'IPServerSQLServer(xxx.xxx.xxx.xxx)', 'databasename', 'password');
```


Por último debemos ejecutar el procedimiento almacenado de la siguiente manera:

```js
// Ejecución del procedimiento almacenado usando promesas
sp.exec('ProcedimientoAlmacenado',datos).then(resultado=>{
    console.log(resultado);
    console.log("--------------------------------------------------------------")
}).catch(error=>{
    console.log(`error en la ejecución del sp: ${error}`);
})
```
> Veamos un ejemplo completo del código para la ejecución con promesas:

```js
var sqlsp = require('sqlstoreprocedure')

let sp = new sqlsp('sa', '192.168.0.100', 'mibasededatos', 'mipassword');

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
```

> Veamos un ejemplo completo del código para la ejecución con await:

```js
var sqlsp = require('sqlstoreprocedure')

async function Ejecutar(){

  let sp = new sqlsp('sa', '192.168.0.100', 'mibasededatos', 'mipassword');

  var datos = {
      "Parametro" : "Valor",
      "Parametro2" : 2,
      "Parametro3" : true
  };

  var resultado = await sp.exec('ProcedimientoAlmacenado',datos);
  console.log(resultado);
}

Ejecutar();
```
