import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";

const EachContestant = () => {
  return (
    <div className="">
      <div className="bg-customBlue dark:bg-customOrange px-4 md:px-1 shadow-sm shadow-gray-400 overflow-hidden pt-3">
        <div className="flex flex-col lg:flex-row md:flex-row items-center justify-between gap-5 lg:gap-10 relative">
          <motion.div
            className="h-[38.7rem] lg:w-[50rem] md:w-[33rem] md:flex-1 relative -mb-16"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <img
              src="/src/images/contestant.png"
              alt=""
              className="w-full h-full object-cover md:px-1 px-8 lg:px-0"
            />
            <p className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-customBlack font-semibold text-xl">
              Ella Marvel
            </p>
          </motion.div>

          <motion.div
            className="lg:text-left flex flex-col md:flex-1 "
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="font-semibold text-2xl md:text-3xl text-center lg:text-5xl text-customWhite py-6 mt-20">
              ABOUT
            </h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              dolores fuga aliquam ratione neque temporibus, accusamus iusto
              necessitatibus quis eum!
            </p>
            <div className="flex flex-col items-center text-center my-4">
              <Button
                text="Vote"
                bgColor="bg-customOrange dark:bg-customBlack"
                textColor="text-white"
                link=""
              />
              <p>Click the Button to vote for Ella</p>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden justify-self-start self-start min-w-52 items-center gap-4 lg:flex hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="h-20 w-20 rounded-full overflow-hidden ">
              <img
                src="/src/images/face1.jpeg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3>Ella Marvel</h3>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EachContestant;