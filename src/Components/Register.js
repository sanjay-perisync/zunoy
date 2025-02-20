import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SendotpAPI } from "../APIconfig/getAPIconfig";
import { VerifyOtpApi } from "../APIconfig/PutApiconfig";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from './Footer';
import Header from "./Header";
import CircularProgress from '@mui/material/CircularProgress';


function Register() {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const otpRefs = useRef([]);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [email, setEmailState] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [status, setStatus] = useState("");
    const [resendTimer, setResendTimer] = useState(10);
    const [canResend, setCanResend] = useState(false);
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function CircularIndeterminate() {
        return (
            <CircularProgress style={{ color: 'white', margin: '0 auto', display: 'block' }} />
        );
    }





    // useEffect(() => {
    //     let timer;
    //     if (resendTimer > 0) {
    //       timer = setInterval(() => {
    //         setResendTimer((prev) => prev - 1);
    //       }, 1000);
    //     } else {
    //       clearInterval(timer);
    //     }
    //     return () => clearInterval(timer);
    //   }, [resendTimer]);


    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);




    const handleResendClick = () => {
        if (canResend) {
            setOtpSent(false);
            setResendTimer(10);
            setCanResend(false);
            handleEmailVerification();
        }
    };




    const handleEmailVerification = () => {
        if (!email) {
            toast.error("Please enter your email address!", { position: "top-right" });
            return;
        }

        toast.loading("Sending OTP...", { id: "otpLoading" });

        const data = { email: email, otp: false };

        SendotpAPI(data, setLoader, setOtpSent, setError)
            .then(() => {
                toast.dismiss("otpLoading");
                toast.success("OTP sent successfully!", { position: "top-right" });
            })
            .catch((err) => {
                toast.dismiss("otpLoading");
                console.error("Error:", err);
                toast.error("Error sending OTP. Please try again.", { position: "top-right" });
            });
    };

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
        }
    };

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            toast.error("Please enter a 6-digit OTP.");
            return;
        }

        const otpData = {
            email: email,
            otp: Number(enteredOtp),
        };

        setLoader(true);
        dispatch(VerifyOtpApi(otpData, setLoader, setStatus, navigate));
    };




    // const renderStep = (number, text, completed, isLast = false) => (
    //     <div className="flex items-center space-x-2 relative">
    //         <span className={`w-6 h-6 flex items-center justify-center rounded-full 
    //             ${completed ? "bg-indigo-600 text-white" : "bg-gray-400"}  text-sm font-medium`}>
    //             {completed ? "✔" : number}
    //         </span>
    //         <span className={`${completed ? "text-white font-semibold" : "text-gray-500"}`}>
    //             {text}
    //         </span>
    //         {!isLast && <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>}
    //     </div>
    // );





    return (
        <div className="flex h-screen">
            {/* Left section */}
            <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 mx-auto max-w-2xl">
                <Header />
                <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
                    {/* <div className="mt-4 space-y-8">
                        {renderStep(1, "Email Verification", otpVerified)}
                        {renderStep(2, "Setup Password", false)}
                        {renderStep(3, "Complete your Profile", false, true)}
                    </div> */}
                    <div className="mt-4 space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-2 relative">
                            <span
                                className={`w-6 h-6 flex items-center justify-center rounded-full ${otpVerified ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"} font-medium`}
                            >
                                {otpVerified ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    "1"
                                )}
                            </span>
                            <span className={`${otpVerified ? "font-semibold" : "text-gray-900 font-medium"}`}>
                                Email Verification
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>
                        {/* Step 2*/}
                        <div className="flex items-center space-x-2 relative">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full ${otpVerified ? "bg-indigo-600" : "bg-gray-400"} text-white font-medium`}>
                                2
                            </span>
                            <span className={`${otpVerified ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                Setup Password
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>
                        {/* Step 3*/}
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white font-medium">
                                3
                            </span>
                            <span className="text-gray-500">Complete your Profile</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 mx-auto">
                    <p className="text-black font-bold text-xl">Need assistance?</p>
                    <p className="text-lg">
                        Reach out to us at: <span className="">support@zunoy.com</span>
                    </p>
                </div>
            </section>

            {/* Right section */}
            <section className="flex flex-col h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white p-6">
                <div className="hidden lg:flex"></div>
                <div className="flex flex-col justify-between">
                    <header className="flex justify-start lg:hidden mb-20">
                        <img src="/images/image 314.svg" alt="Logo" className="object-cover h-10" />
                    </header>
                    <div className="flex flex-col gap-2 px-5">
                        <div className="flex justify-start items-start text-start">
                            <h2 className="text-2xl font-bold text-start">Register</h2>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-4">
                                Already have an account?{" "}
                                <button className="text-indigo-600 font-medium" onClick={() => navigate("/")}>
                                    Log in
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-5 mb-5 w-auto lg:w-[500px] px-5">
                        <>
                            <TextField
                                type="email"
                                label="Email"
                                variant="filled"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmailState(e.target.value)}
                                disabled={otpSent}
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
                            {otpSent && (
                                <div className="flex justify-between gap-2 mb-4">
                                    {otp.map((digit, index) => (
                                        <TextField
                                            key={index}
                                            name={`otp-${index}`}
                                            type="text"
                                            inputProps={{
                                                maxLength: 1,
                                                style: { textAlign: "center" },
                                                pattern: "[0-9]*",
                                                inputMode: "numeric"
                                            }}
                                            variant="outlined"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            inputRef={(el) => (otpRefs.current[index] = el)}
                                            className="w-12"
                                        />
                                    ))}
                                </div>
                            )}

                            {otpSent && (
                                <div className="flex justify-between items-center space-y-2">
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

                                        className={`px-4 py-2 rounded ${!canResend ? "" : " text-gray-700"
                                            }`}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            )}


                            <button
                                className={`mt-4 w-full py-4 rounded-xl font-medium transition ${loader ? "bg-gray-200 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-700"}`}
                                disabled={loader}
                                onClick={otpSent ? handleVerifyOtp : handleEmailVerification}
                            >
                                {loader ? <CircularIndeterminate /> : otpSent ? "Verify OTP" : "Verify Email"}
                            </button>

                        </>

                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
}

export default Register;


