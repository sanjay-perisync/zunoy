import { useState } from "react";
import axios from "axios";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "../APIconfig/PostApiconfig";


const BASE_URL = "https://znginx.perisync.work/api/v1/acc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate("/mainpage");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!email) newErrors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
  //   if (!password) newErrors.password = "Password is required";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   setErrors({});

  //   const payload = {
  //     email: email.trim(),
  //     password: password.trim(),
  //     otp: 0,
  //     killSession: false,
  //     deviceInfo: {
  //       platform: "web",
  //       os: "Windows 10",
  //       browser: "Edge",
  //       device: "133.0.0.0",
  //       deviceName: "Windows 10",
  //       ipAddress: "106.51.221.186"
  //     }
  //   };

  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: `${BASE_URL}/login`,
  //       data: payload,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     });

  //     if (response.status === 200) {
  //       toast.success("Login successful!");
  //       navigate("/mainpage");
  //     }
  //   } catch (error) {
  //     const errorData = error.response?.data;


  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen space-y-4 justify-start items-start lg:items-center lg:justify-center bg-white pt-10 px-5">
      <header className="flex justify-start items-start lg:hidden">
        <img src="/images/image 314.svg" alt="" className="object-cover h-10" />
      </header>
      <div className="w-full max-w-md p-6 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-semibold text-start mb-4">Log in</h2>
        <p className="text-start text-[18px] text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-indigo-500 hover:text-indigo-600 font-semibold"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <TextField
  fullWidth
  label="Email Address"
  variant="filled"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  }}
  error={!!errors.email}
  helperText={errors.email}
  sx={{
    "& .MuiInputBase-root": {
      border: "3px solid",
      borderColor: errors.email ? "red" : focused ? "#1976D2" : "#F8F8F8",
      borderRadius: "8px",
      backgroundColor: "white",
      transition: "border-color 0.3s ease",
    },
    "& .MuiInputBase-root:hover": {
      borderColor: errors.email ? "red" : focused ? "#1976D2" : "#BEBEBE",
      backgroundColor: "#F8F8F8",
    },
    "& .MuiInputBase-root.Mui-focused": {
      borderColor: errors.email ? "red" : "#1976D2",
      backgroundColor: "white",
    },
    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
      display: "none",
    },
  }}
/>

<TextField
  fullWidth
  label="Password"
  type={showPassword ? "text" : "password"}
  variant="filled"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  }}
  error={!!errors.password}
  helperText={errors.password}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </IconButton>
      </InputAdornment>
    )
  }}
  sx={{
    "& .MuiInputBase-root": {
      border: "3px solid",
      borderColor: errors.password ? "red" : focused ? "#1976D2" : "#F8F8F8",
      borderRadius: "8px",
      backgroundColor: "white",
      transition: "border-color 0.3s ease",
    },
    "& .MuiInputBase-root:hover": {
      borderColor: errors.password ? "red" : focused ? "#1976D2" : "#BEBEBE",
      backgroundColor: "#F8F8F8",
    },
    "& .MuiInputBase-root.Mui-focused": {
      borderColor: errors.password ? "red" : "#1976D2",
      backgroundColor: "white",
    },
    "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
      display: "none",
    },
  }}
/>



          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-4 rounded-xl transition duration-200 ${loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-700 text-white"
              } flex items-center justify-center`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Log in"}
          </button>
        </form>

        <div className="text-start mt-3">
          <Link to="/reset-password" className="text-indigo-500 font-semibold text-[16px] hover:text-indigo-600">
            Forgot password?
          </Link>
        </div>

        <div className="text-center pt-5 space-y-2">
          <p className="text-gray-500 font-medium pb-2">Version 6.4.6</p>

          <Link to="https://dev-website.zoop360.com/policies/terms&condition" className="text-indigo-500 font-semibold text-[16px] hover:text-indigo-600">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


