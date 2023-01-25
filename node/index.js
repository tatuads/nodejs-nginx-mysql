const express = require('express')
const app= express()
const port = 3000
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "db"
});

app.get('/', (req,res) => {
  con.query("SELECT name FROM people", function (err, result, fields) {
      if (err) throw err;
      let names = result.map(row => row.name);
      res.send('<h1>Full Cycle</h1>' + 'Nome: <br>' + names.join('<br>'));
  });
});

app.listen(port, ()=> {
    
    console.log ('Rodando na porta ' + port)
    const createSql = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));`;
    con.query(createSql);

    const insertSql = "INSERT INTO people(name) VALUES ('Maria')";
    con.query(insertSql);

});
