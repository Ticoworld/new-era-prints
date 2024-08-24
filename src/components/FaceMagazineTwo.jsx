import React from "react";
import Button from "./Button";

const FaceMagazineTwo = () => {
  return (
    <div className="pt-3 pb-16 bg-customWhite dark:bg-customBlack">
      <div className="bg-customBlack dark:bg-customOrange rounded-xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 px-4 md:px-8 shadow-sm pt-7 shadow-gray-400" data-aos='fade-up'>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl text-customWhite text-center">
              Discover and register <br className="hidden md:block"/> 
              for our majestic <br className="hidden lg:block"/> 
              magazine
            </h2>
            <div className="justify-center flex sm:flex-row items-center gap-3 mt-4">
              <Button
                text="Register"
                bgColor="bg-customOrange dark:bg-customBlack"
                textColor="text-white"
                link="/contest-register"
              />
            </div>
          </div>
            <img src="/images/facemag.png" alt="" className="w-[30rem] object-cover rotate-12"/>
        </div>
      </div>
    </div>
  );
};

export default FaceMagazineTwo;
