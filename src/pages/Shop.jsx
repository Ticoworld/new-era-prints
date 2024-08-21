import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerHeader from "../components/CustomerHeader";
import HistoryPage from "./HistoryPage";
import Cart from "./Cart";
import Loader from "../components/Loader";
import CustomerDashboard from "../components/CustomerDashboard ";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('expiresAt');
  return Date.now() > expiresAt;
};

const getToken = () => {
  if (isTokenExpired()) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    return null;
  }
  return localStorage.getItem('token');
};

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/login'); // Redirect to login if no valid token
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/getdata`, {
          headers: {
            'x-access-token': token, 
          }
        });
        const data = await response.json();
        if (data.success) {
          setUser(data)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
    const expirationTime = localStorage.getItem('expiresAt');
    if (!expirationTime) return;

    const timeLeft = expirationTime - Date.now();
    const timer = setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/login');
    }, timeLeft);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    // Simulate a delay for loading (remove this in production)
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={user}>
      <div>
        <CustomerHeader />
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

export default Shop;
