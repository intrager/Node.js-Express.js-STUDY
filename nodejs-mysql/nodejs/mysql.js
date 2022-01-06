var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',   // database 서버가 어떤 컴퓨터에 있는가
  user     : 'root',
  password : 'shem12',
  database : 'opentutorials'    // 본인이 쓸 database
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  } 
  console.log(results);
});
 
connection.end();