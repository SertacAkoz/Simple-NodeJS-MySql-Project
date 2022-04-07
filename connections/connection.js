const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Pano"
});

// connection.connect(function(err) {
//     console.log('Conencted to Database');
//   if (err) throw err;
//   con.query("SELECT * FROM ElektrikPano", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

module.exports = connection.promise();