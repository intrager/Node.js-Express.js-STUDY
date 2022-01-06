var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',   // database 서버가 어떤 컴퓨터에 있는가
  user     : 'nodejs',
  password : 'shem',
  database : 'opentutorials',    // 본인이 쓸 database
  port: 3307  // 3306인줄 알았지만 3307이었다.
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  } 
  console.log(results);
});
 
connection.end();
// 2022-01-06. 01-03부터 시작한 mysql 설치 이제 됐다! 야!!! Tlqkf