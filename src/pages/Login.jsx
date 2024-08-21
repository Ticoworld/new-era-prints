import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../../utils/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Check if password is empty
    if (password === "") {
      setErrorPassword("Password cannot be empty");
      return;
    } else {
      setErrorPassword(""); // Clear the error message
    }
  
    setLoading(true); // Start loading
  
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await response.json();
      setLoading(false); // Stop loading
  
      if (res.success === true) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("expiresAt", res.expirationTime * 1000); // Store the expiration time in milliseconds
  
        if (res.role === "Customer") {
          Toast.fire({
            icon: "success",
            title: "Login Successful",
          });
          navigate("/shop");
        } else {
          Toast.fire({
            icon: "success",
            title: "Login Successful",
          });
          navigate("/contestantpage");
        }
      } else {
        Toast.fire({
          icon: "error",
          title: res.message,
        });
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.log({ Error: error });
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
              src="/src/images/login.jpeg"
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col justify-center flex-1">
            <h2 className="text-3xl font-bold mb-6 text-customBlack">LOGIN</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-customBlack mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
              </div>

              <div>
                {errorPassword && (
                  <p className="text-red-500 text-sm mb-2">{errorPassword}</p>
                )}
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-customBlue text-white py-3 rounded-md font-semibold"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
                   <div className="pt-4"><p>Don't have an account? <Link to="/register" className="text-customBlue">Sign up</Link></p></div> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
