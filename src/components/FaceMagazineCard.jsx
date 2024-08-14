import React from "react";
import Button from "./Button";

const FaceMagazineCard = ({bgcolor='bg-customBlue'}) => {
  return (
    <div className="py-10 bg-customWhite dark:bg-customBlack">
      <div className={`${bgcolor} rounded-xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 px-4 md:px-8 lg:px-16 xl:px-28 py-3 shadow-sm shadow-gray-400`}data-aos='fade-up'>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-customWhite">
              Be the face of our new <br className="hidden md:block"/> 
              Magazine. <br className="hidden lg:block"/> 
              Vote and be Voted for
            </h2>
            <div className="justify-center lg:justify-start flex sm:flex-row items-center gap-3 mt-4">
              <Button
                text="Register"
                bgColor="bg-customBlack"
                textColor="text-white"
                link="/register"
              />
              <Button
                text="Login"
                bgColor="bg-customBlack"
                textColor="text-white"
                link="/login"
              />
            </div>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden rounded-full">
            <img src="/src/images/face1.jpeg" alt="" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceMagazineCard;
