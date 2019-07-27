# SQLStoreProcedure

Quick and easy MSSQL Stored Procedure execution using promises

If you don't know how to operate with promises please refer to the following links:

- [Promises](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise)

- [Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/await)

# Install

```bash
npm install sqlstoreprocedure --save
```

or

```bash
yarn add sqlstoreprocedure
```

# Usage

## Parameters

Para enviar parámetros de entrada al procedimiento almacenado se debe crear un objeto js que se enviara como parámetro a la función de ejecución.

The library allows for native JS object **primitives**
```js
const parameters = {
    Param1 : "value",
    Param2 : 2,
    Param3 : true
};
```

## Execution

In order to start oeprating we must first initialize the module:

```js
const sqlsp = require('sqlstoreprocedure')
const sp = new sqlsp('user', 'xxxx.xxxx.xxxx.xxxx', 'databasename', 'password');

sp.exec('StoredProcedureName', parameters).then((response) => {
    // Handle response
    console.log(response);
}).catch((error) => {
    console.log(`SP Error: ${error}`);
})
```

> Veamos un ejemplo completo del código para la ejecución con await:

```js
const sqlsp = require('sqlstoreprocedure')

async function main (){
  const sp = new sqlsp('sa', '192.168.0.100', 'mydatabase', 'mysecurepassword');
  const response = await sp.exec('StoredProcedure', parameters);

  // Handle response
  console.log(response);
}

main();
```
