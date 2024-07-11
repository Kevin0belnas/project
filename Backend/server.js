const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { pool, connectDB } = require("./db");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Session store options with automatic table creation
const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true, // This option will automatically create the sessions table
  },
  pool
);

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Allow requests from this origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session middleware configuration
app.use(
  session({
    key: "session_cookie_name",
    secret: "080116", // Replace with a random string for session encryption
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Connect to the database
connectDB();

// Define your routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
