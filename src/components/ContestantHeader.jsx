import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaTrophy } from "react-icons/fa";

const ContestantHeader = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-customBlue">
          <img
            src="/path/to/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Links */}
        <nav className="flex space-x-6">
          <Link
            to="/home"
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaHome className="mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            to="/leaderboard"
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaTrophy className="mr-2" />
            <span className="hidden md:inline">Leaderboard</span>
          </Link>
          <Link
            to="/logout"
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaSignOutAlt className="mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default ContestantHeader;
