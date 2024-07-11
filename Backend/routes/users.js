const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { pool } = require("../db");

// Endpoint to handle user signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO userstbl (username, email, password) VALUES (?, ?, ?)";
    await pool.query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to handle user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = "SELECT * FROM userstbl WHERE email = ?";
    const [rows] = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to check session
router.get("/session-check", (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ message: "Session is active", user: req.session });
  } else {
    res.status(401).json({ message: "No active session" });
  }
});

// Endpoint to logout
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie("connect.sid"); // Replace with the name of your session cookie
      return res.status(200).json({ message: "Logout successful" });
    });
  } else {
    return res.status(200).json({ message: "Logout successful" });
  }
});

module.exports = router;
