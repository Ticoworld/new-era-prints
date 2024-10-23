import React from 'react';
import { FaUsers, FaClipboardList, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import DashboardStatsGraph from './DashboardStatsGraph'; // Import the graph component

const DashboardStats = ({ usersCount, contestantsCount, pendingOrdersCount, completedOrdersCount }) => {

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center h-32">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-2xl font-bold">{usersCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center h-32">
          <FaClipboardList className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Contestants</h2>
            <p className="text-2xl font-bold">{contestantsCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center h-32">
          <FaShoppingCart className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
            <p className="text-2xl font-bold">{pendingOrdersCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center h-32">
          <FaCheckCircle className="text-purple-500 text-3xl mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Completed Orders</h2>
            <p className="text-2xl font-bold">{completedOrdersCount}</p>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Comparison</h2>
        <DashboardStatsGraph
          pendingOrdersCount={pendingOrdersCount}
          completedOrdersCount={completedOrdersCount}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
