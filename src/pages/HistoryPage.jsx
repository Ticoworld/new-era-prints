import React from "react";
import CustomerHeader from "../components/CustomerHeader";

const HistoryPage = ({}) => {
  const HistoryItems = [
    {
      name: "Business Card Design",
      date: "2024-08-10",
      price: 19.99,
      image: "/images/business-card.jpg", // Replace with your image path
    },
    {
      name: "Flyer Printing",
      date: "2024-07-25",
      price: 29.99,
      image: "/images/flyer.jpg", // Replace with your image path
    },
    {
      name: "T-Shirt Design",
      date: "2024-07-15",
      price: 14.99,
      image: "/images/tshirt.jpg", // Replace with your image path
    },
  ];
  return (
    <div>
      <CustomerHeader />

      <div className="min-h-screen bg-gray-100 dark:bg-customBlack p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Purchase History
          </h2>
          {HistoryItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {HistoryItems.map((item, index) => (
                <li
                  key={index}
                  className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Purchased on: {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no purchase history.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
