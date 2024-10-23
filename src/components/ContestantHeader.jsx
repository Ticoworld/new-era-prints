import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2"; // Optional for logout confirmation

const ContestantHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: Display a confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Assuming token is stored in localStorage
        localStorage.removeItem('expiresAt');
        navigate("/contest-login");
        Swal.fire("Logged out", "You have successfully logged out.", "success");
      }
    });
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-customBlue">
          <img
            src="/images/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Links */}
        <nav className="flex space-x-6">
          <Link
            to="/"
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaHome className="mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>
          {/* <Link
            to="/leaderboard"
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaTrophy className="mr-2" />
            <span className="hidden md:inline">Leaderboard</span>
          </Link> */}
          <button
            onClick={handleLogout}
            className="flex items-center text-customDark hover:text-customBlue transition"
          >
            <FaSignOutAlt className="mr-2" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default ContestantHeader;
