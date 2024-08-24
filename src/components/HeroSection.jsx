import React from "react";
import { motion } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import Button from "./Button";

const HeroSection = ({showcaseImage="/images/showcase.png"}) => {
  return (
    <div
      className="relative w-full h-[44rem] lg:h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/showcase-bg.jpeg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-400 dark:bg-black opacity-90 dark:opacity-70"></div>
      {/* Content */}
      <div className="relative z-10 flex-col flex lg:flex-row px-6 justify-around items-center h-full ">
        {/* Left Side Content */}
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          
          transition={{type: 'spring',
          stiffness: 50,  // Lower stiffness for a softer spring
          damping: 10,    // Moderate damping for a slower settle
          duration: 2 }}
          className="text-customBlack dark:text-customWhite"
        >
          <h3 className="py-5 font-semibold">PRINTING SERVICES</h3>
          <h1 className="font-bold text-xl pb-4">
            THE LEADER IN <br /> QUALITY CUSTOM
          </h1>
          <p>
            Turn your ideas into premium products <br /> that leave a lasting impression
          </p>
          <Button
        text="Shop Now"
        icon={BsArrowUpRight}
        bgColor="bg-customOrange"
        textColor="text-white"
        link="/shop"

      />
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{type: 'spring',
          stiffness: 50,  // Lower stiffness for a softer spring
          damping: 10,    // Moderate damping for a slower settle
          duration: 2 }}
        >
          <img src={showcaseImage} alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
