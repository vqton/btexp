const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class Database {
  constructor(dbPath, sqlScriptPath) {
    this.dbPath = dbPath;
    this.sqlScriptPath = sqlScriptPath;
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
      } else {
        console.log("Connected to the database.");
        this.initializeDatabase();
      }
    });
  }

  initializeDatabase() {
    this.tableExists('content', (exists) => {
      if (!exists) {
        console.log("Required tables do not exist. Creating them from SQL script.");
        this.executeSqlScript();
      } else {
        console.log("Required tables already exist.");
      }
    });
  }

  executeSqlScript() {
    const sql = fs.readFileSync(this.sqlScriptPath, 'utf8');
    this.db.exec(sql, (err) => {
      if (err) {
        console.error("Error executing SQL script:", err.message);
      } else {
        console.log("Database initialized successfully from script.");
      }
    });
  }

  tableExists(tableName, callback) {
    this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
      if (err) {
        console.error("Error checking if table exists:", err.message);
        callback(false);
      } else {
        callback(!!row);
      }
    });
  }

  getDb() {
    return this.db;
  }
}

// Close the database when done (for example, on server shutdown)
process.on('SIGINT', () => {
  this.db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

module.exports = Database;
