import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // To manage the loading state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/session-check', { withCredentials: true });
        setSession(response.data.user);
        console.log('Session is active:', response.data);
      } catch (error) {
        console.error('No active session:', error);
      } finally {
        setLoading(false); // Set loading to false once session is checked
      }
    };

    fetchSession();
  }, []);

  const handleIngredientChange = (index, event) => {
    const values = [...ingredients];
    values[index][event.target.name] = event.target.value;
    setIngredients(values);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure the user is logged in before submitting the recipe
    if (!session) {
      alert('You must be logged in to submit a recipe.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/recipes/add-recipe', {
        title,
        description,
        ingredients,
      }, { withCredentials: true });
      console.log('Recipe added:', response.data);
            navigate('/home');

    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading indicator
  }

  if (!session) {
    navigate('/login'); // Navigate to login page if no active session
    return null; // Return null to prevent rendering the rest of the component
  }

   return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 border border-gray-300 rounded-lg">
      <h2 className="text-2xl text-center mb-6">Add New Recipe</h2>
      <div className="mb-4">
        <label className="block mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <h3 className="text-l mb-2">Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="mb-4">
          <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredient Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-l"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
              <input
                type="text"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Unit"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveIngredient(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg mt-1"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddIngredient}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        Add Ingredient
      </button>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg transition duration-200 hover:bg-green-600"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
