import Footer from "./Footer";
import Header from "./Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetupPassword() {
    const otpVerified = true;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox
    const [termsError, setTermsError] = useState(""); // State to track terms error


    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem("registrationEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (password) => {
        // Ensure password has at least one lowercase letter
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword();
        if (!isChecked) {
            setTermsError("You must accept the Terms and Conditions.");
            return;
        }
        if (isPasswordValid && isConfirmPasswordValid) {
            navigate("/complete-profile");
            console.log("Form submitted");
        }
    };

    return (
        <div className="flex h-screen ">
            {/* Left Section */}
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

            {/* Right Section */}
            <section className="flex flex-col h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white p-6">
                <div className="hidden lg:flex"></div>
                <div className="flex flex-col justify-between">
                    <header className="flex justify-start lg:hidden mb-20">
                        <img src="/images/image 314.svg" alt="" className="object-cover h-10" />
                    </header>

                    <div className="flex flex-col gap-2 px-5">
                        <div className="flex justify-start items-start text-start">
                            <h2 className="text-2xl font-bold text-start">Setup Password</h2>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-5 mb-5 w-auto lg:w-[500px] px-5">
                        <form className="space-y-6" onSubmit={handleSubmit}>
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

                            {/* Password Field */}
                            <div>
                                <div className="relative">
                                    <TextField
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!passwordError}
                                        helperText={passwordError}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password  */}
                            <div>
                                <div className="relative">
                                    <TextField
                                        label="Password (Confirm)"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)} 
                                />
                                <label htmlFor="terms" className="ml-2">
                                    I have read the <span className="text-indigo-600">Terms and Conditions</span>
                                </label>
                            </div>
                            {termsError && <p className="text-red-500 text-sm">{termsError}</p>}

                            {/* Submit  */}
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 font-semibold text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>

                <Footer />
            </section>
        </div>
    );
}
