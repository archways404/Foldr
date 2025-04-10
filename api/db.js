const Database = require('better-sqlite3');
const path = require('path');

// Create or open the database file
const db = new Database(path.join(__dirname, 'urls.db'));

// Create table if it doesn't exist
db.prepare(
	`
	CREATE TABLE IF NOT EXISTS urls (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		url TEXT NOT NULL,
		timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`
).run();

module.exports = db;
