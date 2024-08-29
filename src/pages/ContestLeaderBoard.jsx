import React, { useState, useEffect } from 'react';

const ContestLeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://new-era-server-five.vercel.app/admin/contestants', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
        const data = await response.json();
        if (data.success) {
          // Sort contestants by votes in descending order
          const sortedData = data.contestants.sort((a, b) => b.votes - a.votes);
          setLeaderboardData(sortedData);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="p-4 py-10 bg-customWhite dark:bg-customBlack">
      <h2 className="text-2xl font-semibold text-center text-black dark:text-customWhite mb-4">
        Contest Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-dark-customBlue dark:bg-customOrange text-white text-left">
                Username
              </th>
              <th className="py-2 px-4 bg-dark-customBlue dark:bg-customOrange text-white text-left">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((contestant, index) => (
              <tr key={contestant._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{contestant.username}</td>
                <td className="py-2 px-4">{contestant.votes}</td>
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
