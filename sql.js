var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (name TEXT, msg TEXT)");

  var stmt = db.prepare("INSERT INTO lorem (name, msg) VALUES (?, ?)");
  for (var i = 0; i < 9; i++) {
      stmt.run("H A R I M B O", "H A R A M B E");
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, name, msg FROM lorem", function(err, row) {
      console.log(row.id + " YOU SAY " + row.name + " I SAY " + row.msg);
  });
});

db.close();
