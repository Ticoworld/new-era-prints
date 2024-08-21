import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Toast from "../../utils/utils";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(""); // Manually entered OTP
  const [loading, setLoading] = useState(false); // Loading state for verification process
  const [resendingOtp, setResendingOtp] = useState(false); // Loading state for OTP resend
  const [searchParams] = useSearchParams(); // To extract the OTP from URL query parameters
  const navigate = useNavigate();

  // Retrieve email from local storage
  const email = localStorage.getItem("email");

  useEffect(() => {
    const otpFromUrl = searchParams.get("otp");

    if (otpFromUrl && email) {
      verifyOtp(otpFromUrl, true); // Call verification function with OTP from URL
    }
  }, [searchParams, email]);

  const verifyOtp = async (otpToVerify, isUrlOtp = false) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/verify/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpToVerify, email }),
      });

      const res = await response.json();

      if (res.success) {
        Toast.fire({
          icon: "success",
          title: "Email verified successfully. Redirecting to login page...",
        });
        navigate('/login'); // Redirect directly to login page
      } else {
        Toast.fire({
          icon: "error",
          title: res.message,
        });
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp) {
      Toast.fire({
        icon: "error",
        title: "Please enter your OTP",
      });
      return;
    }
    if (!email) {
      Toast.fire({
        icon: "error",
        title: "Email address is missing. Please try again later.",
      });
      return;
    }
    verifyOtp(otp);
  };

  const handleResendOtp = async () => {
    setResendingOtp(true);
    try {
      if (!email) {
        Toast.fire({
          icon: "error",
          title: "Email address is required for resending OTP",
        });
        return;
      }

      const response = await fetch("http://localhost:3000/verify/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const res = await response.json();

      if (res.success) {
        Toast.fire({
          icon: "success",
          title: "OTP has been resent. Please check your email.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: res.message,
        });
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again later.",
      });
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-customGray dark:bg-customBlack md:py-20 py-10 md:px-12 px-6">
      <div className="bg-white dark:bg-customGray2 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-customBlack">Verify Email</h2>
        {loading || resendingOtp ? (
          <p className="text-center text-customBlack">Processing...</p>
        ) : (
          <>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-customBlack mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full input-style bg-customBlue text-white py-3 px-4 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-customBlue text-white py-3 rounded-md font-semibold"
                disabled={loading}
              >
                Verify Email
              </button>
            </form>
            <button
              onClick={handleResendOtp}
              className="w-full bg-customGray text-white py-3 rounded-md font-semibold mt-4"
              disabled={resendingOtp}
            >
              {resendingOtp ? "Resending OTP..." : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
