import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ContestantPageComponent from "../components/ContestantPageComponent";
import Loader from "../components/Loader";

const ContestantPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Please log in to access this page.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/contest-login");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/contestant/getdata", {
          method: "GET",
          headers: {
            "x-access-token": token,
          }
        });
        const result = await response.json();
        if (result.success) {
          if (result.isRegistrationCompleted) {
            setUser(result);
            setLoading(false);
          } else {
            navigate("/complete-registration");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Failed to fetch user data.",
          });
          navigate('/contest-login')
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>
      <Loader />
    </div>;
  }

  return (
    <div>
      <ContestantPageComponent user={user} />
    </div>
  );
};

export default ContestantPage;
