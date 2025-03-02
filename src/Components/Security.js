import React from 'react'
import Navbar from './Navbar';
import Mainpagefooter from './Mainpagefooter';
import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Accordion, AccordionSummary, AccordionDetails, TextField, Checkbox, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "@mui/icons-material";
import { requestOtpFor2FA } from '../APIconfig/getAPIconfig';
import toast, { Toaster } from "react-hot-toast";






function Security() {

    const [expanded, setExpanded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [focused, setFocused] = useState(false);
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
        const isValid = await requestOtpFor2FA(userPassword);
        setLoading(false);

        if (isValid) {
            setOtpVisible(true);
            inputRefs.current[0]?.focus();
        }
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
        setResendTimer(10);
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

                        <AccordionDetails className="space-y-4 pt-5 border-t">

                            <div>
                                <button
                                    className="bg-customGreen text-white text-sm font-semibold rounded-lg px-5 py-3 mt-5"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Turn On
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

                                                    <div className="flex justify-between gap-3 mt-3">
                                                        {otp.map((digit, index) => (
                                                            <input
                                                                key={index}
                                                                ref={(el) => (inputRefs.current[index] = el)}
                                                                type="text"
                                                                value={digit}
                                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                                maxLength="1"
                                                                className="w-20 h-14 border text-center text-lg font-bold outline-none rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                            />
                                                        ))}
                                                    </div>


                                                    <div className="flex justify-between mt-3">
                                                        <p>
                                                            Didn't receive OTP? {isResendDisabled && <span className="text-gray-500">({resendTimer}s)</span>}
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
                                <p className="text-red-500">Off</p>
                                <h6>Enhance your account security with Two-Factor Authentication by entering an OTP during login to confirm your identity.</h6>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>







                {/* Change password */}
                <section className="mx-auto max-w-[1550px] border rounded-2xl mb-10">
                    <Accordion
                        expanded={expanded}
                        onChange={() => setExpanded(!expanded)}
                        sx={{

                            backgroundColor: "transparent",
                            boxShadow: "none",
                            overflow: "hidden",
                            paddingTop: "20px",
                            paddingBottom: "20px"
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="py-8 px-5">
                            <p className="text-[16px] md:text-[18px] font-semibold">Change Password</p>
                        </AccordionSummary>
                        <AccordionDetails className="border-t px-4">
                            <div className="space-y-6 mt-6 mx-auto max-w-xl">

                                {/* Old Password */}
                                <div className="relative">
                                    <TextField
                                        label="Old Password"
                                        variant="filled"
                                        fullWidth
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
                                </div>

                                {/* New Password */}
                                <div className="relative">
                                    <TextField
                                        label="New Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant="filled"
                                        fullWidth
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
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {/* Confirm New Password */}
                                <div className="relative">
                                    <TextField
                                        label="Confirm New Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        variant="filled"
                                        fullWidth
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
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>


                                <div className="flex items-center">
                                    <Checkbox color="primary" />
                                    <label className="ml-2">Logout from all devices</label>
                                </div>


                                <div className="lg:ml-40 pb-8">
                                    <button className="bg-indigo-500 px-4 py-2 rounded-xl text-white font-semibold">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </section>








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