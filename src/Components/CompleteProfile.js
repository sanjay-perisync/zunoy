import React from 'react';
import Header from './Header';
import { ChevronDown } from 'lucide-react';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { TextField, CircularProgress } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CreateRegister } from '../APIconfig/PostApiconfig';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

function CompleteProfile() {
    const otpVerified = true;
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [knowAboutOptions, setKnowAboutOptions] = useState([
        "Google",
        "Social Media",
        "Friends",
        "Other"
    ]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        country: "India",
        accountType: "organization",
        knowAboutUs: "",
        companyName: "",
        companyDomain: "",
        teamSize: ""
    });

    useEffect(() => {
        // Get email from localStorage
        const savedEmail = localStorage.getItem("registrationEmail");
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
        }

        // Fetch know about options
        const fetchKnowAboutOptions = async () => {
            try {
                const response = await fetch("https://api.zunoy.com/api/v1/acc/register");
                const data = await response.json();
                if (data?.knowAboutUsOptions) {
                    setKnowAboutOptions(data.knowAboutUsOptions);
                }
            } catch (error) {
                console.error("Error fetching KnowAboutUs options:", error);
            }
        };

        fetchKnowAboutOptions();
    }, []);

    useEffect(() => {
        const isValid =
            formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.phoneNo &&
            formData.knowAboutUs &&
            formData.accountType &&
            (formData.accountType === 'freelancer' ||
                (formData.companyName && formData.companyDomain && formData.teamSize));
        setIsFormValid(isValid);
    }, [formData]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        const phoneNoWithCode = formData.phoneNo.startsWith('+91')
            ? formData.phoneNo
            : `+91${formData.phoneNo}`;


        const apiPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            country: formData.country,
            phoneNo: phoneNoWithCode,
            accountType: "freelancer",
            knowAboutUs: formData.knowAboutUs
        };

        await CreateRegister(apiPayload, {
            setLoader: setLoading,
            onSuccess: (data) => {
                console.log("Registration Success:", data);
                setAccountCreated(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);

            },
            onError: (error) => {
                toast.error("Registration Error:", error);
            }
        });
    };



    return (
        <div className="flex relative h-screen">
            {/* Left section */}
            <section className="hidden lg:flex flex-col justify-between flex-[1_1_29%] border-r p-6 max-w-2xl sticky top-0 h-screen overflow-y-auto bg-white">
                <Header />

                <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
                    <div className="mt-4 space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-2 relative">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium">
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
                            </span>
                            <span className="text-gray-900 font-medium">
                                Email Verification
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center space-x-2 relative">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium">
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
                            </span>
                            <span className="text-gray-900 font-medium">
                                Setup Password
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        {/* Step 3 */}
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

            {/* Right section */}
            <section className="flex flex-1 pt-6 px-6 overflow-y-auto flex-col space-y-4 h-screen justify-between lg:items-center lg:flex-[1_1_71%] w-full bg-white py-8">
                <div className="w-auto lg:w-[550px]">
                    <header className="flex justify-start lg:hidden mb-20">
                        <img src="/images/image 314.svg" alt="Logo" className="object-cover h-10" />
                    </header>
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold mb-2">Complete Your Registration</h1>
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/" className="text-indigo-500 font-semibold text-[16px] pl-2 hover:text-indigo-600">
                                Login
                            </Link>
                        </p>
                    </div>


                    {accountCreated ? (
                        <div className="bg-green-50 p-6 rounded-lg shadow-lg flex flex-col justify-center h-[500px] items-center text-center w-full">
                            <div className="flex justify-center">
                                <img src="https://account.zunoy.com/assets/iconly/iconly-glass-tick.svg" alt="Success" className="w-16 h-16" />
                            </div>
                            <h2 className="text-lg font-semibold mt-4 text-green-700">Registration Completed Successfully</h2>
                            <p className="text-gray-600 mt-2">You will be redirected to Login page Please wait ...</p>
                        </div>
                    ) : (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                value={formData.email}
                                disabled
                                fullWidth
                                variant="filled"
                                sx={{
                                    "& .MuiInputBase-root": {
                                        border: "1px solid",
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

                            <TextField
                                name="firstName"
                                label="First Name"
                                type="text"
                                variant="filled"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
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
                                name="lastName"
                                label="Last Name"
                                type="text"
                                variant="filled"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
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

                            <div className="flex gap-4">
                                <TextField
                                    value="+91"
                                    disabled
                                    variant="filled"
                                    className="w-auto lg:w-16"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            border: "1px solid",
                                            borderColor: focused ? "#1976D2" : "#F8F8F8",
                                            borderRadius: "8px",
                                            backgroundColor: "#F8F8F8",
                                            transition: "border-color 0.3s ease",
                                            height: "62px",
                                        },
                                        "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                                            display: "none",
                                        },
                                        "& .MuiInputBase-input": {
                                            textAlign: "center",
                                            padding: "0px",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        },
                                    }}
                                />

                                <TextField
                                    name="phoneNo"
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    variant="filled"
                                    fullWidth
                                    required
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

                            <div className="relative">
                                <select
                                    name="knowAboutUs"
                                    value={formData.knowAboutUs}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-lg appearance-none"
                                    required
                                >
                                    <option value="">Where did you learn about us?</option>
                                    {knowAboutOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>

                            <div className="flex-col lg:flex-row flex flex-wrap justify-between rounded-xl border  w-auto">
                                <button
                                    type="button"
                                    className={`flex items-center  p-6 gap-3 ${formData.accountType === 'organization' ? '' : ''}`}
                                    onClick={() => handleChange({ target: { name: 'accountType', value: 'organization' } })}
                                >
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value="organization"
                                        checked={formData.accountType === "organization"}
                                        onChange={handleChange}
                                        className="w-5 h-5"
                                    />
                                    <label>ORGANIZATION</label>
                                </button>
                                <div className="border-b lg:border-r"></div>
                                <button
                                    type="button"
                                    className={`flex items-center p-6 gap-3 ${formData.accountType === 'freelancer' ? '' : ''}`}
                                    onClick={() => handleChange({ target: { name: 'accountType', value: 'freelancer' } })}
                                >
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value="freelancer"
                                        checked={formData.accountType === "freelancer"}
                                        onChange={handleChange}
                                        className="w-5 h-5"
                                    />
                                    <label>FREELANCER</label>
                                </button>
                            </div>

                            {formData.accountType === "organization" && (
                                <div className="space-y-4">
                                    <TextField
                                        name="companyName"
                                        label="Company Name"
                                        variant="filled"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
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
                                        name="companyDomain"
                                        label="Company Domain"
                                        variant="filled"
                                        value={formData.companyDomain}
                                        onChange={handleChange}
                                        fullWidth
                                        required
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
                                    <select
                                        name="teamSize"
                                        value={formData.teamSize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border rounded-lg"
                                        required
                                    >
                                        <option value="">Team Size</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201+">201+</option>
                                    </select>
                                </div>
                            )}

                            <div className="sticky bottom-0 left-0 z-10 w-full bg-white/80 backdrop-blur-sm py-4 h-20 flex justify-between gap-4">
                                <button
                                    type="button"
                                    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-2 rounded-lg flex items-center justify-center ${!isFormValid ? "bg-gray-400 cursor-not-allowed text-gray-300" : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    disabled={!isFormValid || loading}
                                >
                                    {loading ? <CircularProgress size={20} className="text-white" /> : "Submit"}
                                    {!loading && <FaArrowRight className="ml-2" />}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <Footer />
            </section>
        </div>
    );
}

export default CompleteProfile;