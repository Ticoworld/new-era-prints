// import React, { createContext, useState, useEffect } from 'react';

import { useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const fetchUserData = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await fetch('https://new-era-server-five.vercel.app//user-auth/getData', {
//           headers: {
//             'x-access-token': token,
//           },
//         });
//         const data = await response.json();
//         if (data.status === 'ok') {
//           setUser(data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// const bulkUploadProducts = async () => {
//     const goodsList = [
//       // Your goods list as defined earlier
//       { name: "Flex Banners", price: 50.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/banners_egtp5l.jpg" },
//       { name: "Stickers", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023434/sticker_hlcjbj.jpg" },
//       { name: "Branding", price: 100.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023436/branding_gxm19e.jpg" },
    
//       // Paper Prints
//       { name: "Brochures", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/brochure_qow32a.jpg" },
//       { name: "Calendars", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/calendar_l2cscs.jpg" },
//       { name: "Posters", price: 40.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023433/poster_qumjpe.jpg" },
//       { name: "Flyers", price: 15.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023429/flyer_omcfqt.jpg" },
//       { name: "Exercise Books", price: 10.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/exercise_kyyfjv.jpg" },
//       { name: "Jotters", price: 5.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/jotter_c5ddfn.jpg" },
//       { name: "Letterheads", price: 35.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023449/Letterhead_opiw5l.jpg" },
//       { name: "Office Profile", price: 45.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023435/office_x1wme5.jpg" },
//       { name: "Invoice", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/invoice_rrwosa.jpg" },
//       { name: "Book Publishing", price: 150.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023438/publishing_hnf9dx.jpg" },
//       { name: "Wedding Programme", price: 50.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023435/programme_eaiqpj.jpg" },
//       { name: "Invitation Cards", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/invitation_p2bmgb.jpg" },
//       { name: "Complimentary Cards", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023429/com_cards_sht6sl.jpg" },
//       { name: "Plastic ID Cards", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/id_card_qg32qe.jpg" },
//       { name: "Gift Bags", price: 35.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023437/gift_bag_w44ymi.jpg" },
    
//       { name: "T-Shirts", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023439/t_shirt_bllo5e.jpg" },
//       { name: "Caps", price: 15.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/cap_tutuaw.jpg" },
//       { name: "Plates", price: 10.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023433/plate_ywvkrw.jpg" },
//       { name: "Mugs", price: 12.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023436/mug_kzxsdj.jpg" },
//       { name: "School Bags", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/bag_my9l6x.jpg" },
//     ];
//     try {
//       const response = await fetch('http://localhost:3000/product/products/bulk', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(goodsList),
//       });
//       const data = await response.json();
//       console.log('Bulk upload result:', data);
//     } catch (error) {
//       console.error('Error uploading products:', error);
//     }
//     };
    
//     bulkUploadProducts();
    
   
    

// const storeInitialSettings = async () => {
//     const data = {
//       votePrice: 10,          // Your desired initial vote price
//       contestActive: true      // Initial contest active status (true or false)
//     };
  
//     try {
//       const response = await fetch('http://localhost:3000/setting/storeInitialSettings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         console.log('Initial settings saved:', result);
//       } else {
//         console.error('Error:', result.message);
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//     }
//   };
  
//   storeInitialSettings();