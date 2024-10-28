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
import { HelmetProvider, Helmet } from "react-helmet-async";
const Home = () => {
  return <div>
    <HelmetProvider>
    <Helmet>
    <title>New Era Digital Prints</title>
    <meta
  name="description"
  content="Welcome to New Era Digital Prints! Discover high-quality custom printing services, exclusive offers, and the latest trends in our magazine. Explore our top-selling items and learn more about us today."
/>
<meta name="keywords" content="custom prints, digital printing, New Era Digital Prints, printing services, top-selling items, magazine, branding, new era services" />
<meta property="og:title" content="New Era Digital Prints" />
<meta property="og:description" content="Discover high-quality custom printing services, exclusive offers, and the latest trends." />
<meta property="og:image" content="https://www.neweradigitalprints.net/images/logo.png" />
<meta property="og:url" content="https://www.neweradigitalprints.net/" />

    </Helmet>
     <Header />
     <HeroSection />
     <Offers />
     <Reasons />
     <FaceMagazineCard />
     <TopSellingItems />
     <Reviews />
     <FaceMagazineTwo />
     <Footer />
     </HelmetProvider>
  </div>;
};

export default Home;
