// db.js

const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',        // MySQL server (usually localhost)
  user: 'root',             // your MySQL username
  password: 'root', // 👉 replace with your MySQL password
  database: 'world' // 👉 replace with your database name
});

// Connect to database
db.connect((error) => {
  if (error) {
    console.log('❌ Database connection failed');
    console.log(error.message);
    return;
  }
  console.log('✅ MySQL database connected successfully');
});

// Export connection
module.exports = db;
