import React, { useState } from "react";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import Swal from "sweetalert2";
import ContestantHeader from "./ContestantHeader";
import Button from "./Button"; // Ensure Button component is imported

const ContestantPageComponent = ({ user }) => {
  const [copied, setCopied] = useState(false);

  // Generate the invite link based on the username
  const inviteLink = `https://new-era-server-five.vercel.app/invite/${user.username}`;

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

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vote for Me!",
          text: "Join the contest and vote for me!",
          url: inviteLink,
        });
        console.log("Successfully shared");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyLink();
      alert("Web Share API is not supported in your browser.");
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
                src={
                  user
                    ? `${user.profilePic}`
                    : "/images/contestant.png"
                }
                alt="Contestant Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user ? user.username : ""}
                </h2>
                <p className="text-sm text-gray-600">
                  Welcome back, {user ? user.username : ""}
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

          {/* Invite Link */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Invite Link</h3>
            <div className="mt-2 flex items-center bg-gray-100 p-4 rounded-lg">
              <FiLink className="text-gray-600 w-6 h-6" />
              <p className="text-gray-800 truncate flex-1 ml-2">{inviteLink}</p>
              <button
                onClick={copyLink}
                className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition">
                <FaCopy />
              </button>
            </div>
          </div>

          {/* Voters List */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Your Voters</h3>
            <p className="text-gray-700">
              Total Voters: {user.votes.length} | Total Votes:{" "}
              {user.votes.reduce(
                (total, vote) => total + vote.numberOfVotes,
                0
              )}
            </p>
            <div className="mt-4">
              {/* Display list of voters */}
              {user.votes.length > 0 ? (
                <ul>
                  {user.votes.map((vote, index) => (
                    <li key={index} className="border-b py-2">
                      <AiOutlineUser className="inline-block mr-2" />
                      {vote.voterName} ({vote.numberOfVotes} votes)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No voters yet.</p>
              )}
            </div>
          </div>

          {/* View Leaderboard Button */}
          {/* <div className="mt-8 text-center">
            <Button
              text="View Leaderboard"
              bgColor="bg-blue-600"
              textColor="text-white"
              link="/leaderboard"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContestantPageComponent;
