![Tested with mocha](https://github.com/raicerk/sqlstoreprocedure/raw/master/test/badge.svg?sanitize=true)

[![https://nodei.co/npm/sqlstoreprocedure.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/sqlstoreprocedure.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/sqlstoreprocedure)


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
const SQLSP = require('sqlstoreprocedure')
const sp = new SQLSP('userdb', 'IPServer(x.x.x.x)', 'databasename', 'password');

sp.exec('StoredProcedureName', parameters).then((response) => {
    // Handle response
    console.log(response);
}).catch((error) => {
    console.log(`SP Error: ${error}`);
})
```

> Example with await

```js
const SQLSP = require('sqlstoreprocedure')

// Normal version
async function main (){
  const sp = new SQLSP('userdb', 'IPServer(x.x.x.x)', 'mydatabase', 'mysecurepassword');
  const response = await sp.exec('StoredProcedure', parameters);

  // Handle response
  console.log(response);
}

// Arrow Function Version
let main = async () => {
  const sp = new SQLSP('userdb', 'IPServer(x.x.x.x)', 'mydatabase', 'mysecurepassword');
  const response = await sp.exec('StoredProcedure', parameters);

  // Handle response
  console.log(response);
}

main();
```

> Example with typescript

```ts
import SQLSP from 'sqlstoreprocedure';

let sp: any = new SQLSP('userdb', 'IPServer(x.x.x.x)', 'mydatabase', 'mysecurepassword')

sp.exec('StoredProcedure', parameters).then(response => {
    // Handle response
  console.log(response);
}).catch(err => {
    console.log(err)
})
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/4575267?s=460&v=4" width="100px;"/><br /><sub><b>Juan Mora</b></sub>](https://github.com/raicerk)| [<img src="https://avatars0.githubusercontent.com/u/8430727?s=460&v=4" width="100px;"/><br /><sub><b>Agustin Gonzalez</b></sub>](https://github.com/agonzalezmurua) |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
