import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AdminContext = createContext();

// Create a provider component
const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [awaitingOrders, setAwaitingOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serverUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch all data function
  const fetchData = async () => {
    const token = localStorage.getItem('AdminToken'); // Get token from localStorage

    if (!token) {
      setError('No token found!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const headers = {
        // "Content-Type": "application/json",
          'x-access-token': token,

      };
      const usersResponse = await fetch(`${serverUrl}/admin/users`, {headers});
      if (!usersResponse.ok) throw new Error('Failed to fetch users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch all contestants
      const contestantsResponse = await fetch(`${serverUrl}/admin/contestants`, {headers});
      if (!contestantsResponse.ok) throw new Error('Failed to fetch contestants');
      const contestantsData = await contestantsResponse.json();
      setContestants(contestantsData);

      // Fetch all awaiting orders with associated users
      const awaitingOrdersResponse = await fetch(`${serverUrl}/admin/orders/awaiting`, {headers});
      if (!awaitingOrdersResponse.ok) throw new Error('Failed to fetch awaiting orders');
      const awaitingOrdersData = await awaitingOrdersResponse.json();
      setAwaitingOrders(awaitingOrdersData);

      // Fetch all pending orders with associated users
      const pendingOrdersResponse = await fetch(`${serverUrl}/admin/orders/pending` , {headers});
      if (!pendingOrdersResponse.ok) throw new Error('Failed to fetch pending orders');
      const pendingOrdersData = await pendingOrdersResponse.json();
      setPendingOrders(pendingOrdersData);

      // Fetch all completed orders with associated users
      const completedOrdersResponse = await fetch(`${serverUrl}/admin/orders/completed` , {headers});
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
    <AdminContext.Provider value={{ users, contestants, awaitingOrders, pendingOrders, completedOrders, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

// Export context and provider
export { AdminContext, AdminProvider };