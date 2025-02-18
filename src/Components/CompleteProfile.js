import React from 'react';
import Header from './Header';
import { ChevronDown } from 'lucide-react';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function CompleteProfile() {
    const otpVerified = true;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [learnedFrom, setLearnedFrom] = useState("");
    // const [accountType, setAccountType] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [accountType, setAccountType] = useState("organization");

    useEffect(() => {
        const savedEmail = localStorage.getItem("registrationEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
        const isValid = firstName && lastName && mobileNumber && learnedFrom && accountType;
        setIsFormValid(isValid);
    }, [firstName, lastName, mobileNumber, learnedFrom, accountType]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form submitted!");
        }
    };
    return (
        <div className="flex relative  h-screen ">

            {/* left section */}
            <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 max-w-2xl sticky top-0 h-screen overflow-y-auto bg-white">
                {/* <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 mx-auto max-w-2xl "> */}

                <Header />

                <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
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
                            <span className={`${otpVerified ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                Email Verification
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>


                        {/* Step 2*/}
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
                                    "2"
                                )}
                            </span>
                            <span className={"text-gray-900 font-medium"}>
                                Setup Password
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        {/* Step 3*/}
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium">
                                3
                            </span>
                            <span className="text-gray-900 font-medium">Complete your Profile</span>
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


            <section className="flex flex-1 pt-6 px-6 overflow-y-auto flex-col space-y-4 h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white py-8">
                <div className="w-auto lg:w-[550px]">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold mb-2">Complete Your Registration</h1>
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-indigo-500 font-semibold hover:text-blue-700">
                                Log in
                            </a>
                        </p>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit}>

                        <div>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                disabled
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </div>


                        <div>
                            <TextField
                                label="First Name"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                            />
                        </div>


                        <div>
                            <TextField
                                label="Last Name"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                            />
                        </div>

                        <div className="flex gap-4">
                            <TextField
                                type="text"
                                value="+91"
                                disabled
                                className="w-16 px-4 py-2 border rounded-l-lg bg-gray-50 text-gray-500"
                            />
                            <TextField
                                type="tel"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="flex-1 px-4 py-2 border-y border-r rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>


                        <div className="relative flex justify-between">
                            <select
                                value={learnedFrom}
                                onChange={(e) => setLearnedFrom(e.target.value)}
                                className="w-full px-4 py-4 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Where did you learn about us?</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="4">Option 4</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>


                    
                        <div className="flex justify-between rounded-xl border gap-4 mt-8">
                            <button className="flex items-center p-6 gap-3">
                                <input
                                    type="radio"
                                    id="organization"
                                    name="accountType"
                                    className="w-5 h-5 text-blue-600"
                                    checked={accountType === "organization"}
                                    onChange={() => setAccountType("organization")}
                                />
                                <label htmlFor="organization" className="text-sm">
                                    ORGANIZATION
                                </label>
                            </button>
                            <div className="border-r"></div>
                            <button className="flex items-center gap-3 p-6">
                                <input
                                    type="radio"
                                    id="freelancer"
                                    name="accountType"
                                    className="w-5 h-5 text-blue-600"
                                    checked={accountType === "freelancer"}
                                    onChange={() => setAccountType("freelancer")}
                                />
                                <label htmlFor="freelancer" className="text-sm">
                                    FREELANCER
                                </label>
                            </button>
                        </div>

                     
                        {accountType === "organization" && (
                            <div className="mt-6">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full border p-3 rounded-lg mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Company Domain"
                                    className="w-full border p-3 rounded-lg mb-3"
                                />
                                <select className="w-full border p-3 rounded-lg">
                                    <option value="">Team Size</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-200">51-200</option>
                                    <option value="201+">201+</option>
                                </select>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm py-4 h-20 flex justify-between gap-4">
                            <button
                                type="button"
                                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center"
                            >
                                <FaArrowLeft className="mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-6 py-2 rounded-lg flex items-center ${!isFormValid
                                        ? 'bg-gray-400 cursor-not-allowed text-gray-300'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                disabled={!isFormValid}
                            >
                                Submit
                                <FaArrowRight className="ml-2" />
                            </button>
                        </div>

                    </form>
                </div>


                <Footer />
            </section>
        </div>
    )
}

export default CompleteProfile