import React from "react";

const ContestLeaderBoard = () => {
  // Sample data for leaderboard
  const leaderboardData = [
    { username: "EllaMarvel", votes: 1200 },
    { username: "JohnDoe", votes: 1150 },
    { username: "JaneSmith", votes: 1100 },
    // Add more users as needed
  ];

  return (
    <div className="p-4 py-10 bg-customWhite dark:bg-customBlack">
      <h2 className="text-2xl font-semibold text-center text-black dark:text-customWhite mb-4">
        Contest Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-dark-customBlue dark:bg-customOrange  text-white text-left">
                Username
              </th>
              <th className="py-2 px-4 bg-dark-customBlue dark:bg-customOrange  text-white text-left">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button className="bg-dark-customBlue dark:bg-customOrange text-white py-2 px-6 rounded">
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default ContestLeaderBoard;
