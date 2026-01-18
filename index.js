const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* Lazy DB loader (VERY IMPORTANT) */
let db = null;
function getDb() {
  if (!db) {
    db = require('./db');
  }
  return db;
}

/* Health check (NO DB — SAFE) */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

/* Get profile */
app.get('/profile', (req, res) => {
  const db = getDb();
  db.get('SELECT * FROM profile LIMIT 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

/* ❌ Writes disabled on Vercel */
// app.put('/profile', ...)

/* List projects + filter by skill */
app.get('/projects', (req, res) => {
  const db = getDb();
  const skill = req.query.skill;

  let sql = 'SELECT * FROM projects';
  let params = [];

  if (skill) {
    sql += ' WHERE skill=?';
    params.push(skill);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/* Search */
app.get('/search', (req, res) => {
  const db = getDb();
  const q = `%${req.query.q}%`;

  db.all(
    'SELECT * FROM projects WHERE title LIKE ? OR description LIKE ?',
    [q, q],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

/* Top skills */
app.get('/skills/top', (req, res) => {
  const db = getDb();
  db.all(
    'SELECT skill, COUNT(*) as count FROM projects GROUP BY skill',
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

/* ✅ EXPORT APP */
module.exports = app;
