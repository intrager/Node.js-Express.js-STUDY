var mysql = require('mysql');

var db = mysql.createConnection ({
    host: "localhost",
    user: "nodejs",
    password: "shem",
    database: "opentutorials",
    port: 3307
  });
db.connect();

module.exports = db;