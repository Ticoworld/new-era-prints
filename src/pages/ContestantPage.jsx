import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ContestantPageComponent from "../components/ContestantPageComponent";
import Loader from "../components/Loader";

const ContestantPage = ({serverUrl}) => {
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
          didClose: () => navigate("/contest-login"), // Redirect after Swal closes
        });
        return;
      }

      try {
        const response = await fetch(`${serverUrl}/contestant/getdata`, {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        });
        const result = await response.json();
        console.log(result);
        if (result.success) {

          if (result.role === "contestant") {
            if (result.isRegistrationCompleted) {
              setUser(result);
            } else {
              navigate("/complete-registration");
            }
          } else {
            Swal.fire({
              icon: "warning",
              title: "Unauthorized",
              text: "You do not have permission to access this page.",
              timer: 2000,
              showConfirmButton: false,
              didClose: () => navigate("/contest-login"), // Redirect after Swal closes
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Failed to fetch user data.",
            timer: 2000,
            showConfirmButton: false,
            didClose: () => navigate('/contest-login'), // Redirect after Swal closes
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
          timer: 2000,
          showConfirmButton: false,
          didClose: () => navigate('/contest-login'), // Redirect after Swal closes
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user || user.role !== "contestant") {
    Swal.fire({
      icon: "warning",
      title: "Access Denied",
      text: "You do not have permission to access this page.",
      timer: 2000,
      showConfirmButton: false,
      didClose: () => navigate('/contest-login'), // Redirect after Swal closes
    });
    return null; // Prevent rendering the rest of the component while redirecting
  }

  return (
    <div>
      <ContestantPageComponent user={user} serverUrl={serverUrl}/>
    </div>
  );
};

export default ContestantPage;
