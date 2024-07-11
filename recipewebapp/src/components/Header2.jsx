import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import fdlogo from '../img/fdlogo.png'; // Adjust the path according to your file structure

const Header2 = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div>
            {/* Header */}
            <div className="bg-gray-800 text-white flex">
                <nav className="flex items-center justify-between px-4 py-2 w-full">
                    <div className="flex items-center">
                        <a href="/home">
                            <img src={fdlogo} alt="Logo" className="h-10 w-10 rounded-full ml-15" />
                        </a>
                        <span className="text-xl font-bold ml-2">RecipeShare</span>
                        <hr />
                    </div>
                    <form className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search Recipes..."
                            className="px-4 py-2 rounded-l-md border-none focus:outline-none text-black"
                        />
                        <button type="submit" className="bg-grey-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center">
                            <svg className="w-6 h-6 mr-25" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2h8a2 2 0 001.414-.586l2-2A2 2 0 0018 6H6a2 2 0 00-1.414.586l-2 2A2 2 0 003 10v4a2 2 0 00.586 1.414l2 2A2 2 0 006 18h8a2 2 0 001.414-.586l2-2A2 2 0 0018 14h-8z"></path>
                            </svg>
                        </button>
                    </form>
                    <div className="relative ml-4">
                        <button onClick={toggleDropdown} className="text-white hover:text-gray-300 focus:outline-none mr-5">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Log Out</button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            
            {/* Sidebar */}
            <div className="top-14 left-0 h-full bg-gray-800 text-white w-64 z-40 fixed sidebar">
                <nav className="flex flex-col p-4 space-y-4">
                                        <h1 className='text-2xl text-white font-bold mb-2'>Dashboard</h1>

                    <Link to="/myrecipe" className="hover:bg-gray-700 p-2 rounded">My Recipe</Link>
                    {/* Add more sidebar items here */}
                </nav>
            </div>

            {/* Main content */}
            <div className="ml-64 mt-14">
                {/* Your main content goes here */}
            </div>
        </div>
    );
};

export default Header2;
