import React from "react";
import { HashLink as  NavHashLink } from "react-router-hash-link";

const Reasons = () => {
  return <div className="bg-customWhite dark:bg-customBlack pb-10">
        <div    data-aos="fade-up" >
        <h1 className="text-customBlack dark:text-customWhite font-semibold text-center text-2xl">Reasons to get your <br /> <span className="text-customGreen">printing</span> started with us</h1>
        <div className="text-customBlack dark:text-customWhite lg:px-36 px-5 flex justify-between flex-col gap-8 pt-8 ">
        <p>
        New Era Digital Prints International Ltd is a premier printing press company located in Abuja, Nigeria. Established in 2024, our company has quickly become a trusted name in the printing industry, offering high-quality printing services to businesses and individuals alike. 
        </p>
        <p>
        At New Era Digital Prints International Ltd, we pride ourselves on our commitment to excellence and customer satisfaction. Our team of skilled professionals utilizes the latest technology and equipment to deliver top-notch printing solutions that meet the unique needs of our clients.
        </p>
        </div>
        <NavHashLink to="/about#about">
                  <p className="text-blue-700 lg:px-36 px-5 cursor-pointer py-5">Learn more...</p>
        </NavHashLink>
    </div>
  </div>;
};

export default Reasons;
