import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', formData);
      console.log('Form Data:', formData);
      console.log('Response:', response.data); // Log the response from the server
      // Navigate to the login page upon successful sign-up
      navigate('/login');
    } catch (error) {
      console.error('Error:', error); // Log any errors if the request fails
      // Optionally, you can handle errors and display an error message to the user
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 border border-gray-300 shadow-lg rounded-lg">
      <h2 className="text-2xl text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
