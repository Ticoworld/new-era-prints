import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("Abuja");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state for validation
  const [errorFullname, setErrorFullname] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorAgreeToTerms, setErrorAgreeToTerms] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset all error messages before validation
    setErrorFullname("");
    setErrorUsername("");
    setErrorEmail("");
    setErrorPhoneNumber("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorAgreeToTerms("");

    // Basic validation
    if (!fullname) setErrorFullname("Full name is required");
    if (!username) setErrorUsername("Username is required");
    if (!email) setErrorEmail("Email is required");
    if (!phoneNumber) setErrorPhoneNumber("Phone number is required");
    if (!password) setErrorPassword("Password is required");
    if (password !== confirmPassword)
      setErrorConfirmPassword("Passwords do not match");
    if (!agreeToTerms) setErrorAgreeToTerms("You must agree to the terms");

    // Check if there are any validation errors
    if (
      !fullname ||
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      password !== confirmPassword ||
      !agreeToTerms
    ) {
      return; // Exit if there are errors
    }

    // Proceed to fetch request if validation passes
    try {
      const response = await fetch("https://new-era-server-five.vercel.app/user-auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          email,
          phoneNumber,
          state,
          password,
          agreeToTerms,
        }),
      });
    
      const res = await response.json();  // Parse the response
    
      if (res.success === true) {
        // Store the user's email in localStorage to use during verification
        localStorage.setItem("email", email);
        localStorage.setItem("role", 'customer');
    
        // Display success message
        Toast.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have been registered successfully! Please check your email to verify your account.",
        });
    
        // Redirect to the verify-email page
        navigate('/verify-email');
      } else {
        // Handle failed registration
        Toast.fire({
          icon: "error",  // Update the icon to 'error' instead of 'failed'
          title: "Registration Failed",
          text: res.message || "Your registration failed. Please check your connection and try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    
      // Handle network or server error
      Toast.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-customGray dark:bg-customBlack md:py-20 py-10 md:px-12 px-6 shadow-md">
        <div className="bg-white dark:bg-customGray2 shadow-lg rounded-lg flex overflow-hidden w-full max-w-5xl">
          {/* Left Section - Image */}
          <div className="hidden lg:block w-1/3 bg-customBlack flex-1">
            <img
              src="/images/register.jpeg"
              alt="Registration Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col justify-center flex-1">
            <h2 className="text-3xl font-bold mb-6 text-customBlack">
              REGISTRATION
            </h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-customBlack mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
                {errorFullname && (
                  <p className="text-red-500 text-sm">{errorFullname}</p>
                )}
              </div>
              <div>
                <label className="block text-customBlack mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
                {errorUsername && (
                  <p className="text-red-500 text-sm">{errorUsername}</p>
                )}
              </div>
              <div>
                <label className="block text-customBlack mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
                {errorEmail && (
                  <p className="text-red-500 text-sm">{errorEmail}</p>
                )}
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
                {errorPhoneNumber && (
                  <p className="text-red-500 text-sm">{errorPhoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-customBlack mb-2">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md">
                  {/* Add other options if needed */}
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
              </div>
              
              <div>
                <label className="block text-customBlack mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errorPassword && (
                  <p className="text-red-500 text-sm">{errorPassword}</p>
                )}
              </div>
              <div>
                <label className="block text-customBlack mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errorConfirmPassword && (
                  <p className="text-red-500 text-sm">{errorConfirmPassword}</p>
                )}
              </div>
          
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="mr-2"
                />
                <label
                  htmlFor="terms"
                  className="md:text-sm text-xs text-customBlack ">
                  I AGREE TO THE TERMS AND CONDITIONS
                </label>
              </div>
              {errorAgreeToTerms && (
                <p className="text-red-500 text-sm">{errorAgreeToTerms}</p>
              )}
              <button className="w-full bg-customBlue text-white py-3 rounded-md font-semibold">
                Register
              </button>
            </form>
            <div className="pt-4"><p>Already have an account? <Link to="/login" className="text-customBlue">Login</Link></p></div> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
