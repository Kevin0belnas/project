import React from 'react';
import fdlogo from '../img/fdlogo.png'; // Adjust the path according to your file structure

const Header = () => {
    return (
        <div className="bg-gray-800 text-white">
            <nav className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center">
                    <a href="/home">
                        <img src={fdlogo} alt="Logo" className="h-10 w-10 rounded-full" />
                    </a>
                    <span className="text-xl font-bold ml-2">RecipeShare</span>
                </div>
                <ul className="flex">
                    <li className="ml-4">
                        <a href="/home" className="hover:text-gray-300">Home</a>
                    </li>
                    <li className="ml-4">
                        <a href="/about" className="hover:text-gray-300">About</a>
                    </li>
                    <li className="ml-4">
                        <a href="/contact" className="hover:text-gray-300">Contact</a>
                    </li>
                </ul>
                <ul className="flex">
                    <li className="ml-4">
                        <a href="/signup" className="text-white hover:text-gray-300">Sign Up</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;