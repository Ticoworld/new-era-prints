import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Button = ({ 
  text = "Shop Now", 
  icon: Icon = null, 
  bgColor = "bg-customOrange", 
  textColor = "text-white", 
  link = "#", 
  hoverColor = 'bg-customGreen',
  onClick = () => {} 
}) => {
  return (
    <Link to={link}>
      <button
        className={`border-0 ${bgColor} ${textColor} py-3 px-6 rounded-xl flex items-center justify-between gap-3 text-sm cursor-pointer my-3 font-semibold`}
        onClick={onClick}
        aria-label={text}
        style={{ transition: "background-color 0.3s ease" }}
        onMouseEnter={(e) => e.currentTarget.classList.replace(bgColor, hoverColor)}
        onMouseLeave={(e) => e.currentTarget.classList.replace(hoverColor, bgColor)}
      >
        {text}
        {Icon && <Icon />}
      </button>
    </Link>
  );
};

// Prop types for validation
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.elementType,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
