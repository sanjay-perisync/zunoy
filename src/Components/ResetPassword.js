import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));



  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);




  

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/forgotPassword",
        { email }
      );

      if (response.status === 200) {
        setOtpSent(true);
        setResendTimer(10);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };





  const handleResendClick = async () => {
    if (!canResend) return;
    try {
      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/forgotPassword",
        { email }
      );
      if (response.status === 200) {
        setResendTimer(10); 
        setCanResend(false);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

   
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].current.focus();
    }
  };



  const handleVerifyOtp = async () => {
    try {
      const payload = {
        email: email.trim(),
        otp: parseInt(otp.join(""), 10)
      };

      console.log("Sending OTP verification request:", payload);

      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/verifyOtp",
        payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        setOtpVerified(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };




  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      alert("Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.");
      return;
    }


    const identifier = localStorage.getItem("identifier");

    if (!identifier) {
      alert("Identifier not found. Please log in again.");
      return;
    }

    const payload = {
      device: "133.0.0.0",
      email,
      identifier,
      ipAddress: "106.51.221.186",
      password,

    };

    try {
      const response = await axios.put("https://znginx.perisync.work/api/v1/acc/setPassword", payload);

      if (response.status === 200) {

        navigate("/");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };





  return (
    <div className="flex flex-col justify-between min-h-screen py-2">
      <header className="flex justify-start p-4">
        <img src="/images/image 314.svg" alt="Logo" className="object-cover h-10" />
      </header>

      <div className="w-full mx-auto max-w-md lg:max-w-lg p-6 space-y-6">
        <h2 className="text-xl lg:text-3xl font-semibold">Reset password</h2>
        <p className="text-gray-500 mt-2">
          Go back to Login Page?
          <Link to="/" className="text-indigo-500 font-semibold text-[16px] pl-2 hover:text-indigo-600">
            Login
          </Link>
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          {!otpSent ? (
            <>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "3px solid",
                    borderColor: focused ? "#1976D2" : "#F8F8F8",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    transition: "border-color 0.3s ease",
                  },
                  "& .MuiInputBase-root:hover": {
                    borderColor: focused ? "#1976D2" : "#BEBEBE",
                    backgroundColor: "#F8F8F8",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    borderColor: "#1976D2",
                    backgroundColor: "white",
                  },
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                    display: "none",
                  },
                }}
              />

              <button
                type="button"
                onClick={handleVerifyEmail}
                className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Verify Email
              </button>
            </>
          ) : !otpVerified ? (
            <>
              <div className="flex justify-between gap-2 mt-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs.current[index]}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl  border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>


              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>

              {otpSent && (
                <div className="flex justify-between items-center space-y-2 mt-4">
                  <p className="text-gray-700">
                    {resendTimer > 0 ? (
                      <span>Resend OTP available in {resendTimer}s</span>
                    ) : (
                      "Didn't receive OTP?"
                    )}
                  </p>
                  <button
                    onClick={handleResendClick}
                    disabled={!canResend}
                    className={`px-4 py-2 rounded ${!canResend
                        ? " cursor-not-allowed"
                        : " text-black ho transition"
                      }`}
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <TextField
                type="password"
                label="Password"
                variant="filled"
                fullWidth

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "3px solid",
                    borderColor: focused ? "#1976D2" : "#F8F8F8",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    transition: "border-color 0.3s ease",
                  },
                  "& .MuiInputBase-root:hover": {
                    borderColor: focused ? "#1976D2" : "#BEBEBE",
                    backgroundColor: "#F8F8F8",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    borderColor: "#1976D2",
                    backgroundColor: "white",
                  },
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                    display: "none",
                  },
                }}
              />
              <TextField
                type="password"
                label="Confirm Password"
                variant="filled"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

                sx={{
                  "& .MuiInputBase-root": {
                    border: "3px solid",
                    borderColor: focused ? "#1976D2" : "#F8F8F8",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    transition: "border-color 0.3s ease",
                  },
                  "& .MuiInputBase-root:hover": {
                    borderColor: focused ? "#1976D2" : "#BEBEBE",
                    backgroundColor: "#F8F8F8",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    borderColor: "#1976D2",
                    backgroundColor: "white",
                  },
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                    display: "none",
                  },
                }}
              />

              <button
                type="button"
                onClick={handleUpdatePassword}
                className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </div>
          )}

        </form>

        <div className="mt-6 space-y-2">
          <p className="font-semibold text-lg lg:text-xl">Need assistance?</p>
          <p>
            Reach out to us at: <a href="mailto:support@zunoy.com">support@zunoy.com</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResetPassword;
