import { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { changePassword } from "../APIconfig/PutApiconfig";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ is2FAEnabled, onLogout }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [logoutAll, setLogoutAll] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleOtpChange = (index, value) => {
    if (/\D/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    } else if (/\d/.test(e.key)) {
      if (index < otp.length - 1) {
        setTimeout(() => document.getElementById(`otp-${index + 1}`).focus(), 50);
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please enter both old and new passwords.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    try {
      let formattedOtp = "";

      // Only require OTP if 2FA is enabled
      if (is2FAEnabled) {
        if (!otpRequired) {
          const response = await changePassword({
            oldPassword,
            newPassword,
            otp: 0,
            killSession: logoutAll,
            is2FAEnabled,
          });

          if (response.success) {
            setOtpRequired(true);
            toast.success("OTP sent! Please enter the OTP.");
          } else {
            toast.error(response.message);
          }
          return;
        }

        if (!otp || otp.some((digit) => digit === "")) {
          toast.error("Please enter a valid 6-digit OTP.");
          return;
        }

        formattedOtp = parseInt(otp.join(""), 10);

        if (isNaN(formattedOtp) || formattedOtp < 100000 || formattedOtp > 999999) {
          toast.error("Invalid OTP. Please enter a 6-digit numeric OTP.");
          return;
        }
      }

      const result = await changePassword({
        oldPassword,
        newPassword,
        otp: is2FAEnabled ? formattedOtp : undefined,
        killSession: logoutAll,
        is2FAEnabled,
      });

      if (result.success) {
        toast.success("Password updated successfully!");
        
 
        // localStorage.clear();
        // toast.success("You have been logged out.");
        
  
        // if (onLogout) {
        //   onLogout();
        // } else {
        //   setTimeout(() => navigate("/"), 2000);
        // }

        setOtpRequired(false);
        setOtp(Array(6).fill(""));
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  useEffect(() => {
    let interval;
    if (otpRequired && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpRequired, resendTimer]);
  
  const handleResendOtp = async () => {
    try {
      const response = await changePassword({
        oldPassword,
        newPassword,
        otp: 0, 
        killSession: logoutAll,
        is2FAEnabled,
      });
  
      if (response.success) {
        toast.success("OTP resent successfully!");
        setOtp(Array(6).fill("")); 
        setResendTimer(60); 
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="border-[1px] rounded-2xl px-2 py-4">
      <Accordion sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content">
          <h1 className="text-[16px] md:text-[18px] font-semibold">Change Password</h1>
        </AccordionSummary>
        <AccordionDetails>
          <div className="mt-10 flex flex-col justify-center max-w-[700px] mx-auto space-y-4 z-[500px]">
            <TextField
              fullWidth
              label="Old Password"
              type={showPassword.old ? "text" : "password"}
              variant="filled"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleTogglePassword("old")}>
                      {showPassword.old ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              type={showPassword.new ? "text" : "password"}
              variant="filled"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleTogglePassword("new")}>
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword.confirm ? "text" : "password"}
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleTogglePassword("confirm")}>
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

{is2FAEnabled && otpRequired && (
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} py={4}>
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", fontSize: "20px", fontWeight: "bold" },
                      }}
                      variant="outlined"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      sx={{
                        width: "45px",
                        height: "45px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          fontSize: "18px",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      }}
                    />
                  ))}
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                  <Typography variant="body2" color="textSecondary">
                    Didn't receive the OTP? {resendTimer > 0 && `Resend in ${resendTimer}s`}
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary" 
                    onClick={handleResendOtp} 
                    disabled={resendTimer > 0}
                  >
                    Resend OTP
                  </Button>
                </Box>
              </>
            )}

            <FormControlLabel
              control={<Checkbox checked={logoutAll} onChange={() => setLogoutAll(!logoutAll)} />}
              label="Logout from all devices"
            />

<div className="flex justify-center mt-4">
  <button  
    className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg font-semibold text-white" 
    onClick={handleUpdatePassword}
  >
    Update Password
  </button>
</div>

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ChangePassword;
