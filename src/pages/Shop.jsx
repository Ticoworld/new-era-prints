import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, Routes, Route, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerHeader from "../components/CustomerHeader";
import HistoryPage from "./HistoryPage";
import Cart from "./Cart";
import Loader from "../components/Loader";
import CheckoutPage from "./CheckoutPage";
import OrderPage from "./OrderPage";
import CustomerDashboard from "../components/CustomerDashboard";
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
    localStorage.removeItem('Usertoken');
    localStorage.removeItem('expiresAt');
    return null;
  }
  return localStorage.getItem('Usertoken');
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
        const response = await fetch(`https://new-era-server-five.vercel.app/user/getdata`, {
          headers: {
            'x-access-token': token,
          }
        });
        const data = await response.json();
        if (data.success) {
          const role = data.role;
          if (role === "customer") {
            setUser(data);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Unauthorized',
              text: 'You are not authorized to access this page.',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate('/login');
          }
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            timer: 2000,
            showConfirmButton: false,
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const expirationTime = localStorage.getItem('expiresAt');
    if (expirationTime) {
      const timeLeft = expirationTime - Date.now();
      const timer = setTimeout(() => {
        localStorage.removeItem('Usertoken');
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
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Usertoken");
        localStorage.removeItem('expiresAt');
        setUser(null);
        navigate("/login");
        Swal.fire("Logged out", "You have successfully logged out.", "success");
      }
    });
  };

  return (
    <UserContext.Provider value={user}>
      {user && user.role === "customer" ? (
        <div>
          <CustomerHeader logout={logout} />
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order" element={<OrderPage />} />
          </Routes>
          <Outlet />
        </div>
      ) : (
        <Loader />
      )}
    </UserContext.Provider>
  );
};

export default Shop;
