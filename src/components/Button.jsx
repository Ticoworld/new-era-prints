import React from "react";
import { Link } from "react-router-dom";

const Button = ({ 
  text = "Shop Now", 
  icon: Icon = null, 
  bgColor = "bg-customOrange", 
  textColor = "text-white", 
  link = "#", 
  onClick = () => {} // Default empty function
}) => {
  return (
    <Link to={link}>
      <button
        className={`border-0 ${bgColor} ${textColor} py-3 px-6 rounded-xl flex items-center justify-between gap-3 text-sm cursor-pointer my-3`} 
        onClick={onClick} // Add the onClick handler
      >
        {text}
        {Icon && <Icon />}
      </button>
    </Link>
  );
};

export default Button;
