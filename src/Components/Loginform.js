import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-start items-start lg:items-center lg:justify-center bg-white pt-10 px-5">
        <header className=' flex justify-start items-start lg:hidden'>
        <img src='/images/image 314.svg' alt='' className='object-cover h-10'></img>
       </header>
      <div className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-3xl font-semibold text-start mb-4">Log in</h2>
        <p className="text-start text-[18px] text-gray-600">
          Don't have an account? <button  className="text-indigo-500"  onClick={() => navigate("/register")}>Register</button>
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'indigo-400' },
                '&.Mui-focused fieldset': { borderColor: 'indigo-700', borderWidth: '3px' }
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'indigo-400' },
                '&.Mui-focused fieldset': { borderColor: 'indigo-700', borderWidth: '3px' }
              }
            }}
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 font-semibold hover:bg-indigo-700 text-white py-4 rounded-xl transition duration-200"
          >
            Log in
          </button>
        </form>

        <div className="text-start mt-3">
          <a href="" className="text-indigo-500 font-semibold text-[16px]">Forgot password?</a>
        </div>


<div className="text-center pt-5 space-y-2">
        <p className="text-gray-500 font-medium pb-2">
        Version 6.4.6
        </p>
        <a className="text-indigo-500 font-medium">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
