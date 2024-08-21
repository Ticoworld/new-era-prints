import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import EachContestant from "../components/EachContestant";
import ContestLeaderBoard from "../components/ContestLeaderBoard";
import Swal from "sweetalert2";

const Contestant = () => {
  const { username } = useParams();
  const [contestant, setContestant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContestantData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/contestant/invite/${username}`);
        const result = await response.json();
        if (result.success) {
          setContestant(result.data); // Adjust based on the actual response structure
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Failed to fetch contestant data.",
          });
        }
      } catch (error) {
        console.error("Error fetching contestant data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContestantData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {contestant ? <EachContestant contestant={contestant} /> : <div>No contestant available</div>}
      <ContestLeaderBoard />
    </div>
  );
};

export default Contestant;
