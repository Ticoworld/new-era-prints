import React, { useEffect, useState } from "react";
import Loader from "../components/Loader"; // You can use your own loader component

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/gethistory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("Usertoken"), // Adjust the token retrieval based on your implementation
          },
        });
        const data = await response.json();

        if (response.ok) {
          setHistoryItems(data.history);
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
              {historyItems.map((item, index) => (
                <li
                  key={index}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/path/to/placeholder-image.png"}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Purchased on: {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.amount / 100).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no purchase history.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
