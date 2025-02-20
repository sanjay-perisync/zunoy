import Footer from "./Footer";
import Header from "./Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../APIconfig/PostApiconfig";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function SetupPassword() {
    const otpVerified = true;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [termsError, setTermsError] = useState("");
    const [loading, setLoading] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [focused, setFocused] = useState(false);


    const navigate = useNavigate();



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return false;
        }
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;

        if (!lowercaseRegex.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }
        if (!uppercaseRegex.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return false;
        }
        if (!numberRegex.test(password)) {
            setPasswordError("Password must contain at least one number.");
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isPasswordValid = validatePassword(password);
    //     const isConfirmPasswordValid = validateConfirmPassword();
    //     if (!isChecked) {
    //         setTermsError("You must accept the Terms and Conditions.");
    //         return;
    //     }
    //     if (isPasswordValid && isConfirmPasswordValid) {
    //         navigate("/complete-profile");
    //         console.log("Form submitted");
    //     }
    // };

    // useEffect(() => {
    //     const storedEmail = localStorage.getItem("registrationEmail") || "";
    //     const storedIdentifier = localStorage.getItem("identifier") || ""; // ✅ Ensure key matches storage

    //     console.log("📌 Loaded from LocalStorage:", { storedEmail, storedIdentifier });

    //     setEmail(storedEmail);
    //     setIdentifier(storedIdentifier);
    // }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log("🚀 Submitting form with identifier:", identifier); // ✅ Debugging log

    //     if (!identifier) {  
    //         console.error("❌ Identifier is missing before API call!");
    //         alert("Something went wrong. Please try again.");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         await createUser(
    //             {
    //                 email,
    //                 identifier,  // ✅ Ensuring identifier is passed correctly
    //                 password,
    //                 policy: true,
    //                 termsandcondition: true,
    //                 userIP: "157.45.210.228",
    //             },
    //             {
    //                 setLoader: setLoading,
    //                 onSuccess: () => {
    //                     localStorage.setItem("userEmail", email);
    //                     console.log("✅ User created successfully. Navigating...");
    //                     navigate("/complete-profile");
    //                 },
    //                 onError: (error) => {
    //                     console.error("❌ API Error:", error);
    //                     alert(error?.response?.data?.message || "Something went wrong. Please try again.");
    //                 },
    //             }
    //         );
    //     } catch (error) {
    //         console.error("API Call Failed:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        const storedEmail = localStorage.getItem("registrationEmail") || "";
        const storedIdentifier = localStorage.getItem("identifier") || "";

        console.log(" Loaded from LocalStorage:", { storedEmail, storedIdentifier });

        setEmail(storedEmail);
        setIdentifier(storedIdentifier);
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier) {
            toast.error("Something went wrong. Please try again.");
            return;
        }

        if (!validatePassword(password) || !validateConfirmPassword()) {
            return;
        }

        if (!isChecked) {
            setTermsError("You must agree to the Terms and Conditions.");
            return;
        } else {
            setTermsError("");
        }

        setLoading(true);
        try {
            await createUser(
                {
                    email,
                    identifier,
                    password,
                    policy: true,
                    termsandcondition: true,
                    userIP: "106.51.221.186",
                },
                {
                    setLoader: setLoading,
                    onSuccess: () => {
                        localStorage.setItem("userEmail", email);
                        setAccountCreated(true);


                        setTimeout(() => {
                            navigate("/complete-profile");
                        }, 3000);
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || "Something went wrong.");
                    },
                }
            );
        } catch (error) {
            toast.error("API Call Failed. Try again.");
        } finally {
            setLoading(false);
        }
    };



    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log("Submitting form with identifier:", identifier);

    //     if (!identifier) {
    //         console.error("Identifier is missing before API call!");
    //         toast.error("Something went wrong. Please try again.");
    //         return;
    //     }


    //     if (!validatePassword(password)) {
    //         return;
    //     }


    //     if (!validateConfirmPassword()) {
    //         return;
    //     }


    //     if (!isChecked) {
    //         setTermsError("You must agree to the Terms and Conditions.");
    //         return;
    //     } else {
    //         setTermsError("");
    //     }

    //     setLoading(true);
    //     try {
    //         await createUser(
    //             {
    //                 email,
    //                 identifier,
    //                 password,
    //                 policy: true,
    //                 termsandcondition: true,
    //                 userIP: "106.51.221.186",
    //             },
    //             {
    //                 setLoader: setLoading,
    //                 onSuccess: () => {
    //                     localStorage.setItem("userEmail", email);
    //                     console.log("User created successfully. Navigating...");
    //                     navigate("/complete-profile");
    //                 },
    //                 onError: (error) => {
    //                     console.error("API Error:", error);
    //                     alert(error?.response?.data?.message || "Something went wrong. Please try again.");
    //                 },
    //             }
    //         );
    //     } catch (error) {
    //         console.error("API Call Failed:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };




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

                    <div className="flex flex-col justify-center  gap-6 mt-5 mb-5 w-auto lg:w-[500px] px-5">
                        {accountCreated ? (
                            <div className="bg-green-50 p-6 rounded-lg shadow-lg flex flex-col justify-center h-[500px] items-center text-center w-full">
                                <div className="flex justify-center">
                                    <img src="https://account.zunoy.com/assets/iconly/iconly-glass-tick.svg" alt="Success" className="w-16 h-16" />
                                </div>
                                <h2 className="text-lg font-semibold mt-4 text-green-700">Account Created Successfully</h2>
                                <p className="text-gray-600 mt-2">Please wait ...</p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Email  */}
                                <div>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={email}
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="filled"
                                        fullWidth
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                border: "3px solid",
                                                borderColor: focused ? "#1976D2" : "#F8F8F8",
                                                borderRadius: "8px",
                                                backgroundColor: "#F8F8F8",
                                                transition: "border-color 0.3s ease",
                                            },
                                            "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                                                display: "none",
                                            },
                                        }}
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
                                            variant="filled"
                                            fullWidth
                                            error={!!passwordError}
                                            helperText={passwordError}
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
                                            variant="filled"
                                            fullWidth
                                            error={!!confirmPasswordError}
                                            helperText={confirmPasswordError}
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
                                {/* <button
                                type="submit"
                                className="w-full bg-indigo-500 font-semibold text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Create Account
                            </button> */}
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-500 font-semibold text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex justify-center items-center"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <Footer />
            </section>
        </div>
    );
}
