import React, { useState } from "react";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import ContestantHeader from "../components/ContestantHeader";

const ContestantPage = () => {
  const [copied, setCopied] = useState(false);

  // Sample data for voters with time of vote and number of votes
  const voters = [
    { username: "JohnDoe", time: "2024-08-13 14:00", votes: 3 },
    { username: "JaneSmith", time: "2024-08-13 15:30", votes: 1 },
    { username: "MikeJohnson", time: "2024-08-13 16:45", votes: 2 },
    // Add more voters as needed
  ];

  // Calculate total number of votes and voters
  const totalVotes = voters.reduce((sum, voter) => sum + voter.votes, 0);
  const totalVoters = voters.length;

  // Sample invite link
  const inviteLink = "https://contestwebsite.com/invite/username";

  // Copy invite link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    Swal.fire({
      icon: "success",
      title: "Link copied!",
      text: "Invite link has been copied to clipboard.",
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Share options
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Vote for Me!",
        text: "Join the contest and vote for me!",
        url: inviteLink,
      });
    } else {
      copyLink(); // Fallback to copy if share isn't supported
    }
  };

  return (
    <div>
      <ContestantHeader />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Contestant Profile */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="/src/images/contestant.png" // Replace with the actual contestant profile image
                alt="Contestant Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Ella Marvel
                </h2>
                <p className="text-sm text-gray-600">
                  Welcome back, Ella Marvel!
                </p>
              </div>
            </div>
            <button
              onClick={shareLink}
              className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
              <FaShareAlt />
              <span className="text-sm md:text-lg">Share Link</span>
            </button>
          </div>

          {/* Voters List */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Your Voters</h3>
            <p className="text-gray-700">
              Total Voters: {totalVoters} | Total Votes: {totalVotes}
            </p>
            <div className="mt-4">
              {voters.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {voters.map((voter, index) => (
                    <li
                      key={index}
                      className="py-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AiOutlineUser className="text-gray-600 w-6 h-6" />
                        <div>
                          <p className="text-lg font-medium text-gray-800">
                            {voter.username}
                          </p>
                          <p className="text-sm text-gray-500">
                            Voted at: {voter.time}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        Votes: {voter.votes}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No voters yet. Share your link to get votes!
                </p>
              )}
            </div>
          </div>

          {/* Invite Link */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Invite Link</h3>
            <div className="mt-2 flex items-center space-x-2 bg-gray-100 p-4 rounded-lg">
              <FiLink className="text-gray-600 w-6 h-6" />
              <p className="text-gray-800 truncate">{inviteLink}</p>
              <button
                onClick={copyLink}
                className="ml-auto bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
                <FaCopy />
              </button>
            </div>
          </div>

          {/* View Leaderboard Button */}
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestantPage;
