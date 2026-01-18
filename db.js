const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/**
 * IMPORTANT:
 * Vercel serverless allows read-only access only.
 * DB must already exist in repo.
 */
const dbPath = path.join(__dirname, "database.db");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error("SQLite open error:", err.message);
  }
});

module.exports = db;
