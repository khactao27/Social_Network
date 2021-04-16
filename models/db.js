var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'db_sn_21',
  password: '',
  database: 'db_sn_21'
})

connection.connect();
export {connection};