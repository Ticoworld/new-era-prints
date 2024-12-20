import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisteredContestants = ({ contestants, serverUrl }) => {
  const [searchTerm, setSearchTerm] = useState('');

const handleDelete = async (contestantId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      // Perform delete operation
      const response = await fetch(`${serverUrl}/admin/contestants/${contestantId}`, { method: 'DELETE' });

      if (response.ok) {
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        // Optionally, you can also refresh the data after deletion
        // fetchData();
      } else {
        throw new Error('Failed to delete the contestant');
      }
    }
  } catch (error) {
    Swal.fire('Error', 'There was an issue deleting the contestant.', 'error');
  }
};
  const filteredContestants = contestants.filter(contestant =>
    contestant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contestant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contestant.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by username, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Full Name</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Votes</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContestants.map(contestant => (
              <tr key={contestant._id}>
                <td className="py-3 px-4 border-b">
                  <img src={contestant.profilePic} alt={contestant.fullname} className="w-16 h-16 object-cover rounded-full" />
                </td>
                <td className="py-3 px-4 border-b">{contestant.email}</td>
                <td className="py-3 px-4 border-b">{contestant.username}</td>
                <td className="py-3 px-4 border-b">{contestant.fullname}</td>
                <td className="py-3 px-4 border-b">{contestant.phoneNumber}</td>
                <td className="py-3 px-4 border-b">{contestant.votes.reduce((total, vote) => total + vote.numberOfVotes, 0)}</td>
                <td className="py-3 px-4 border-b text-right">
                  <button
                    onClick={() => handleDelete(contestant._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredContestants;
