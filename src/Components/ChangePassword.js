import { useState } from "react";
import {TextField, Checkbox, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../APIconfig/PutApiconfig";
import toast from "react-hot-toast";
import { changePasswordMFA } from "../APIconfig/PutApiconfig";

const ChangePassword = ({ mfaEnabled }) => {
    const [expanded, setExpanded] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [killSession, setKillSession] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async () => {
        if (!oldPassword || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }
    
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
    
        if (mfaEnabled && (!otp || otp.length !== 6)) {
            toast.error("Enter a valid 6-digit OTP!");
            return;
        }
    
        const result = await changePasswordMFA({
            oldPassword,
            newPassword: password,
            otp: mfaEnabled ? otp : undefined,
            killSession,
        });
    
        if (result.success) {
            toast.success("Password updated successfully!");
            setOldPassword("");
            setPassword("");
            setConfirmPassword("");
            setOtp("");
            setKillSession(false);
        } else {
            toast.error(result.data?.msg || "Error updating password.");
        }
    };
    
    return (
        <section className="mx-auto max-w-[1550px] border rounded-2xl mb-10">
            <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    overflow: "hidden",
                    paddingTop: "20px",
                    paddingBottom: "20px",
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
                                type={oldPassword ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
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
                                type="button"
                                onClick={() => setOldPassword(!oldPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {oldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
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
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                      
                        {mfaEnabled && (
                            <TextField
                                label="OTP Code"
                                type="text"
                                value={otp}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/\D/g, "");
                                    if (newValue.length <= 6) setOtp(newValue);
                                }}
                                variant="filled"
                                fullWidth
                                inputProps={{
                                    maxLength: 6,
                                    pattern: "[0-9]*",
                                    inputMode: "numeric",
                                }}
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
                        )}

             
                        <div className="flex items-center">
                            <Checkbox
                                checked={killSession}
                                onChange={(e) => setKillSession(e.target.checked)}
                                color="primary"
                            />
                            <label className="ml-2">Logout from all devices</label>
                        </div>

                  
                        <div className="lg:ml-40 pb-8">
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-500 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </section>
    );
};

export default ChangePassword;
