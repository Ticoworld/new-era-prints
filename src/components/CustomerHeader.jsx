import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaShoppingCart,
  FaHistory,
  FaShoppingBag,
} from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useUser } from "../pages/Shop";

const CustomerHeader = ({ logout }) => {
  const user = useUser();
  const [theme, setTheme] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-customBlue dark:bg-customBlack p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-800 text-2xl dark:text-gray-200 focus:outline-none">
          <GiHamburgerMenu />
        </button>
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-8 w-auto sm:h-12"
        />
      </div>
      {/* Hide welcome message on smaller screens */}
      <h1 className="hidden lg:block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
        Welcome,{" "}
        <span className="text-customBlack dark:text-customWhite">{user ? user.username : ""}!</span>
      </h1>
      <nav className="hidden lg:flex space-x-4 items-center">
        <Link
          to="/shop"
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
          <FaHome size={20} />
          <span className="ml-2">Dashboard</span>
        </Link>
        <Link
          to="/shop/cart"
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
          <FaShoppingCart size={20} />
          <span className="ml-2">Cart</span>
        </Link>
        <Link
          to="/shop/history"
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
          <FaHistory size={20} />
          <span className="ml-2">History</span>
        </Link>
        <Link
          to="/shop/order"
          className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
          <FaShoppingBag size={20} />
          <span className="ml-2">Order</span>
        </Link>
      </nav>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="text-gray-800 dark:text-gray-200 focus:outline-none">
          {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        <button
          onClick={logout}
          className="text-red-800 dark:text-red-400 focus:outline-none ml-4">
          Logout
        </button>
      </div>

      {/* Sidebar Menu with Transition */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-20`}>
        <div className="p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 dark:text-gray-200 text-2xl focus:outline-none">
            <HiMiniXMark />
          </button>
          <h1 className="mt-8 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Welcome,{" "}
            <span className="text-customBlack dark:text-customWhite">
              {user ? user.username : ""}!
            </span>
          </h1>
          <nav className="mt-8 space-y-4">
            <Link
              to="/shop"
              className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
              <FaHome size={20} className="mr-2" />
              Dashboard
            </Link>
            <Link
              to="/shop/cart"
              className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
              <FaShoppingCart size={20} className="mr-2" />
              Cart
            </Link>
            <Link
              to="/shop/history"
              className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
              <FaHistory size={20} className="mr-2" />
              History
            </Link>
            <Link
              to="/shop/order"
              className="flex items-center text-gray-800 dark:text-gray-200 hover:text-customWhite dark:hover:text-blue-400 transition">
              <FaShoppingBag size={20} className="mr-2" />
              Order
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
