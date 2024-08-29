import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CompleteRegistrationPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (file, setFileState) => {
    new Compressor(file, {
      quality: 0.6, // Adjust the quality to reduce the file size
      maxWidth: 800, // Resize width if needed
      maxHeight: 600, // Resize height if needed
      success(result) {
        setFileState(result);
      },
      error(err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Image compression failed.",
        });
      },
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file, setProfilePic);
    }
  };

  const handleCoverPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file, setCoverPic);
    }
  };

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
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Completed",
          text: "Your registration is now complete!",
        });
        navigate("/contestantpage");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "There was an error completing your registration.",
        });
      }
    } catch (error) {
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
          {/* Profile Picture */}
          <div>
            <label className="block text-gray-800 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full"
            />
          </div>

          {/* Cover Picture */}
          <div>
            <label className="block text-gray-800 mb-2">Cover Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPicChange}
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
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistrationPage;
