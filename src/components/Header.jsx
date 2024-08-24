import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiShoppingBag,
  FiBook,
  FiPhone,
} from "react-icons/fi";
import {
  BsMoon,
  BsTiktok,
  BsYoutube,
  BsSun,
  BsFacebook,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); // Close the menu on larger screens
      }
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if clicking outside
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header w-full  dark:bg-customBlack bg-customBlue sticky top-0 z-[100]">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:px-12 px-4">
        <div className="lg:hidden flex justify-between items-center w-full py-4">
          <div className="logo font-kavoon text-xl text-customWhite">
            <img src="/images/logo.png" alt="" className="w-24" />
          </div>
          <div className="flex items-center">
            <div className="relative mr-2">
              <input
                type="search"
                placeholder="Search"
                className="py-1 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none text-sm w-28"
              />
              <FiSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button onClick={toggleTheme} className="text-customWhite ml-4">
              {theme === "dark" ? (
                <BsSun
                  size={20}
                  className="text-yellow-400 dark:text-yellow-300 text-2xl"
                />
              ) : (
                <BsMoon size={20} className="text-gray-950 text-2xl" />
              )}
            </button>
            <button onClick={toggleMenu} className="text-customWhite ml-4">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        <nav
          ref={sidebarRef} // Assign the ref to the sidebar
          className={`${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-[60px] left-0 h-full w-64 dark:bg-customBlack bg-customBlue transition-transform duration-300 lg:static lg:translate-x-0 lg:w-auto lg:bg-transparent lg:flex`}
          style={{ zIndex: 1000 }} // Ensure nav is on top
        >
          <ul className="flex flex-col lg:flex-row text-gray-950 justify-between gap-7 text-sm p-5 lg:p-0">
            <Link to="/">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiHome className="inline-block mr-2" />}Home
              </li>
            </Link>
            <Link to="/about">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiInfo className="inline-block mr-2" />}About Us
              </li>
            </Link>
            <Link to="/shop">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiShoppingBag className="inline-block mr-2" />}
                Shop
              </li>
            </Link>
            <Link to="/magazine">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiBook className="inline-block mr-2" />}Magazine
              </li>
            </Link>
            <Link to="/contact">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite dark:hover:text-customBlue transition-colors duration-300 cursor-pointer">
                {isMenuOpen && <FiPhone className="inline-block mr-2" />}Contact
                Us
              </li>
            </Link>
          </ul>
          {isMenuOpen && (
            <div className="flex justify-around mt-5 text-customWhite">
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300">
                <BsFacebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300">
                <BsTwitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300">
                <BsInstagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300">
                <BsTiktok size={20} />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors duration-300">
                <BsYoutube size={20} />
              </a>
            </div>
          )}
        </nav>
        <div className="hidden lg:flex items-center w-[50%] justify-between">
          <div className="logo font-kavoon text-xl text-customWhite justify-start">
            <img src="/images/logo.png" alt="" className="w-24 " />
          </div>
          <div className="flex">
            <div className="relative ml-4 flex items-center">
              <input
                type="search"
                placeholder="Search"
                className="py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button onClick={toggleTheme} className="text-customWhite ml-4">
              {theme === "dark" ? (
                <BsSun
                  size={20}
                  className="text-yellow-400 dark:text-yellow-300 text-2xl"
                />
              ) : (
                <BsMoon size={20} className="text-gray-950 text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
