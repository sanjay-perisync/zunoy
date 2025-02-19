import { toast } from "react-hot-toast";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

const api = axios.create({
  baseURL: AccountsRootUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (data, { setLoader, onSuccess, onError }) => {
  try {
    setLoader(true);
    console.log(" Sending API Request with Data:", data);

    if (!data.identifier || !data.email || !data.password) {
      console.error(" Missing required fields!");
      toast.error("Please fill in all required fields.");
      setLoader(false);
      return;
    }

    const payload = {
      email: data.email,  
      identifier: data.identifier,
      password: data.password,
      policy: true,
      termsandcondition: true,
      userIP: "106.51.221.186", 
    };

    const response = await api.post("/createUser", payload);
    console.log(" API Response:", response?.data);


    const { success, mailId } = response?.data || {};

    if (success) {
      toast.success("🎉 Account created successfully!");
      
      onSuccess?.(response.data);
      return response.data;
    } 

  
    if (mailId) {
      toast.success("✅ Account setup in progress!");
      
      onSuccess?.(response.data);
      return response.data;
    }

   
    console.warn(" Unexpected API Response:", response?.data);
    toast.error("Unexpected API response. Please try again.");

  } catch (error) {
    console.error(" API Error:", error);
    toast.error(error?.response?.data?.message || "Unable to create account. Please try again.");
    onError?.(error);
  } finally {
    setLoader(false);
  }
};





// export const CreateRegister = async (data, { setLoader, onSuccess, onError }) => {
//   try {
//     setLoader(true);
//     console.log("🔄 Sending API Request with Data:", data);

//     // Validate required fields
//     if (!data.firstName || !data.lastName || !data.email || !data.country || !data.phoneNo || !data.accountType) {
//       toast.error("Please fill in all required fields.");
//       setLoader(false);
//       return;
//     }

//     // Payload for API request
//     const payload = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       country: data.country,
//       phoneNo: data.phoneNo,
//       accountType: data.accountType,
//       knowAboutUs: data.knowAboutUs || "Not specified",
//     };

//     // Make API call
//     const response = await api.post("/register", payload);
//     console.log("✅ API Response:", response.data);

//     if (response.status === 201) {
//       toast.success("🎉 Account created successfully!");
//       onSuccess?.(response.data);
//       return response.data;
//     } else {
//       toast.error("⚠️ Registration failed. Please try again.");
//       onError?.(response.data);
//     }
//   } catch (error) {
//     console.error("❌ API Error:", error);
//     toast.error(error?.response?.data?.message || "Unable to register. Please try again.");
//     onError?.(error);
//   } finally {
//     setLoader(false);
//   }
// };




export const CreateRegister = async (data, { setLoader, onSuccess, onError }) => {
  try {
    setLoader(true);
    console.log("🔄 Sending API Request with Data:", data);

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phoneNo || !data.accountType || !data.knowAboutUs) {
      console.error("❌ Missing required fields:", data);
      toast.error("Please fill in all required fields.");
      setLoader(false);
      return;
    }

    // Ensure correct API URL and POST request
    const response = await axios({
      method: "POST",
      url: `${AccountsRootUrl}/register`, 
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ API Response:", response.data);

    if (response.status === 201) {
      toast.success("🎉 Registration successful!");
      onSuccess?.(response.data);
      return response.data;
    }

    toast.error("⚠️ Registration failed. Please try again.");
    onError?.(response.data);

  } catch (error) {
    console.error("❌ API Error:", error);
    const errorMessage = error?.response?.data?.message || "Unable to complete registration. Please try again.";
    toast.error(errorMessage);
    onError?.(error);
  } finally {
    setLoader(false);
  }
};









// const BASE_URL = "https://api.zunoy.com/api/v1/acc";

// export const loginUser = async (data, { setLoader, navigate, onSuccess, onError }) => {
//   try {
//     setLoader(true);
//     console.log("🔄 Logging in with Data:", data);

//     if (!data.email || !data.password) {
//       toast.error("Please enter both email and password.");
//       setLoader(false);
//       return;
//     }

//     const payload = {
//       email: data.email,
//       password: data.password,
//       deviceInfo: {
//         browser: navigator.userAgent,
//         device: navigator.appVersion,
//         deviceName: navigator.platform,
       
//         ipAddress:"106.51.221.186",
//         os: navigator.platform,
//         platform: "web"
       
       
      
        
//       },
//       otp: 0,
//       killSession: false,
//     };

//     console.log("📦 Payload being sent:", JSON.stringify(payload, null, 2));

//     const response = await axios.post(`${BASE_URL}/login`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
      
//       },
//     });

//     console.log("✅ Login API Response:", response?.data);

//     if (response?.status === 200) {
//       toast.success("🎉 Login successful!");
//       onSuccess?.(response.data);
//       navigate("/mainpage"); 
//       return response.data;
//     } else {
//       toast.error(response?.data?.message || "⚠️ Login failed. Please try again.");
//       onError?.(response.data);
//     }
//   } catch (error) {
//     console.error("❌ Login API Error:", JSON.stringify(error?.response?.data, null, 2) || error);
//     toast.error(error?.response?.data?.message || "Unable to login. Please try again.");
//     onError?.(error.response?.data || error);
// }
// };





// const BASE_URL = "https://api.zunoy.com/api/v1/acc";

// export const loginUser = async (data, { setLoader, navigate, onSuccess, onError }) => {
//   try {
//     setLoader(true);
//     console.log("🔄 Logging in with Data:", data);

//     if (!data.email || !data.password) {
//       toast.error("Please enter both email and password.");
//       setLoader(false);
//       return;
//     }

  
//     const getBrowserName = () => {
//       const userAgent = navigator.userAgent;
//       if (userAgent.includes("Chrome")) return "Chrome";
//       if (userAgent.includes("Firefox")) return "Firefox";
//       if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
//       if (userAgent.includes("Edge")) return "Edge";
//       if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
//       return "Unknown";
//     };

//     const payload = {
//       email: data.email.trim(),
//       password: data.password.trim(),
//       otp: 0,
//       killSession: false,
//       deviceInfo: {
//         platform: "web",
//         os: "Windows 10", 
//         browser: getBrowserName(), 
//         device: "133.0.0.0", 
//         deviceName: "Windows 10", 
//         ipAddress: "106.51.221.186", 
//       },
//     };

//     console.log("📦 Payload being sent:", JSON.stringify(payload, null, 2));

//     const response = await axios.post(`${BASE_URL}/login`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//     });

//     console.log("✅ Login API Response:", response?.data);

//     if (response?.status === 200) {
//       toast.success("🎉 Login successful!");
//       onSuccess?.(response.data);
//       navigate("/mainpage");
//       return response.data;
//     } else {
//       toast.error(response?.data?.message || "⚠️ Login failed. Please try again.");
//       onError?.(response.data);
//     }
//   } catch (error) {
//     console.error("❌ Login API Error:", JSON.stringify(error?.response?.data, null, 2) || error);
//     toast.error(error?.response?.data?.message || "Unable to login. Please try again.");
//     onError?.(error.response?.data || error);
//   } finally {
//     setLoader(false);
//   }
// };

