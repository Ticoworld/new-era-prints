import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";

const goodsList = [
  // Your goods list as defined earlier
  { id: 1, name: "Flex Banners", price: 50.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/banners_egtp5l.jpg" },
  { id: 2, name: "Stickers", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023434/sticker_hlcjbj.jpg" },
  { id: 3, name: "Branding", price: 100.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023436/branding_gxm19e.jpg" },

  // Paper Prints
  { id: 4, name: "Brochures", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/brochure_qow32a.jpg" },
  { id: 5, name: "Calendars", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/calendar_l2cscs.jpg" },
  { id: 6, name: "Posters", price: 40.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023433/poster_qumjpe.jpg" },
  { id: 7, name: "Flyers", price: 15.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023429/flyer_omcfqt.jpg" },
  { id: 8, name: "Exercise Books", price: 10.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/exercise_kyyfjv.jpg" },
  { id: 9, name: "Jotters", price: 5.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/jotter_c5ddfn.jpg" },
  { id: 10, name: "Letterheads", price: 35.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023449/Letterhead_opiw5l.jpg" },
  { id: 11, name: "Office Profile", price: 45.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023435/office_x1wme5.jpg" },
  { id: 12, name: "Invoice", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/invoice_rrwosa.jpg" },
  { id: 13, name: "Book Publishing", price: 150.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023438/publishing_hnf9dx.jpg" },
  { id: 14, name: "Wedding Programme", price: 50.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023435/programme_eaiqpj.jpg" },
  { id: 15, name: "Invitation Cards", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023432/invitation_p2bmgb.jpg" },
  { id: 16, name: "Complimentary Cards", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023429/com_cards_sht6sl.jpg" },
  { id: 17, name: "Plastic ID Cards", price: 30.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/id_card_qg32qe.jpg" },
  { id: 18, name: "Gift Bags", price: 35.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023437/gift_bag_w44ymi.jpg" },

  { id: 19, name: "T-Shirts", price: 20.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023439/t_shirt_bllo5e.jpg" },
  { id: 20, name: "Caps", price: 15.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023430/cap_tutuaw.jpg" },
  { id: 21, name: "Plates", price: 10.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023433/plate_ywvkrw.jpg" },
  { id: 22, name: "Mugs", price: 12.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023436/mug_kzxsdj.jpg" },
  { id: 23, name: "School Bags", price: 25.0, image: "https://res.cloudinary.com/dglky8nrs/image/upload/v1729023427/bag_my9l6x.jpg" },
];

const CustomerDashboard = () => {
  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the current cart items from the backend on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`https://new-era-server-five.vercel.app/user/getdata`, {
          headers: {
            'x-access-token': localStorage.getItem('Usertoken'), 
          }
        });
        const data = await response.json();
        if (data.success && data.cartItems) {
          setCart(data.cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const response = await fetch(`https://new-era-server-five.vercel.app/user/updateCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('Usertoken'), // Assuming token is stored in localStorage
        },
        body: JSON.stringify({
          cartItems: [...cart, item], // Add the new item to the current cart
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCart([...cart, item]); // Update the local cart state
        setSuccessMessage('Item added to cart successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      } else {
        console.error('Error adding item to cart:', data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white dark:bg-black shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-customBlue">Our Services</h2>
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {goodsList.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₦{item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
                  >
                    <FaCartPlus className="inline mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
