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

    useEffect(() => {
        const savedEmail = localStorage.getItem("registrationEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);
    return (
        <div className="flex h-screen ">

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
                            <span className={ "text-gray-900 font-medium"}>
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


            <section className="flex flex-col h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white py-8">
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

                    <form className="space-y-6">
                        {/* Email  */}
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
                                label="First name"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>

                            <TextField
                                label="Last name"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>

                            <TextField
                                label="Country"
                                type="text"
                                value="India"
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500"
                            />
                        </div>

                        <div>

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
                                    className="flex-1 px-4 py-2 border-y border-r rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                        </div>

                        <div>

                            <div className="relative">
                                <select className="w-full px-4 py-4 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Where did you learn about us?</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        <div className="flex justify-between p-6 rounded-xl border gap-4 mt-8">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="organization"
                                    name="accountType"
                                    className="w-5 h-5 text-blue-600"
                                />
                                <label htmlFor="organization" className="text-sm">
                                    ORGANIZATION
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    id="freelancer"
                                    name="accountType"
                                    className="w-5 h-5 text-blue-600"
                                />
                                <label htmlFor="freelancer" className="text-sm">
                                    FREELANCER
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-between gap-4 pt-4">
                            <button
                                type="button"
                                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center"
                            >
                                <FaArrowLeft className="mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
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