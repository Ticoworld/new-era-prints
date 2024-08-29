// CompletedOrders.js
import React, {  useState, useEffect } from 'react';

const CompletedOrders = ({completedOrders}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Filter orders based on search term
    setFilteredOrders(
      completedOrders.flatMap(user =>
        user.orders.filter(order =>
          order.billingAddress.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(order => ({
          ...order,
          userName: user.fullname,
          userEmail: user.email
        }))
      )
    );
  }, [searchTerm, completedOrders]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Completed Orders</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b">Order ID</th>
            <th className="p-2 border-b">User Name</th>
            <th className="p-2 border-b">User Email</th>
            <th className="p-2 border-b">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td className="p-2 border-b">{order.orderId}</td>
              <td className="p-2 border-b">{order.billingAddress.name}</td>
              <td className="p-2 border-b">{order.billingAddress.email}</td>
              <td className="p-2 border-b">{order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedOrders;
