import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
       
            <div className="fixed top-14 left-0 h-full bg-gray-800 text-white w-64 z-40 sidebar">
                        

                <nav className="flex flex-col p-4 space-y-4">
                    <Link to="/myrecipe" className="hover:bg-gray-700 p-2 rounded">My Recipe</Link>
                    {/* Add more sidebar items here */}
                </nav>
            </div>
    );
};

export default Sidebar;
