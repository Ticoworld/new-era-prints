import React from "react";
import Button from "./Button";

const FaceOfMagPastYear = ({ bgcolor = 'bg-customBlue' }) => {
  return (
    <div className="py-20 bg-customWhite dark:bg-customBlack parent relative">
      <div className={`${bgcolor} rounded-xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 px-4 md:px-8 lg:px-16 xl:px-28 py-3 shadow-sm shadow-gray-400`} data-aos='fade-up'>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative">
          <div className="text-center lg:text-left">
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl text-customWhite">
              Meet our last winner, <br className="hidden md:block" />
              Face of 2023 
              
            </h2>
            <div className="justify-center lg:justify-start flex sm:flex-row items-center gap-3 mt-4">
              <Button
                text="Register"
                bgColor="bg-customWhite"
                textColor="text-black"
                link="/contest-register"
              />
              <Button
                text="Login"
                bgColor="bg-customWhite"
                textColor="text-black"
                link="/contest-login"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-[16rem] h-[14rem] -mb-3 lg:w-[30rem] lg:h-[26rem] md:h-[20rem] md:w-[21rem] md:-mb-3 sm:-mb-3 sm:h-[16rem] sm:w-[18rem]  lg:-mt-32 lg:-mb-3 overflow-hidden">
            <img 
              src="/src/images/face2023.png" 
              alt="" 
              className="w-full h-full object-cover"
              style={{ marginBottom: '', zIndex: 1 }}
            />
          </div>
          <div>
            <p className="text-sm pb-3">Miss Obi Ifeoma</p>
          <p className="">Anambra</p>
          </div>
          
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FaceOfMagPastYear;
