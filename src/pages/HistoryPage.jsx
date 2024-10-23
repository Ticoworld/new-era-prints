import React, { useEffect, useState } from "react";
import Loader from "../components/Loader"; // You can use your own loader component

const HistoryPage = ({serverUrl}) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${serverUrl}/user/gethistory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("Usertoken"), // Adjust the token retrieval based on your implementation
          },
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setHistoryItems(data.history); // Assuming 'data.history' is the array of completed orders
        } else {
          setError(data.message || "Failed to fetch history");
        }
      } catch (err) {
        setError("An error occurred while fetching history");
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-customBlack p-6">
      {loading ? (
        <Loader /> // Display a loading spinner or indicator
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Purchase History
          </h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : historyItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {historyItems.map((order, index) => (
                <li
                  key={index}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={order.items[0]?.image || "/path/to/placeholder-image.png"}
                      alt={order.items[0]?.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        Order #{order.orderId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Completed on: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no completed orders.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
