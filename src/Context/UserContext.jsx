// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const fetchUserData = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await fetch('http://localhost:3000//user-auth/getData', {
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
