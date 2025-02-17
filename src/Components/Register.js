import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SendotpAPI } from "../APIconfig/getAPIconfig";

import { toast } from "react-hot-toast";
import Footer from './Footer';
import Header from "./Header";

function Register() {
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "","",""]);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [email, setEmailState] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        console.log("otpSent state after setting:", otpSent);
    }, [otpSent]);


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
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleOtpSubmit = () => {
        if (otp.includes("")) {
            toast.error("Please enter the complete OTP!", { position: "top-right" });
            return;
        }

        toast.loading("Verifying OTP...", { id: "verifyLoading" });


        setTimeout(() => {
            toast.dismiss("verifyLoading");
            toast.success("OTP verified successfully!", { position: "top-right" });

            setOtpVerified(true);
            navigate("/setup-password");
        }, 1000);
    };



    return (
        <div className="flex h-screen">

            {/* left section */}
            <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 mx-auto max-w-2xl">
                <Header />
                <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
                    <div className="mt-4 space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-2 relative">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full 
        ${otpVerified ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"} text-sm font-medium`}>
                                {otpVerified ? "✔" : "1"}
                            </span>
                            <span className={`${otpVerified ? "text-indigo-600 font-semibold" : "text-gray-900 font-medium"}`}>
                                Email Verification
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>


                        {/* Step 2*/}
                        <div className="flex items-center space-x-2 relative">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full 
            ${otpVerified ? "bg-indigo-600" : "bg-gray-400"} text-white text-sm font-medium`}>
                                2
                            </span>
                            <span className={`${otpVerified ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                Setup Password
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        {/* Step 3*/}
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white text-sm font-medium">
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



            {/* right section */}
            <section className="flex flex-col h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white p-6">
                <div className="hidden lg:flex"></div>
                <div className="flex flex-col justify-between">
                    <header className="flex justify-start lg:hidden mb-20">
                        <img src="/images/image 314.svg" alt="" className="object-cover h-10" />
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
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmailState(e.target.value)}
                                disabled={otpSent}
                            />
                            {otpSent && (
                                <div className="flex justify-between mb-4">
                                    {otp.map((digit, index) => (
                                        <TextField
                                            key={index}
                                            type="text"
                                            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                                            variant="outlined"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="w-12"
                                            disabled={false}
                                        />
                                    ))}
                                </div>
                            )}

                            <button
                                className="mt-4 w-full bg-indigo-500 text-white py-4 rounded-xl font-medium hover:bg-indigo-700 transition"
                                disabled={loader}
                                onClick={otpSent ? handleOtpSubmit : handleEmailVerification}
                            >
                                {loader ? "Verifying..." : otpSent ? "Verify OTP" : "Verify Email"}
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
