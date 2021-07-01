

var mysql= require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "small",
  password: ""
});


module.exports=connection;
