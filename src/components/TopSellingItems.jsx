import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Array of top-selling items with image names and titles
const topSellingItems = [
  { id: 1, img: '/images/business_card.jpeg', title: 'Business Cards' },
  { id: 2, img: '/images/brochure.jpeg', title: 'Brochures' },
  { id: 3, img: '/images/flyer.jpeg', title: 'Flyers' },
  { id: 4, img: '/images/poster.jpg', title: 'Posters' },
  { id: 5, img: '/images/banner.jpeg', title: 'Banners' },
  { id: 6, img: '/images/booklet.jpg', title: 'Booklets' },
  { id: 7, img: '/images/invitation.jpeg', title: 'invitation Card' },
  { id: 8, img: '/images/calendar.jpeg', title: 'Calendars' },
  { id: 9, img: '/images/magazine.jpeg', title: 'Magazine' },
];


const TopSellingItems = () => {
  return (
    <div className="py-10 dark:bg-customBlack bg-customWhite">
      <div className="overflow-hidden" data-aos='fade-up'>
        <div className='text-customBlack dark:text-customWhite text-center pb-10'>
          <h1 className='font-semibold text-xl pb-3'>Top selling items</h1>
          <p className=''>
            Turn your ideas into premium products that leaves a lasting impresion
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-9 lg:grid-cols-4 px-3 lg:gap-2 gap-5">
        {topSellingItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }} // Scale up on hover
              transition={{ 
                duration: 0.5, 
                delay: index * 0.001 // Sequential delay for each item
              }}
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 xl:w-28 xl:h-28 overflow-hidden rounded-full">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-3 text-lg xl:text-sm text-customBlack font-semibold dark:text-customWhite">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingItems;
