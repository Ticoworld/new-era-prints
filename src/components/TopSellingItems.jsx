import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Array of top-selling items with image names and titles
const topSellingItems = [
  { id: 1, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520610/business_card_uf2c2d.jpg', title: 'Business Cards' },
  { id: 2, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520637/brochure_q7ajle.jpg', title: 'Brochures' },
  { id: 3, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520656/flyer_iyk21d.jpg', title: 'Flyers' },
  { id: 4, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520664/poster_fvj8mt.jpg', title: 'Posters' },
  { id: 5, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520669/banner_lldivo.jpg', title: 'Banners' },
  { id: 6, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520679/booklet_pnk3ud.jpg', title: 'Booklets' },
  { id: 7, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520721/invitation_muygcm.jpg', title: 'invitation Card' },
  { id: 8, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520740/calendar_j14yso.jpg', title: 'Calendars' },
  { id: 9, img: 'https://res.cloudinary.com/dglky8nrs/image/upload/v1731520750/magazine_hwur0c.jpg', title: 'Magazine' },
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
