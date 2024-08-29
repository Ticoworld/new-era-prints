import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AdminContext = createContext();

// Create a provider component
const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all data function
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all users
      const usersResponse = await fetch('http://localhost:3000/admin/users');
      if (!usersResponse.ok) throw new Error('Failed to fetch users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch all contestants
      const contestantsResponse = await fetch('http://localhost:3000/admin/contestants');
      if (!contestantsResponse.ok) throw new Error('Failed to fetch contestants');
      const contestantsData = await contestantsResponse.json();
      setContestants(contestantsData);

      // Fetch all pending orders with associated users
      const pendingOrdersResponse = await fetch('http://localhost:3000/admin/orders/pending');
      if (!pendingOrdersResponse.ok) throw new Error('Failed to fetch pending orders');
      const pendingOrdersData = await pendingOrdersResponse.json();
      setPendingOrders(pendingOrdersData);

      // Fetch all completed orders with associated users
      const completedOrdersResponse = await fetch('http://localhost:3000/admin/orders/completed');
      if (!completedOrdersResponse.ok) throw new Error('Failed to fetch completed orders');
      const completedOrdersData = await completedOrdersResponse.json();
      setCompletedOrders(completedOrdersData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminContext.Provider value={{ users, contestants, pendingOrders, completedOrders, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

// Export context and provider
export { AdminContext, AdminProvider };
