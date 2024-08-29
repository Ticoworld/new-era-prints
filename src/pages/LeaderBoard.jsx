import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Leaderboard = () => {
  const [contestants, setContestants] = useState([]);
  
  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const response = await fetch('https://new-era-server-five.vercel.app/admin/leaderboard');
        const result = await response.json();
        
        if (result.success) {
          setContestants(result.contestants);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message || 'Failed to fetch leaderboard data.',
          });
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
      }
    };
    
    fetchContestants();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Profile Picture</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Votes</th>
            </tr>
          </thead>
          <tbody>
            {contestants.map((contestant, index) => (
              <tr key={contestant._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <img src={`https://new-era-server-five.vercel.app/${contestant.profilePic}`} alt={contestant.fullName} className="w-16 h-16 object-cover rounded-full" />
                </td>
                <td className="py-2 px-4 border-b">{contestant.fullName}</td>
                <td className="py-2 px-4 border-b">{contestant.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
