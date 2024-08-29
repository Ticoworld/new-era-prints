import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import DashboardStats from "../components/DashboardStats";
import RegisteredUsers from "./RegisteredUsers";
import RegisteredContestants from "./RegisteredContestants";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";
import { AdminContext } from "../Context/AdminContext"; // Import AdminContext
import LeaderBoard from "./LeaderBoard";

const AdminPage = () => {
  // Use the context to get data
  const { users, contestants, pendingOrders, completedOrders, loading, error } = useContext(AdminContext);
  console.log(pendingOrders)
  console.log(completedOrders)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <DashboardStats
              usersCount={users.length}
              contestantsCount={contestants.length}
              pendingOrdersCount={pendingOrders.length}
              completedOrdersCount={completedOrders.length}
            />
          }
        />
        <Route path="users" element={<RegisteredUsers users={users} />} />
        <Route
          path="contestants"
          element={<RegisteredContestants contestants={contestants} />}
        />
        <Route
          path="pending-orders"
          element={<PendingOrders pendingOrders={pendingOrders} />}
        />
        <Route
          path="completed-orders"
          element={<CompletedOrders completedOrders={completedOrders} />}
        />
        <Route
          path="leaderboard"
          element={<LeaderBoard contestants={contestants} />}
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default AdminPage;
