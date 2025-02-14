import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
        } else if (!validateEmail(email)) {
            setError("Invalid email format");
        } else {
            setError("");
            console.log("Email verified:", email);

        }
    };
    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 mx-auto max-w-2xl">
                <Header />

                <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
                    <div className="mt-4 space-y-8">
                        <div className="flex items-center space-x-2 relative">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium">
                                1
                            </span>
                            <span className="text-gray-900 font-medium">Email Verification</span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        <div className="flex items-center space-x-2 relative">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white text-sm font-medium">
                                2
                            </span>
                            <span className="text-gray-500">Setup Password</span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

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

            {/* Right Section */}
            <section className="flex flex-col h-screen justify-between items-start md:items-center flex-[1_1_71%] bg-white p-6">
                <div className="hidden lg:flex"></div>

                <div className="max-w-md w-full space-y-10">
                    <header className="flex justify-start items-start lg:hidden">
                        <img src="/images/image 314.svg" alt="" className="object-cover h-10" />
                    </header>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold text-gray-900">Register</h2>
                        <p className="text-gray-600">
                            <span>Already have an account?</span>{" "}
                            <a href="#" className="text-indigo-600 font-medium">
                                Log in
                            </a>
                        </p>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>

                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-4 border ${error ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-blue-500"
                                    }`}
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        <button className="mt-4 w-full bg-indigo-500 text-white py-4 rounded-xl font-medium hover:bg-indigo-700">
                            Verify Email
                        </button>
                    </form>
                </div>

                <Footer />
            </section>
        </div>
    );
}

export default Register;
