import React from "react";
import { FaCartPlus, FaShoppingCart, FaHistory } from "react-icons/fa";
import CustomerHeader from "./CustomerHeader";

const goodsList = [
  // Large Format Prints
  { id: 1, name: "Flex Banners", price: 50.0, image: "/path/to/flex-banners.jpg" },
  { id: 2, name: "Stickers", price: 20.0, image: "/path/to/stickers.jpg" },
  { id: 3, name: "Branding", price: 100.0, image: "/path/to/branding.jpg" },

  // Paper Prints
  { id: 4, name: "Brochures", price: 30.0, image: "/path/to/brochures.jpg" },
  { id: 5, name: "Calendars", price: 25.0, image: "/path/to/calendars.jpg" },
  { id: 6, name: "Posters", price: 40.0, image: "/path/to/posters.jpg" },
  { id: 7, name: "Flyers", price: 15.0, image: "/path/to/flyers.jpg" },
  { id: 8, name: "Exercise Books", price: 10.0, image: "/path/to/exercise-books.jpg" },
  { id: 9, name: "Jotters", price: 5.0, image: "/path/to/jotters.jpg" },
  { id: 10, name: "Letterheads", price: 35.0, image: "/path/to/letterheads.jpg" },
  { id: 11, name: "Office Profile", price: 45.0, image: "/path/to/office-profile.jpg" },
  { id: 12, name: "Invoice", price: 30.0, image: "/path/to/invoice.jpg" },
  { id: 13, name: "Book Publishing", price: 150.0, image: "/path/to/book-publishing.jpg" },
  { id: 14, name: "Wedding Programme", price: 50.0, image: "/path/to/wedding-programme.jpg" },
  { id: 15, name: "Invitation Cards", price: 20.0, image: "/path/to/invitation-cards.jpg" },
  { id: 16, name: "Complimentary Cards", price: 25.0, image: "/path/to/complimentary-cards.jpg" },
  { id: 17, name: "Plastic ID Cards", price: 30.0, image: "/path/to/plastic-id-cards.jpg" },
  { id: 18, name: "Gift Bags", price: 35.0, image: "/path/to/gift-bags.jpg" },

  // Customization
  { id: 19, name: "T-Shirts", price: 20.0, image: "/path/to/t-shirts.jpg" },
  { id: 20, name: "Caps", price: 15.0, image: "/path/to/caps.jpg" },
  { id: 21, name: "Plates", price: 10.0, image: "/path/to/plates.jpg" },
  { id: 22, name: "Mugs", price: 12.0, image: "/path/to/mugs.jpg" },
  { id: 23, name: "School Bags", price: 25.0, image: "/path/to/school-bags.jpg" },
];

const CustomerDashboard = ({ addToCart, username }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      {/* Header */}
      <CustomerHeader username={username} />

      {/* Main Content */}
      <div className="p-6">
  <div className=" bg-white dark:bg-black shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-customBlue">Our Services</h2>
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
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
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