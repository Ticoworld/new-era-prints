import React, { useEffect, useState } from "react";
import Toast from "../utils/utils";

const AdminSetting = ({serverUrl}) => {
  const [votePrice, setVotePrice] = useState("");
  const [contestActive, setContestActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voteIsLoading, setVoteIsLoading] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(null);

  // Fetch current settings on component mount
  useEffect(() => {

    const fetchCurrentSettings = async () => {
        const token = localStorage.getItem('AdminToken');
      try {
        const response = await fetch(`${serverUrl}/setting/settings`,{
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
        });
        const data = await response.json();
        if (response.ok) {
          setCurrentSettings(data);
          setVotePrice(data.price);
          setContestActive(data.contestActive);
        } else {
          throw new Error("Failed to fetch current settings");
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message,
        });
      }
    };

    fetchCurrentSettings();
  }, []);

  const handleVotePriceChange = (e) => {
    setVotePrice(e.target.value);
  };

  const handleContestToggle = () => {
    setContestActive(!contestActive);
  };

  const handleUpdateVotePrice = async () => {
    const token = localStorage.getItem('AdminToken');
    setVoteIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/setting/updateVotePrice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ votePrice: parseFloat(votePrice) }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vote price");
      }

      Toast.fire({
        icon: 'success',
        title: 'Vote price updated successfully!',
      });
      
      // Update current settings after successful update
      setCurrentSettings((prev) => ({ ...prev, price: votePrice }));
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message,
      });
    } finally {
      setVoteIsLoading(false);
    }
  };

  const handleUpdateContestActive = async () => {
    const token = localStorage.getItem('AdminToken');
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/setting/updateContestStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ contestActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contest status");
      }

      Toast.fire({
        icon: 'success',
        title: 'Contest status updated successfully!',
      });

      // Update current settings after successful update
      setCurrentSettings((prev) => ({ ...prev, contestActive }));
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg flex space-x-8">
      {/* Current Settings Display */}
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Current Settings</h2>
        {currentSettings ? (
          <div>
            <p className="mb-2">
              <strong>Current Vote Price:</strong> ₦{currentSettings.price}
            </p>
            <p className="mb-2">
              <strong>Contest Active:</strong> {currentSettings.contestActive ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> {new Date(currentSettings.lastUpdated).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading current settings...</p>
        )}
      </div>

      {/* Update Settings Form */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Settings</h2>

        {/* Vote Price Update */}
        <div className="mb-4">
          <label htmlFor="votePrice" className="block text-lg font-semibold mb-2">
            Update Vote Price
          </label>
          <input
            type="number"
            id="votePrice"
            value={votePrice}
            onChange={handleVotePriceChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new vote price"
          />
          <button
            onClick={handleUpdateVotePrice}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={voteIsLoading}
          >
            {voteIsLoading ? "Updating..." : "Update Vote Price"}
          </button>
        </div>

        {/* Contest Active Toggle */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Contest Active Status
          </label>
          <div className="flex items-center justify-between">
            <span>{contestActive ? "Yes" : "No"}</span>
            <div
              onClick={handleContestToggle}
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                contestActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  contestActive ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
          <button
            onClick={handleUpdateContestActive}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Contest Status"}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">More settings coming soon...</p>
      </div>
    </div>
  );
};

export default AdminSetting;
