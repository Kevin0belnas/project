const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// Endpoint to add a new recipe
router.post("/add-recipe", async (req, res) => {
  const { title, description, ingredients } = req.body; // ingredients should be an array of {name, quantity, unit}

  // Check if user is logged in
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert into Recipes table
    const recipeQuery =
      "INSERT INTO Recipes (title, description, userId) VALUES (?, ?, ?)";
    const [recipeResult] = await connection.query(recipeQuery, [
      title,
      description,
      req.session.userId,
    ]);

    const recipeId = recipeResult.insertId;
    console.log("Recipe Inserted with ID:", recipeId);

    // Insert or update Ingredients table
    for (const ingredient of ingredients) {
      const ingredientQuery =
        "INSERT INTO Ingredients (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)";
      const [ingredientResult] = await connection.query(ingredientQuery, [
        ingredient.name,
      ]);

      const ingredientId = ingredientResult.insertId;
      console.log("Ingredient Inserted or Updated with ID:", ingredientId);

      // Insert into RecipeIngredients table
      const recipeIngredientQuery =
        "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)";
      await connection.query(recipeIngredientQuery, [
        recipeId,
        ingredientId,
        ingredient.quantity,
        ingredient.unit,
      ]);
      console.log("RecipeIngredient Inserted:", {
        recipeId,
        ingredientId,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    }

    await connection.commit();
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Endpoint to get all recipes
router.get("/get-recipes", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const recipesQuery = `
      SELECT r.id, r.title, r.description, r.userId, GROUP_CONCAT(i.name, ':', ri.quantity, ':', ri.unit) as ingredients
      FROM Recipes r
      JOIN RecipeIngredients ri ON r.id = ri.recipe_id
      JOIN Ingredients i ON ri.ingredient_id = i.id
      GROUP BY r.id
    `;
    const [recipes] = await connection.query(recipesQuery);

    // Transform the ingredients string back to an array
    const recipesWithIngredients = recipes.map((recipe) => {
      const ingredients = recipe.ingredients.split(",").map((ingredientStr) => {
        const [name, quantity, unit] = ingredientStr.split(":");
        return { name, quantity, unit };
      });
      return { ...recipe, ingredients };
    });

    res.json(recipesWithIngredients);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;
