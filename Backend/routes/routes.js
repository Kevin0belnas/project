const express = require("express");
const router = express.Router();

// Import route modules
const usersRouter = require("./users");
const recipesRouter = require("./recipes");

// Mount route modules
router.use("/users", usersRouter);
router.use("/recipes", recipesRouter);

module.exports = router;
