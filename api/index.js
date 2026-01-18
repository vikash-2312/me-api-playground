const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    source: 'vercel-api'
  });
});

/* 🔥 THIS IS THE KEY FIX */
module.exports = (req, res) => {
  app(req, res);
};
