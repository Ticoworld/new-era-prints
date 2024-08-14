import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Offers = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const offersRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.unobserve(offersRef.current); // Stop observing after it becomes visible
        }
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (offersRef.current) {
      observer.observe(offersRef.current);
    }

    return () => {
      if (offersRef.current) {
        observer.unobserve(offersRef.current);
      }
    };
  }, []);

  const offersCard = [
    { id: 1, image: "/src/images/image1.jpeg", title: "Business Cards" },
    { id: 2, image: "/src/images/image2.jpeg", title: "Marketing Materials" },
    { id: 3, image: "/src/images/image3.jpeg", title: "Signs & Posters" },
    { id: 4, image: "/src/images/image4.jpeg", title: "Clothing & Bags" },
    { id: 5, image: "/src/images/image5.jpeg", title: "Design Services" },
    {
      id: 6,
      image: "/src/images/image6.jpeg",
      title: "Invitations & Stationery",
    },
    { id: 7, image: "/src/images/image7.jpeg", title: "Labels & Stickers" },
    {
      id: 8,
      image: "/src/images/image8.jpeg",
      title: "Photo Gifts & Calendar",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? "-100vw" : "100vw",
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <div
      ref={offersRef}
      className="bg-customWhite dark:bg-black  min-h-screen overflow-hidden py-14">
      <div className="flex justify-center items-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}>
          {offersCard.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="w-48 h-48 sm:w-64 sm:h-64 bg-white dark:shadow-white dark:shadow-sm shadow-lg rounded-lg p-4 text-center cursor-pointer overflow-hidden"
              custom={index % 2 === 0 ? "left" : "right"}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} // Add hover scale effect
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full sm:h-48 h-32 lg:h-48 object-cover rounded-md"
              />
              <p className="mt-3 font-semibold lg:text-sm text-xs">
                {offer.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <h1
        className="font-semibold text-customBlue text-center pt-10 cursor-pointer"
        data-aos="fade-up">
        LETS GET STARTED
      </h1>
    </div>
  );
};

export default Offers;
