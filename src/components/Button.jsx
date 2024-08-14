import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text = "Shop Now", icon: Icon = null, bgColor = "bg-customOrange", textColor = "text-white", link = "#" }) => {
  return (
    <Link to={link}>
      <button
        className={`border-0 ${bgColor} ${textColor} py-3 px-6 rounded-xl flex items-center justify-between gap-3 text-sm cursor-pointer my-3`}
      >
        {text}
        {Icon && <Icon />}
      </button>
    </Link>
  );
};

export default Button;
