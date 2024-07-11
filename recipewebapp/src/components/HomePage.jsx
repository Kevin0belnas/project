import React from 'react';


const HomePage = () => {

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('../img/bg2.jpg')" }}></div>
      <div className="relative z-10 text-center p-5 bg-white bg-opacity-60 rounded-lg shadow-md">
        <h1 className="text-4xl mb-2">Welcome to RecipeShare</h1>
        <p className="text-xl text-gray-800">Explore delicious recipes and share your favorites!</p>
      </div>
    </div>
  );
};

export default HomePage;
