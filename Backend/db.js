// // const mysql = require("mysql");
// const mysql = require("mysql2/promise");

// const util = require("util");

// // Database configuration
// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "", // Replace with your MySQL password if set
//   database: "recipedb", // Replace with your database name
// };

// // Create a pool object using the mysql library
// const pool = mysql.createPool(dbConfig);

// // Promisify the pool.query and pool.getConnection methods
// pool.query = util.promisify(pool.query);
// pool.getConnection = util.promisify(pool.getConnection);

// // Function to connect to the database
// function connectDB() {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Database connection failed:", err);
//       throw err;
//     }
//     console.log("Connected to the database.");
//     connection.release();
//   });
// }

// module.exports = { pool, connectDB };

const mysql = require("mysql2/promise");

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Replace with your MySQL password if set
  database: "recipedb", // Replace with your database name
};

// Create a pool object using the mysql2/promise library
const pool = mysql.createPool(dbConfig);

// Function to connect to the database
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database.");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

module.exports = { pool, connectDB };
