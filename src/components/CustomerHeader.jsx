import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaHome, FaShoppingCart, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const CustomerHeader = ({ username }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="bg-customBlue dark:border-b-2 dark:bg-customBlack p-4 shadow-md flex items-center justify-between sticky top-0">
      <div className="flex items-center space-x-4">

        
        {/* Welcome Message */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Welcome, {username}!
        </h1>
        
        {/* Theme Toggle */}
        
      </div>

      <div>
                {/* Logo */}
                <img src="/src/images/logo.png" alt="Logo" className="h-12 w-auto" />
      </div>
      
      {/* Navigation */}
      <nav className="flex space-x-4">
        <Link to='/shop'
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition"
        >
          <FaHome size={20} />
          <span className="hidden lg:inline ml-2">Dashboard</span>
        </Link>
        <Link to='/cart'
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition"
        >
          <FaShoppingCart size={20} />
          <span className="hidden lg:inline ml-2">Cart</span>
        </Link>
        <Link to='/history' 
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition"
        >
          <FaHistory size={20} />
          <span className="hidden lg:inline ml-2">History</span>
        </Link>

        <button 
          onClick={toggleTheme}
          className="text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default CustomerHeader;
