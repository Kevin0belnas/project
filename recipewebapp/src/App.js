import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Settings from "./components/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./MainPages/Home";
import RecipeForm from "./MainPages/RecipeForm";
import Header2 from "./components/Header2";
import MyRecipe from "./MainPages/MyRecipe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Header />
              <Settings />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Header2 />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/recipeform"
          element={
            <>
              <Header2 />
              <RecipeForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/myrecipe"
          element={
            <>
              <Header2 />
              <MyRecipe />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
