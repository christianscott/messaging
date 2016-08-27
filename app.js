const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

let id = 2;
let messages = [];

const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (name TEXT, msg TEXT)");

  var stmt = db.prepare("INSERT INTO lorem (name, msg) VALUES (?, ?)");
  stmt.run("Jason", "Hey boys :)");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.run("Mike", "just logged on wats poppin lol");
  stmt.finalize();

  db.each("SELECT rowid AS id, name, msg FROM lorem", function(err, row) {
      console.log(row.id + " YOU SAY " + row.name + " I SAY " + row.msg);
  });
});

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('hello :) go to "localhost:8888/messages to see messages"')
});

app.get('/messages', (req, res) => {
  let nMostRecent = [];
  console.log("served response");
  db.each("SELECT rowid AS id, name, msg FROM lorem ", function(err, row) {
      nMostRecent.push({
        id: row.id,
        name: row.name,
        msg: row.msg
      });
  });
  console.log(nMostRecent);
  res.json(nMostRecent);
});

app.post('/messages', (req, res) => {
  let data = req.body;
  data.id = id;

  console.log('recieved post request');
  console.log(data);

  if (data.msg !== '' && data.name !== '') {
    res.send(data); // Respond with body of query
    messages.push(data) // Save order in memory
  } else {
    throw new Error('Name or message missing.')
  }
  id++;
});

// app.delete('/messages', (req, res) => {
//   let user_id = req.param('id');
//
//   res.
// });

console.log('Listening on http://localhost:8888');
app.listen(8888);
