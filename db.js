const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database.db');

const schema = fs.readFileSync('./schema.sql').toString();
const seed = fs.readFileSync('./seed.sql').toString();

db.serialize(() => {
  db.exec(schema);
  db.exec(seed);
});

module.exports = db;
