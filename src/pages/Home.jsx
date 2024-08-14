import React from "react";
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Offers from "../components/Offers";
import Reasons from "../components/Reasons";
import FaceMagazineCard from "../components/FaceMagazineCard";
import TopSellingItems from "../components/TopSellingItems";
import Reviews from "../components/Reviews";
import FaceMagazineTwo from "../components/FaceMagazineTwo";
import Footer from "../components/Footer";
const Home = () => {
  return <div>
     <Header />
     <HeroSection />
     <Offers />
     <Reasons />
     <FaceMagazineCard />
     <TopSellingItems />
     <Reviews />
     <FaceMagazineTwo />
     <Footer />
  </div>;
};

export default Home;
