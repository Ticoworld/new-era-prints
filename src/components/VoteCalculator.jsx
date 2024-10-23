import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { handlePayment } from '../utils/votePayment';

const VoteCalculator = ({ contestant, onClose, votePrice, setVotePrice, serverUrl }) => {
  const [votes, setVotes] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch the vote price dynamically if needed (you can remove this if votePrice is passed in from a parent component)
    const fetchVotePrice = async () => {
      try {
        const response = await fetch(`${serverUrl}/setting/getVotePrice`); // Adjust this endpoint
        const data = await response.json();
        setVotePrice(data.price);
      } catch (error) {
        console.error('Failed to fetch vote price:', error.message);
      }
    };

    if (!votePrice) {
      fetchVotePrice();
    }
  }, [votePrice, setVotePrice]);

  const handleVoteChange = (e) => {
    const value = e.target.value;
    setVotes(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleVoteSubmit = () => {
    if (votes > 0 && email && name) {
      const totalAmount = Number(votes) * votePrice; // Use dynamic votePrice
      console.log(typeof totalAmount);

      Swal.fire({
        title: 'Confirm Payment',
        text: `Do you want to pay the sum of ₦${totalAmount.toFixed(2)} to vote for ${contestant.username}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, pay now!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          handlePayment(email, totalAmount, name, contestant.username, votes)
            .then((response) => {
              if (response.success) {
                Swal.fire('Paid!', `Your payment has been processed for ${votes} votes for ${contestant.username}.`, 'success');
                onClose(); // Close the modal on successful payment
              } else {
                Swal.fire('Error', 'An error occurred while processing your payment.', 'error');
              }
            })
            .catch((error) => {
              Swal.fire('Error', `An error occurred: ${error.message}`, 'error');
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your payment was cancelled.', 'error');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter a valid number of votes, email, and name.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="vote-for-contestant">
      <h3 className="text-lg font-semibold mb-4">Vote for {contestant.username}</h3>
      <p className="text-gray-600 mb-2">Each vote costs ₦{votePrice}</p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="votes">
          Number of Votes:
        </label>
        <input
          type="text"
          id="votes"
          value={votes}
          onChange={handleVoteChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="0"
          placeholder="Enter the number of votes"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your name"
        />
      </div>
      <button
        onClick={handleVoteSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pay for {votes} Votes
      </button>
    </div>
  );
};

export default VoteCalculator;
