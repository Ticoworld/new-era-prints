import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('Usertoken');
        const response = await fetch('https://new-era-server-five.vercel.app/user/getOrders', {
          headers: { 'x-access-token': token },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-customBlack">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">My Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-800 ">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Order #{order.orderId}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100">
                    Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Items:</h4>
                  <ul className="list-disc pl-5 text-gray-800 dark:text-gray-100">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((product, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p>{product.name}</p>
                            <p>
                              ${product.price ? product.price.toFixed(2) : '0.00'} x {product.quantity ?? 0}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No items found in this order.</li>
                    )}
                  </ul>
                  <p className="text-gray-800 dark:text-gray-100">Status: {order.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
