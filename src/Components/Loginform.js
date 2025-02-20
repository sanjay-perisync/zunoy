import { useState } from "react";
import axios from "axios";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const BASE_URL = "https://znginx.perisync.work/api/v1/acc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

    const payload = {
      email: email.trim(),
      password: password.trim(),
      otp: 0,
      killSession: false,
      deviceInfo: {
        platform: "web",
        os: "Windows 10",
        browser: "Edge",
        device: "133.0.0.0",
        deviceName: "Windows 10",
        ipAddress: "106.51.221.186"
      }
    };

    try {
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}/login`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        navigate("/mainpage");
      }
    } catch (error) {
      const errorData = error.response?.data;
      
    
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen space-y-4 justify-start items-start lg:items-center lg:justify-center bg-white pt-10 px-5">
      <header className="flex justify-start items-start lg:hidden">
        <img src="/images/image 314.svg" alt="" className="object-cover h-10" />
      </header>
      <div className="w-full max-w-md p-6 space-y-6">
        <h2 className="text-3xl font-semibold text-start mb-4">Log in</h2>
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
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "indigo-400" },
                "&.Mui-focused fieldset": { borderColor: "indigo-700", borderWidth: "3px" }
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
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
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "indigo-400" },
                "&.Mui-focused fieldset": { borderColor: "indigo-700", borderWidth: "3px" }
              }
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-4 rounded-xl transition duration-200 ${
              loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="text-start mt-3">
        <Link to="/reset-password" className="text-indigo-500 font-semibold text-[16px] hover:text-indigo-600">
  Forgot password?
</Link>
        </div>

        <div className="text-center pt-5 space-y-2">
          <p className="text-gray-500 font-medium pb-2">Version 6.4.6</p>
          <a className="text-indigo-500 font-medium hover:text-indigo-600 cursor-pointer">
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;