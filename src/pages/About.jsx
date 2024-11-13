import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import FaceMagazineCard from "../components/FaceMagazineCard";
import Reviews from "../components/Reviews";
import FaceMagazineTwo from "../components/FaceMagazineTwo";
import Footer from "../components/Footer";
import TopSellingItems from "../components/TopSellingItems";

const About = () => {
  return <div>
    <Header />
    <HeroSection showcaseImage="https://res.cloudinary.com/dglky8nrs/image/upload/v1731501209/showcase2_ogxrkq.png" />
    <AboutUs />
    <FaceMagazineCard bgcolor="bg-customOrange"/>
    <TopSellingItems />
    <Reviews />
    <FaceMagazineTwo />
    <Footer />
  </div>;
};

export default About;
