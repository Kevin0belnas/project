import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes/get-recipes', { withCredentials: true });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">List of My Recipes</h1>
      {recipes.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Title</th>
              <th className="py-2 px-4 border-b border-gray-300">Description</th>
              <th className="py-2 px-4 border-b border-gray-300">Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{recipe.title}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{recipe.description}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">
                  <ul className="">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No recipes available</p>
      )}
    </div>
  );
};

export default MyRecipe;
