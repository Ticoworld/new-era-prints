import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-400 flex items-center justify-between lg:px-32 px-8 py-10">
        <img src="/images/logo.png" alt="" className="w-28" />
        <div className="flex items-center gap-5 text-center text-sm text-customBlack">
          <div className="flex flex-col gap-4">
            <Link to="/magazine">
              <p className="cursor-pointer hover:text-customWhite">Magazine</p>
            </Link>
            <Link to="/">
              <p className="cursor-pointer hover:text-customWhite">Home</p>
            </Link>
            <Link to="/about">
              <p className="cursor-pointer hover:text-customWhite">About us</p>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/contact">
              <p className="cursor-pointer hover:text-customWhite">
                Contact us
              </p>
            </Link>
            <Link to="/shop">
              <p className="cursor-pointer hover:text-customWhite">Shop</p>
            </Link>
            <Link to="/support">
              <p className="cursor-pointer hover:text-customWhite">support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
