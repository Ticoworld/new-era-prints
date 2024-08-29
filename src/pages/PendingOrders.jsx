import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const PendingOrders = ({pendingOrders}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Filter orders based on search term
    setFilteredOrders(
      pendingOrders.flatMap(user =>
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
  }, [searchTerm, pendingOrders]);

  const handleCompleteOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will mark the order as completed.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, complete it!',
      });
  
      if (result.isConfirmed) {
        // Ensure the URL matches your backend route
        const response = await fetch(`http://localhost:3000/admin/orders/${orderId}/complete`, { method: 'PATCH' });
  
        if (response.ok) {
          Swal.fire('Completed!', 'The order has been marked as completed.', 'success');
        } else {
          throw new Error('Failed to complete the order');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'There was an issue completing the order.', 'error');
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pending Orders</h1>
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
            <th className="p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order._id}>
              <td className="p-2 border-b">{order.orderId}</td>
              <td className="p-2 border-b">{order.userName}</td>
              <td className="p-2 border-b">{order.userEmail}</td>
              <td className="p-2 border-b">{order.totalAmount}</td>
              <td className="p-2 border-b">
                <button
                  onClick={() => handleCompleteOrder(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Mark as Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
