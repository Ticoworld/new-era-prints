import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CompleteRegistrationPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Please log in to access this page.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/contest-login");
        return;
      }
      try {
        const response = await fetch("https://new-era-server-five.vercel.app/contestant/getdata", {
          method: "GET",
          headers: {
            "x-access-token": token,
          }
        });
        const result = await response.json();
        if (result.success) {
          if (result.isRegistrationCompleted) {
            navigate("/contestantpage");
          } else {

          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Failed to fetch user data.",
          });
          navigate("/contest-login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      }
    };

    fetchUserData();
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("coverPic", coverPic);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("facebook", facebook);
    formData.append("whatsapp", whatsapp);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://new-era-server-five.vercel.app/contestant-auth/complete-registration", {
        method: "POST",
        body: formData,
        headers: {
          "x-access-token": token,
        },
      });

      const result = await response.json();
      console.log(result); // Log the result to check

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Completed",
          text: "Your registration is now complete!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/contestantpage"); // Ensure this route is correct
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error completing your registration.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          {/* Profile Picture */}
          <div>
            <label className="block text-gray-800 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Cover Picture */}
          <div>
            <label className="block text-gray-800 mb-2">Cover Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverPic(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Social Media Links */}
          <div>
            <label className="block text-gray-800 mb-2">Twitter</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="Twitter Profile Link"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">Instagram</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram Profile Link"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">Facebook</label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook Profile Link"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp Profile Link"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistrationPage;
