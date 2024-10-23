import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import DashboardStats from "../components/DashboardStats";
import RegisteredUsers from "./RegisteredUsers";
import RegisteredContestants from "./RegisteredContestants";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";
import { AdminContext } from "../Context/AdminContext"; // Import AdminContext
import LeaderBoard from "./LeaderBoard";
import VerifyOrders from "./VerifyOrders";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import AdminProductManagement from "./AdminProductManagement";
import AdminSetting from "./AdminSetting";

// Check if the token is expired
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  return Date.now() > expiresAt;
};

// Get the admin token from localStorage
const getToken = () => {
  if (isTokenExpired()) {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("expiresAt");
    return null;
  }
  return localStorage.getItem("AdminToken");
};

const AdminPage = ({serverUrl}) => {
  const {
    users,
    contestants,
    awaitingOrders,
    pendingOrders,
    completedOrders,
    loading,
    error,
  } = useContext(AdminContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      localStorage.removeItem("AdminToken");
      localStorage.removeItem('expiresAt');
      setUser(null);
      navigate("/admin-auth");
      Swal.fire("Logged out", "You have successfully logged out.", "success");
    }
  });
};

  // Fetch user data to check if the user is admin
  useEffect(() => {
    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Your session has expired. Please log in again.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin-auth"); // Redirect to login if no valid token
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${serverUrl}/admin/getdata`, {
          headers: {
            "x-access-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Unauthorized",
            text: "You are not authorized to access this page.",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/admin-auth");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  
  return (
    <div>
      {user && <AdminNavbar logout={logout}/>}
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <DashboardStats
                usersCount={users.length}
                contestantsCount={contestants.length}
                pendingOrdersCount={pendingOrders.reduce(
                  (total, pend) => total + pend.orders.length,
                  0
                )}
                completedOrdersCount={completedOrders.reduce(
                  (total, compl) => total + compl.orders.length,
                  0
                )}
              />
            }
          />
          <Route path="products" element={<AdminProductManagement users={users} serverUrl={serverUrl}/>} />
          <Route path="users" element={<RegisteredUsers users={users} serverUrl={serverUrl}/>} />
          <Route
            path="contestants"
            element={<RegisteredContestants contestants={contestants} serverUrl={serverUrl}/>}
          />
          <Route
            path="verify-orders"
            element={<VerifyOrders awaitingOrders={awaitingOrders} serverUrl={serverUrl}/>}
          />
          <Route
            path="pending-orders"
            element={<PendingOrders pendingOrders={pendingOrders} serverUrl={serverUrl}/>}
          />
          <Route
            path="completed-orders"
            element={<CompletedOrders completedOrders={completedOrders} />}
          />
          <Route
            path="setting"
            element={<AdminSetting contestants={contestants} serverUrl={serverUrl}/>}
          />
          <Route
            path="leaderboard"
            element={<LeaderBoard contestants={contestants} />}
          />
        </Routes>
      ) : (
        <Loader />
      )}
      <Outlet />
    </div>
  );
};

export default AdminPage;


