import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisteredUsers = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleDelete = async (userId) => {
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
        const response = await fetch(`http://localhost:3000/admin/users/${userId}`, { method: 'DELETE' });
  
        if (response.ok) {
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          // Optionally, you can also refresh the data after deletion
          // fetchData();
        } else {
          throw new Error('Failed to delete the user');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'There was an issue deleting the user.', 'error');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
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
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Full Name</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.username}</td>
                <td className="py-3 px-4 border-b">{user.fullname}</td>
                <td className="py-3 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-3 px-4 border-b text-right">
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default RegisteredUsers;
