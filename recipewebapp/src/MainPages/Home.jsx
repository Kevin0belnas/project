import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/session-check', { withCredentials: true });
        setIsLoggedIn(response.data.user ? true : false);
      } catch (error) {
        console.error('No active session:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes/get-recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    checkSession();
    if (isLoggedIn) {
      fetchRecipes();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [loading, isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null; // This line is optional because the user will be redirected to the login page
  }

  return (
    
    <div className="container mx-auto mt-10 p-6">
      <div className='flex items-center justify-between px-4 py-2'>
        <h1 className="text-2xl font-bold mb-6">Recipes</h1>
            <a href="/myrecipe" className="text-2xl font-bold mb-6">My Recipe</a>
            
      </div>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="mb-6 p-4 bg-white border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-700">{recipe.description}</p>
            <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No recipes available</p>
      )}
    </div>
  );
}
