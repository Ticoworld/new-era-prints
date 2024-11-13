import React from "react";
import { motion } from "framer-motion"; // Make sure to import motion
import { BsArrowUpRight } from "react-icons/bs";
import Button from "./Button";

const HeroSection = ({ showcaseImage = "https://res.cloudinary.com/dglky8nrs/image/upload/v1731501191/showcase_my8kb2.png" }) => {
  return (
    <div
      className="relative w-full h-[44rem] lg:h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dglky8nrs/image/upload/v1731501206/showcase-bg_eblva8.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-400 dark:bg-black opacity-90 dark:opacity-70"></div>
      {/* Content */}
      <div className="relative z-10 flex-col flex lg:flex-row px-6 justify-around items-center h-full">
        {/* Left Side Content */}
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 10, duration: 2 }}
          className="text-customBlack dark:text-customWhite"
        >
          <span className="py-5 font-semibold block md:text-2xl text-sm">PRINTING SERVICES</span>
          <h1 className="font-bold md:text-5xl text-2xl pb-4">
            THE LEADER IN <br /> QUALITY CUSTOM
          </h1>
          <p>
            Turn your ideas into premium products <br /> that leave a lasting impression
          </p>
          {/* Animate the Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            <Button
              text="Shop Now"
              icon={BsArrowUpRight}
              bgColor="bg-customOrange"
              textColor="text-white"
              link="/shop"
              hoverColor = 'bg-customBlue'
            />
          </motion.div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 10, duration: 2 }}
        >
          <img src={showcaseImage} alt="Showcase of custom printing services" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
