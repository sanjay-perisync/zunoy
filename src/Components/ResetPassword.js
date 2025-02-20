import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { verifyEmail,verifyOtp,updatePassword } from "../APIconfig/PutApiconfig";




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
  const [accountCreated, setAccountCreated] = useState(false);
  
  // const otpRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);
  useEffect(() => {
    otpRefs.current = Array(6).fill().map(() => React.createRef());
  }, []);
  

  // useEffect(() => {
  //   let timer;
  //   if (otpSent && resendTimer > 0) {
  //     setCanResend(false);
  //     timer = setInterval(() => {
  //       setResendTimer((prev) => prev - 1);
  //     }, 1000);
  //   } else if (resendTimer === 0) {
  //     setCanResend(true);
  //     clearInterval(timer);
  //   }
  //   return () => clearInterval(timer);
  // }, [otpSent, resendTimer]);





  // const handleVerifyEmail = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.put(
  //       "https://znginx.perisync.work/api/v1/acc/forgotPassword",
  //       { email }
  //     );

  //     if (response.status === 200) {
  //       toast.success("OTP sent successfully!");
  //       setOtpSent(true);
  //       setResendTimer(10);
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     toast.error("Failed to send OTP. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      await verifyEmail(email);
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setResendTimer(10);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };






  // const handleResendClick = async () => {
  //   if (!canResend) return;
  //   try {
  //     const response = await axios.put(
  //       "https://znginx.perisync.work/api/v1/acc/forgotPassword",
  //       { email }
  //     );
  //     if (response.status === 200) {
  //       setResendTimer(10);
  //       setCanResend(false);
  //     }
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //   }
  // };

  const handleResendClick = async () => {
    if (!canResend) return;
    try {
      const response = await axios.put(
        "https://znginx.perisync.work/api/v1/acc/forgotPassword",
        { email }
      );
      if (response.status === 200) {
        setOtp(["", "", "", "", "", ""]); 
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







  // const handleVerifyOtp = async () => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       email: email.trim(),
  //       otp: parseInt(otp.join(""), 10),
  //     };

  //     console.log("Sending OTP verification request:", payload);

  //     const response = await axios.put(
  //       "https://znginx.perisync.work/api/v1/acc/verifyOtp",
  //       payload,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     console.log("Response:", response.data);

  //     if (response.status === 200) {
  //       toast.success("OTP verified successfully!");

  //       if (response.data.identifier) {
  //         localStorage.setItem("identifier", response.data.identifier);
  //       }
  //       setOtpVerified(true);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("API Error Response:", error.response.data);
  //       toast.error(error.response.data.msg || "OTP verification failed");
  //     } else {
  //       console.error("Error:", error.message);
  //       toast.error("Network error occurred");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };






  // const handleUpdatePassword = async () => {
  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }

  //   if (
  //     !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  //   ) {
  //     toast.error(
  //       "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
  //     );
  //     return;
  //   }

  //   const identifier = localStorage.getItem("identifier");
  //   if (!identifier) {
  //     toast.error("Session expired. Please restart the password reset process.");
  //     return;
  //   }

  //   const payload = {
  //     email: email.trim(),
  //     password: password,
  //     identifier: identifier,
  //     device: "133.0.0.0",
  //     ipAddress: "106.51.219.124",
  //   };

  //   setLoading(true);
  //   try {
  //     console.log("Sending password reset request:", payload);
  //     const response = await axios.put(
  //       "https://znginx.perisync.work/api/v1/acc/setPassword",
  //       payload
  //     );

  //     if (response.status === 200) {
  //       toast.success("Password updated successfully!");
  //       localStorage.removeItem("identifier");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error Response:", error.response?.data);
  //     if (error.response?.data?.code === 333) {
  //       toast.error(
  //         "Your session has expired. Please restart the password reset process."
  //       );
  //     } else if (error.response?.status === 404) {
  //       toast.error("Invalid request. Please check your details and try again.");
  //     } else {
  //       toast.error("Failed to update password. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await verifyOtp(email, otp.join(""));
      toast.success("OTP verified successfully!");
      localStorage.setItem("identifier", response.data.identifier);
      setOtpVerified(true);
    } catch (error) {
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      toast.error("Password must include uppercase, number, and special character.");
      return;
    }

    const identifier = localStorage.getItem("identifier");
    if (!identifier) {
      toast.error("Session expired. Please restart the reset process.");
      return;
    }

  //   setLoading(true);
  //   try {
  //     await updatePassword(email, password, identifier);
  //     toast.success("Password updated successfully!");
  //     localStorage.removeItem("identifier");
  //     navigate("/");
  //   } catch (error) {
  //     toast.error("Failed to update password. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  setLoading(true);
try {
  await updatePassword(email, password, identifier);
  toast.success("Password updated successfully!");
  
  setAccountCreated(true); 

  localStorage.removeItem("identifier");

  setTimeout(() => {
    navigate("/");
  }, 3000); 
} catch (error) {
  toast.error("Failed to update password. Please try again.");
} finally {
  setLoading(false);
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



        {accountCreated ? (
                        <div className="bg-green-50 p-6 rounded-lg shadow-lg flex flex-col justify-center h-[500px] items-center text-center w-full">
                            <div className="flex justify-center">
                                <img src="https://account.zunoy.com/assets/iconly/iconly-glass-tick.svg" alt="Success" className="w-16 h-16" />
                            </div>
                            <h2 className="text-lg font-semibold mt-4 text-green-700">Your password has been Updated Successfully</h2>
                            <p className="text-gray-600 mt-2">You will be redirected to Login page Please wait ...</p>
                        </div>
                    ) : (
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
                className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify Email"}
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
                className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
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
        className="w-full my-6 text-lg bg-indigo-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Update Password"}
      </button>


</div>

          )}

        </form>
         )}

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
