import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  }
});

const CompleteRegistrationPage = () => {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [profilePicUploading, setProfilePicUploading] = useState(false);
  const [coverPicUploading, setCoverPicUploading] = useState(false);
  const [profilePicCloudinaryUrl, setProfilePicCloudinaryUrl] = useState("");
const [coverPicCloudinaryUrl, setCoverPicCloudinaryUrl] = useState("");

  const navigate = useNavigate();

  // Handle image upload and track upload status
  const handleImageUpload = async (file, setUrl, setUploadingStatus, setCloudinaryUrl) => {
    setUploadingStatus(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
  
      // Set public_id for rendering the image (preview)
      setUrl(data.public_id);
  
      // Store secure_url for server request (database)
      setCloudinaryUrl(data.secure_url); // This is the URL you will send to the server
      
      console.log("Uploaded Image Public ID:", data.public_id);
      console.log("Uploaded Image Secure URL:", data.secure_url);
      setUploadingStatus(false);
    } catch (error) {
      setUploadingStatus(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Image upload failed. Please try again.",
      });
    }
  };
  
  // Profile picture handler
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file, setProfilePicUrl, setProfilePicUploading, (url) => {
      setProfilePicCloudinaryUrl(url); // Store the cloudinary URL for server
    });
  };
  
  // Cover picture handler
  const handleCoverPicChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file, setCoverPicUrl, setCoverPicUploading, (url) => {
      setCoverPicCloudinaryUrl(url); // Store the cloudinary URL for server
    });
  };
  
  // Ensure all fields are filled and images are uploaded before submitting
  const isFormValid = () => {
    return (
      profilePicUrl && 
      coverPicUrl && 
      twitter.trim() && 
      instagram.trim() && 
      facebook.trim() && 
      whatsapp.trim() && 
      !profilePicUploading && 
      !coverPicUploading
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill all fields and ensure both images are uploaded.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://new-era-server-five.vercel.app/contestant-auth/complete-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          profilePic: profilePicCloudinaryUrl,
          coverPic: coverPicCloudinaryUrl,
          twitter,
          instagram,
          facebook,
          whatsapp,
        }),
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

  const profilePicCloudinaryImage = profilePicUrl ? cld.image(profilePicUrl) : null;
  const coverPicCloudinaryImage = coverPicUrl ? cld.image(coverPicUrl) : null;

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
            {profilePicUploading ? <p>Uploading...</p> : profilePicCloudinaryImage && (
              <AdvancedImage cldImg={profilePicCloudinaryImage} className="w-32 h-32 mt-4" />
            )}
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
            {coverPicUploading ? <p>Uploading...</p> : coverPicCloudinaryImage && (
              <AdvancedImage cldImg={coverPicCloudinaryImage} className="w-full h-32 mt-4" />
            )}
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
            className={`w-full py-3 rounded-md font-semibold transition ${
              isFormValid() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistrationPage;
