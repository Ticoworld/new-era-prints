import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";

const MagazineShowCase = () => {
  return (
    <div className="">
      <div className="bg-customBlue dark:bg-customOrange px-4 md:px-8 shadow-sm shadow-gray-400 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-16">
          <motion.div
            className="lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="font-semibold text-3xl md:text-6xl lg:text-8xl text-customWhite py-6">
              2024 <br /> MODELS
            </h2>
            <p>Register</p>
            <p>Vote</p>
            <p>Be Voted for</p>
            <p>Win the face of the Magazine</p>
            <div className="">
              <Button
                text="Register"
                bgColor="bg-customOrange dark:bg-customBlack"
                textColor="text-white"
                link="/contest-register"
              />
            </div>
          </motion.div>

          <motion.div
            className="max-h-[36rem] w-[36rem] overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <img
              src="/images/faceofmag.png"
              alt=""
              className="w-full h-full object-cover px-8 lg:px-0"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MagazineShowCase;
