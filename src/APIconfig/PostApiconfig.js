import { toast } from "react-hot-toast";
import axios from "axios";
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



export const loginUser = async (email, password) => {
  try {
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
        ipAddress: "106.51.221.186",
      },
    };

    const response = await api.post("/login", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

