/*
let sql = require('mssql');

const port = 65496;
let sql_config = `mssql://usr:pwd@localhost:${port}/AdventureWorks`;

let cnxn = sql.connect(sql_config);
*/
import { getDatabaseOutline } from './model';

getDatabaseOutline().then(r => console.log(r));
