import React, { useState, useEffect, useRef } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
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
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "New Era Digital Prints",
      url: "https://www.neweradigitalprints.net",
      logo: "https://www.neweradigitalprints.net/images/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+2348136779436",
        contactType: "Customer Service",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup script on unmount
    };
  }, []);

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
    <HelmetProvider>
    <header className="header w-full  dark:bg-customBlack bg-customBlue sticky top-0 z-[100]">
    <Helmet>
    <title>New Era Digital Prints | Custom Printing Services</title>
  <meta
    name="description"
    content="New Era Digital Prints offers custom printing services for various needs, ensuring high-quality results and excellent customer service. Explore our range of products and services to meet your printing requirements."
  />
</Helmet>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:px-12 px-4">
        <div className="lg:hidden flex justify-between items-center w-full py-4">
          <Link to="/">
            <div className="logo text-xl text-customWhite">
              <img
                src="/images/logo.png"
                alt="New Era Digital Prints logo"
                className="w-24"
              />
            </div>
          </Link>

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
            <Link to="/" title="Home - New Era Digital Prints">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiHome className="inline-block mr-2" />}Home
              </li>
            </Link>
            <Link to="/about" title="About Us - New Era Digital Prints">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiInfo className="inline-block mr-2" />}About Us
              </li>
            </Link>
            <Link to="/shop" title="Shop - New Era Digital Prints - Custom Prints">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiShoppingBag className="inline-block mr-2" />}
                Shop
              </li>
            </Link>
            <Link to="/magazine" title="Magazine - New Era Digital Prints - Explore Our Insights">
              <li className="lg:py-5 py-2 border-b lg:border-b-0 px-2 dark:text-customWhite hover:text-customWhite transition-colors dark:hover:text-customBlue duration-300 cursor-pointer">
                {isMenuOpen && <FiBook className="inline-block mr-2" />}Magazine
              </li>
            </Link>
            <Link to="/contact" title="Contact Us - New Era Digital Prints - Get in Touch">
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
          <Link to="/">
            <div className="logo text-xl text-customWhite justify-start">
              <img
                src="/images/logo.png"
                alt="New Era Digital Prints logo"
                className="w-24 "
              />
            </div>
          </Link>

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
    </header>
    </HelmetProvider>
  );
};

export default Header;
