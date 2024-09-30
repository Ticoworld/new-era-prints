import React, { useContext, useEffect, useState } from "react";

const Leaderboard = ({ contestants }) => {
  const [rankedContestants, setRankedContestants] = useState([]);

  useEffect(() => {
    console.log(contestants); // Check the data structure
    if (contestants && contestants.length > 0) {
      const sortedContestants = [...contestants].sort(
        (a, b) => b.votes - a.votes
      );
      setRankedContestants(sortedContestants);
    }
  }, [contestants]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="p-2 border-b">Rank</th>
            <th className="p-2 border-b">Profile Picture</th>
            <th className="p-2 border-b">Username</th>
            <th className="p-2 border-b">Votes</th>
          </tr>
        </thead>
        <tbody>
          {rankedContestants.map((contestant, index) => (
            <tr key={contestant._id || index}>
              {" "}
              {/* Use contestant._id if available, otherwise use index */}
              <td className="p-2 border-b">{index + 1}</td>
              <td className="p-2 border-b">
                <img
                  src={
                    typeof contestant.profilePic === "string"
                      ? `http://localhost:3000/${contestant.profilePic}`
                      : "default-image-url"
                  }
                  alt={
                    typeof contestant.username === "string"
                      ? contestant.username
                      : "Profile Picture"
                  }
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
              <td className="p-2 border-b">
                {typeof contestant.username === "string"
                  ? contestant.username
                  : "Unknown Username"}
              </td>
              <td className="p-2 border-b">
              {contestant.votes.reduce((total, vote) => total + vote.numberOfVotes, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
