import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { handlePayment } from '../utils/votePayment';

const VoteCalculator = ({ contestant, onClose }) => {
  const [votes, setVotes] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const pricePerVote = 50; // Each vote costs $50

  const handleVoteChange = (e) => {
    const value = e.target.value;
    setVotes(Number(value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleVoteSubmit = () => {
    if (votes > 0 && email && name) {
      const totalAmount = votes * pricePerVote;

      Swal.fire({
        title: 'Confirm Payment',
        text: `Do you want to pay the sum of $${totalAmount.toFixed(2)} to vote for ${contestant.username}?`,
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
      <p className="text-gray-600 mb-2">Each vote costs $50</p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="votes">
          Number of Votes:
        </label>
        <input
          type="number"
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
