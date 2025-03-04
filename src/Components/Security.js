import React from 'react'
import Navbar from './Navbar';
import Mainpagefooter from './Mainpagefooter';
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Accordion, AccordionSummary, AccordionDetails, TextField, CircularProgress } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { requestOtpFor2FA } from '../APIconfig/getAPIconfig';
import toast from "react-hot-toast";
import { toggleTwoFA } from '../APIconfig/getAPIconfig';
import ChangePassword from './ChangePassword';






function Security() {

   
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const isOtpComplete = otp.every((digit) => digit !== "");

    const [loading, setLoading] = useState(false);
    const [otpVisible, setOtpVisible] = useState(false);
    const modalRef = useRef(null);
    const inputRefs = useRef([]);

    const [resendTimer, setResendTimer] = useState(10);
    const [isResendDisabled, setIsResendDisabled] = useState(true);


    // const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(localStorage.getItem("twoFAStatus") === "true");






    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDialogOpen]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsDialogOpen(false);
            }
        };
        if (isDialogOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDialogOpen]);




    const handlePasswordValidation = async () => {
        if (!userPassword) {
            toast.error("Please enter your password");
            return;
        }

        setLoading(true);
        try {
            const isValid = await requestOtpFor2FA(userPassword);
            if (isValid) {
                setOtp(["", "", "", "", "", ""]);
                setOtpVisible(true);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
        setLoading(false);
    };


    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };



    useEffect(() => {
        if (isResendDisabled) {
            const interval = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isResendDisabled]);

    const handleResendOtp = () => {
        handlePasswordValidation();
        setIsResendDisabled(true);
        setResendTimer(60);
    };





    const handleToggle2FA = async () => {
        if (!userPassword || !isOtpComplete) {
            toast.error("Please enter required fields");
            return;
        }

        setLoading(true);
        const result = await toggleTwoFA(userPassword, otp, !is2FAEnabled);

        if (result.success) {
            setIs2FAEnabled(!is2FAEnabled);
            toast.success(result.message);
            setIsDialogOpen(false);
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    };





    
    return (
        <div className='h-screen flex flex-col justify-between'>

            <header className='top-0 left-0 sticky bg-white z-10'>
                <Navbar />
            </header>



            <main className='h-auto px-16 py-5 space-y-10'>



                <div className='border rounded-2xl'>
                    <Accordion
                        sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            overflow: "hidden",
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore className="text-gray-400" />} sx={{ borderRadius: "40px", padding: "20px" }}>
                            <p className="text-[16px] md:text-[18px] font-semibold">Multi Factor Authentication</p>
                        </AccordionSummary>

                        <AccordionDetails className="space-y-5  border-t">

                            <div>
                                {/* <button
                                    className="bg-customGreen text-white text-sm font-semibold rounded-xl px-5 py-2 mt-5"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Turn On
                                </button> */}



                                <button
                                    className={`text-white text-sm font-semibold rounded-xl px-5 py-2 mt-5 ${is2FAEnabled ? "bg-red-500 hover:bg-red-600" : "bg-customGreen hover:bg-teal-500"
                                        }`}
                                    onClick={() => {
                                        setUserPassword("");
                                        setOtp(["", "", "", "", "", ""]);
                                        setOtpVisible(false);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    Turn {is2FAEnabled ? "Off" : "On"}
                                </button>






                                {isDialogOpen && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
                                        <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6" ref={modalRef} >
                                            <h2 className="text-[24px] font-semibold">Enter password & validate</h2>


                                            <div className="relative mt-4">
                                                <TextField
                                                    type={isPasswordVisible ? "text" : "password"}
                                                    value={userPassword}
                                                    onChange={(e) => setUserPassword(e.target.value)}
                                                    label="Password"
                                                    variant="filled"
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputBase-root": {
                                                            border: "3px solid",
                                                            borderColor: "#F8F8F8",
                                                            borderRadius: "8px",
                                                            backgroundColor: "white",
                                                            transition: "border-color 0.3s ease",
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
                                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                                >
                                                    {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                                </button>
                                            </div>


                                            {!otpVisible && (
                                                <div className="flex justify-end gap-5 mt-4">
                                                    <button className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-100" onClick={() => setIsDialogOpen(false)}>
                                                        Close
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold flex items-center"
                                                        onClick={handlePasswordValidation}
                                                        disabled={loading}
                                                    >
                                                        {loading ? <CircularProgress size={20} className="mr-2 text-white" /> : "Validate Password"}
                                                    </button>
                                                </div>
                                            )}


                                            {otpVisible && (
                                                <div>

                                                    <div className="flex justify-between gap-1 md:gap-3 mt-3">
                                                        {otp.map((digit, index) => (
                                                            <input
                                                                key={index}
                                                                ref={(el) => (inputRefs.current[index] = el)}
                                                                type="text"
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                                maxLength="1"
                                                                className="w-10 h-10 mx-1 lg:w-16 lg:h-14 border text-center text-lg font-bold outline-none rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                            />
                                                        ))}
                                                    </div>


                                                    <div className="flex justify-between mt-3">
                                                        <p className="text-gray-500">
                                                            Didn't receive OTP? {isResendDisabled && <span >{resendTimer}s</span>}
                                                        </p>
                                                        <button
                                                            className={`text-indigo-500 font-semibold hover:underline ${isResendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                                            onClick={handleResendOtp}
                                                            disabled={isResendDisabled}
                                                        >
                                                            Resend OTP
                                                        </button>
                                                    </div>

                                                </div>
                                            )}


                                            {otpVisible && (
                                                <div className="flex items-end justify-end gap-4 mt-6">
                                                    <button
                                                        className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-100"
                                                        onClick={() => setIsDialogOpen(false)}
                                                    >
                                                        Close
                                                    </button>
                                                  

                                                    <button
                                                        className={`px-4 py-2 rounded-lg font-semibold text-white ${isOtpComplete ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-300 cursor-not-allowed"
                                                            }`}
                                                        disabled={!isOtpComplete}
                                                        onClick={handleToggle2FA}
                                                    >
                                                        Verify & Validate
                                                    </button>



                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                {/* <p className="text-red-500">Off</p> */}
                                <p className={`flex items-center font-semibold ${is2FAEnabled ? "text-green-500" : "text-red-500"}`}>
                                    <span className={`w-2 h-2 mr-2 rounded-full ${is2FAEnabled ? "bg-green-500" : "bg-red-500"}`}></span>
                                    {is2FAEnabled ? "On" : "Off"}
                                </p>

                                <h6>Enhance your account security with Two-Factor Authentication by entering an OTP during login to confirm your identity.</h6>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>








                <ChangePassword/>






                {/*My Sessions*/}
                <section className='mx-auto max-w-[1550px] border rounded-2xl py-8 px-5'>
                    <div className='flex justify-between items-center gap-4'>
                        <div>
                            <p className='text-[16px] md:text-[18px] font-semibold'>My Sessions</p>
                        </div>
                        <div>
                            <button className='bg-red-500 text-xs md:text-sm sm:whitespace-nowrap px-4 py-3 rounded-xl w-auto text-white font-semibold'>
                                End all Sessions
                            </button>
                        </div>
                    </div>
                </section>

            </main>


            <footer>
                <Mainpagefooter />
            </footer>


        </div>
    )
}

export default Security;    