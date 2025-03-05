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
import { fetchSessions } from '../APIconfig/getAPIconfig';
import { handleConfirmDelete } from '../APIconfig/DeleteApiConfig';
import { endAllSessions } from '../APIconfig/DeleteApiConfig';
import { DataGrid } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";



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


    const [sessions, setSessions] = useState([]);
    const authToken = localStorage.getItem("at");
    const [selectedSession, setSelectedSession] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEndAllSessionsModalOpen, setIsEndAllSessionsModalOpen] = useState(false);

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
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);
    useEffect(() => {
        if (isEndAllSessionsModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isEndAllSessionsModalOpen]);


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



    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             setIsDialogOpen(false);
    //         }
    //     };
    //     if (isDialogOpen) {
    //         document.addEventListener("mousedown", handleClickOutside);
    //     }
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [isModalOpen]);



    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             setIsDialogOpen(false);
    //         }
    //     };
    //     if (isDialogOpen) {
    //         document.addEventListener("mousedown", handleClickOutside);
    //     }
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [isEndAllSessionsModalOpen]);



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




    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };




    useEffect(() => {
        getSessions();
    }, []);


    const getSessions = async () => {
        try {
            const data = await fetchSessions(authToken);
            setSessions(data);
        } catch (error) {
            toast.error("Failed to load sessions.");
        }
    };




    const handleDeleteClick = (session) => {
        if (session.current) {
            toast.error("You cannot delete the active session.");
            return;
        }
        setSelectedSession(session);
        setIsModalOpen(true);
    };

    const confirmSessionDeletion = async () => {
        if (!selectedSession) {
            toast.error("No session selected for deletion");
            return;
        }

        try {
            const result = await handleConfirmDelete(selectedSession);

            if (result.success) {

                setSessions(prevSessions =>
                    prevSessions.filter(session => session.id !== selectedSession.id)
                );

                toast.success(result.message);
                setIsModalOpen(false);
                setSelectedSession(null);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Session deletion error:", error);
            toast.error("An unexpected error occurred");
        }
    };



    const handleEndAllSessions = async () => {
        try {
            const result = await endAllSessions();

            if (result.success) {

                setSessions([]);
                toast.success(result.message);
                handleLogout();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("End all sessions error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsEndAllSessionsModalOpen(false);
        }
    };

    const columns = [
        {
            field: 'browser',
            headerName: 'Device Name',
            resizable: false,
            flex: 1,
            minWidth: 150,
            sortable: true
        },
        {
            field: 'location',
            headerName: 'Location',
            resizable: false,
            flex: 1,
            minWidth: 150,
            sortable: true
        },
        {
            field: 'lastUsed',
            headerName: 'Last Used',
            flex: 1,
            minWidth: 250,
            sortable: true,
            resizable: false,
            renderCell: (params) => {
                const session = params.row;
                return (
                    <>
                        {new Date(session.lastUsed).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        ,{" "}
                        {new Date(session.lastUsed).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            minWidth: 100,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const session = params.row;
                return (
                    <button
                        className={`text-gray-500 ${session.current ? "cursor-not-allowed opacity-50" : "hover:text-red-500"}`}
                        onClick={() => handleDeleteClick(session)}
                        disabled={session.current}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill={session.current ? "gray" : "red"}
                                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                        </svg>
                    </button>
                );
            }
        }
    ];

    return (

        <>
            <div className='h-screen flex flex-col justify-between'>

                <header className='top-0 left-0 sticky bg-white z-10'>
                    <Navbar />
                </header>



                <main className='h-auto px-2 lg:px-16 py-5 space-y-10'>



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








                    {/* <ChangePassword/> */}
                    {/* <ChangePassword is2FAEnabled={true} /> */}

                    <ChangePassword is2FAEnabled={is2FAEnabled} onLogout={handleLogout} />


                    <section className="mx-auto max-w-[1550px] border rounded-2xl py-8 ">
                        {/* Header */}
                        <div className="flex justify-between items-center gap-4 mb-4 px-4">
                            <p className="text-[16px] md:text-[18px] font-semibold ">My Sessions</p>
                            <button
                                className="bg-red-500   py-2 px-4 rounded-xl text-white font-semibold"
                                onClick={() => setIsEndAllSessionsModalOpen(true)}
                            >
                                End all sessions
                            </button>
                        </div>


                        {/* <div className="w-full">
                            <table className="w-full ">
                           
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 text-left">
                                        <th className="py-3 px-5 text-sm">Device Name</th>
                                        <th className="py-3 px-5 text-sm">Location</th>
                                        <th className="py-3 px-5 text-sm">Last Used</th>
                                        <th className="py-3 px-5 text-sm text-center">Actions</th>
                                    </tr>
                                </thead>

                            
                                <tbody>
                                    {sessions.length > 0 ? (
                                        sessions.map((session) => (
                                            <tr key={session.id} className="border-t">
                                                <td className="py-4 px-5 text-sm">{session.browser}</td>
                                                <td className="py-4 px-5 text-sm">{session.location}</td>
                                                <td className="py-4 px-5 text-sm">
                                                    {new Date(session.lastUsed).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                    ,{" "}
                                                    {new Date(session.lastUsed).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </td>
                                                <td className="py-4 px-4 text-sm text-center">
                                                    <button
                                                        className={`text-gray-500 ${session.current ? "cursor-not-allowed opacity-50" : "hover:text-red-500"
                                                            }`}
                                                        onClick={() => handleDeleteClick(session)}
                                                        disabled={session.current}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                fill={session.current ? "gray" : "red"}
                                                                d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-gray-500">
                                                No active sessions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>




                            </table>
                        </div> */}



                        <div className="w-full" >
                            <DataGrid
                                rows={sessions}
                                columns={columns}
                                hideFooter
                                disableSelectionOnClick
                                disableColumnMenu
                                experimentalFeatures={{ newEditingApi: true }}
                                localeText={{
                                    noRowsLabel: 'No active sessions found.'
                                }}
                                sx={{
                                    '& .MuiDataGrid-columnHeaders': {

                                        color: '#4b5563',



                                    },
                                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                                        outline: 'none',

                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        display: 'none'
                                    },
                                    '& .MuiDataGrid-root': {
                                        border: 'none'
                                    },
                                    '& .MuiDataGrid-cell': {
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderBottom: '1px solid #e5e7eb',


                                    }
                                }}
                            />
                        </div>
                    </section>


                </main>


                <footer>
                    <Mainpagefooter />
                </footer>

            </div>

            {isEndAllSessionsModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white rounded-xl py-6 space-y-6 shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold border-b px-6">Confirmation!</h2>
                        <p className="mt-2  text-gray-600 px-6 font-semibold text-[18px]">
                            Are you sure you want to end all active sessions? This will log you out from all devices.
                        </p>
                        <div className="mt-4 flex justify-end space-x-2 px-6 font-semibold">
                            <button
                                className="px-4 py-2  hover:bg-gray-200 rounded-lg font-semibold"
                                onClick={() => setIsEndAllSessionsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold"
                                onClick={handleEndAllSessions}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}




            {isModalOpen && selectedSession && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold">Confirmation!</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Would you like to delete this session?
                        </p>
                        <p className="mt-1 text-xs text-gray-500 break-all">
                            {selectedSession.session}
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 text-gray-600 border rounded-lg"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                onClick={confirmSessionDeletion}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Security;    