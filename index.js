const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* Health check */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

/* Get profile */
app.get('/profile', (req, res) => {
  db.get('SELECT * FROM profile LIMIT 1', (err, row) => {
    res.json(row);
  });
});

/* Update profile */
app.put('/profile', (req, res) => {
  const { name, email, education } = req.body;
  db.run(
    'UPDATE profile SET name=?, email=?, education=? WHERE id=1',
    [name, email, education],
    () => res.json({ message: 'Profile updated' })
  );
});

/* List projects + filter by skill */
app.get('/projects', (req, res) => {
  const skill = req.query.skill;
  let sql = 'SELECT * FROM projects';
  let params = [];

  if (skill) {
    sql += ' WHERE skill=?';
    params.push(skill);
  }

  db.all(sql, params, (err, rows) => {
    res.json(rows);
  });
});

/* Search */
app.get('/search', (req, res) => {
  const q = `%${req.query.q}%`;
  db.all(
    'SELECT * FROM projects WHERE title LIKE ? OR description LIKE ?',
    [q, q],
    (err, rows) => res.json(rows)
  );
});

/* Top skills */
app.get('/skills/top', (req, res) => {
  db.all(
    'SELECT skill, COUNT(*) as count FROM projects GROUP BY skill',
    (err, rows) => res.json(rows)
  );
});

/* ✅ EXPORT APP (VERY IMPORTANT) */
module.exports = app;
