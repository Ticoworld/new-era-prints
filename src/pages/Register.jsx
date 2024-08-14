import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("Abuja");
  const [role, setRole] = useState("Contestant");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-customGray dark:bg-customBlack md:py-20 py-10 md:px-12 px-6 shadow-md">
        <div className="bg-white dark:bg-customGray2 shadow-lg rounded-lg flex overflow-hidden w-full max-w-5xl">
          {/* Left Section - Image */}
          <div className="hidden lg:block w-1/3 bg-customBlack flex-1">
            <img
              src="/src/images/register.jpeg"
              alt="Registration Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-2/3 p-8 md:p-12 flex flex-col justify-center flex-1">
            <h2 className="text-3xl font-bold mb-6 text-customBlack">
              REGISTRATION
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-customBlack mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
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
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md">
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
                <label className="block text-customBlack mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md">
                  <option value="Contestant">Contestant</option>
                  {/* Add other options if needed */}
                </select>
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
              </div>
              <div>
                <label className="block text-customBlack mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                />
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
              <button className="w-full bg-customBlue text-white py-3 rounded-md font-semibold">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
