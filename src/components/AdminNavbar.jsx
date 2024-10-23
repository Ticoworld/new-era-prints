import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";

const AdminNavbar = ({logout}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/admin" className="text-white text-xl font-bold">
              Admin Dashboard
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 items-center">
              <Link to="/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/admin/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link to="/admin/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Users
              </Link>
              <Link to="/admin/contestants" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contestants
              </Link>
              <Link to="/admin/verify-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Verify Orders
              </Link>
              <Link to="/admin/pending-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pending Orders
              </Link>
              <Link to="/admin/completed-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Completed Orders
              </Link>
              <Link to="/admin/leaderboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Leaderboard
              </Link>
              <Link to="/admin/setting" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
              <IoIosSettings />
            </Link>
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                <FaSignOutAlt onClick={()=>{logout()}}/>
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/admin/users" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Users
            </Link>
            <Link to="/admin/contestants" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contestants
            </Link>
            <Link to="/admin/verify-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Verify Orders
            </Link>
            <Link to="/admin/pending-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Pending Orders
            </Link>
            <Link to="/admin/completed-orders" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Completed Orders
            </Link>
            <Link to="/admin/leaderboard" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Leaderboard
            </Link>
            <Link to='/admin/setting' className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium block"  onClick={()=>{logout()}}>
              <div className='flex items-center justify-between gap-3 flex-row-reverse'>
                Setting
                <IoIosSettings className='text-2xl'/>
              </div>
            </Link>
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium "  onClick={()=>{logout()}}>
              <div className='flex items-center justify-between gap-3 flex-row-reverse'>
                Logout
                <FaSignOutAlt className='text-2xl'/>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
