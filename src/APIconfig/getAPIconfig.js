/* eslint-disable */
import { getAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";
import toast from "react-hot-toast";

// Send OTP API
export const SendotpAPI = (data, setLoader, setOtpSent, setError) => {
  setLoader(true);

  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("at"),
    },
  };

  return getAPICall(
    `${AccountsRootUrl}/sendOtp?email=${data?.email}&reqOtp=${data?.otp}`,
    options
  )
    .then((res) => {
      console.log('API Response:', res);
      setLoader(false);

      if (res?.data?.msg === "otp sent") {
        setOtpSent(true);
        setError("");  
        return res;
      } else {
        const errorMsg = "Unexpected response: " + (res?.data?.msg || "No message");
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      setLoader(false);
      setError("Error sending OTP. Please try again.");
      throw err;
    });
};



// import { Validatesuccess } from "src/slices/auth/validateLogin";


// export const VALIDATE_EMAIL = ({ ...data }, { setloader, setTFa, setLoginSeat, setModalType }) => {
//   return (dispatch) => {
//     console.log("API URL:", `${AccountsRootUrl}/login`);
//     console.log("Request Data:", data);

//     postAPICall(`${AccountsRootUrl}/login`, { ...data })
//       .then((res) => {
//         console.log("API Response:", res);

//         if (data?.killSession) {
//           setLoginSeat(false);
//         }
//         if (res?.status === 200) {
//           console.log("Login Successful:", res.data);
//           if (res?.data === "OTP sent") {
//             setTFa(true);
//           } else {
//             dispatch(Validatesuccess(res));
//             dispatch(preferenceSuccess(res));
//             dispatch(LanguageSuccess(res));

//             localStorage.setItem("at", res?.headers?.at);
//             localStorage.setItem("isAuthenticated", true);
//             localStorage.setItem("accType", res?.data?.accountType);
//             localStorage.setItem("email", res?.data?.email);

//             setloader(false);
//           }
//         } else if (res?.status === 202) {
//           console.log("Additional validation required.");
//           dispatch(Validatesuccess(res));
//         }
//       })
//       .catch((err) => {
//         setloader(false);
//         console.error("API Error:", err);
//         if (err?.response) {
//           console.error("Error Response Data:", err.response.data);
//           console.error("Status Code:", err.response.status);
//         }

//         if (err?.response?.status === 406) {
//           setModalType(true);
//           setLoginSeat(true);
//         }

//         toast.error(err?.response?.data?.msg || "Unable to create. Please try again later.");
//       });
//   };
// };

// src/api.js
// export const fetchAccountData = async () => {
//   try {
//     const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/read");
//     if (!response.ok) {
//       throw new Error("Failed to fetch account data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching account data:", error);
//     throw error;
//   }
// };



//   try {
//     // Get the token from localStorage
//     const token = localStorage.getItem('auth_token'); // Make sure this matches your token key name
    
//     // Debug log to check if token exists
//     if (!token) {
//       console.log("No token found in localStorage");
//       throw new Error("No authentication token found");
//     }

//     console.log("Token found:", token.substring(0, 10) + "..."); // Log first 10 chars for debugging

//     const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/read", {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       credentials: 'include' // Include cookies if your API uses them
//     });

//     // Debug log for response
//     console.log("Response status:", response.status);
    
//     if (!response.ok) {
//       if (response.status === 401) {
//         // Try to get response text for more info
//         const errorText = await response.text();
//         console.log("401 Error details:", errorText);
//         throw new Error("Authentication failed");
//       }
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     console.log("Data received:", data); // Log received data
//     return data;
    
//   } catch (error) {
//     console.error("Error fetching account data:", error);
//     throw error;
//   }
// };



export const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("at"); 
    
    // const response = await fetch("https://znginx.perisync.work/api/v1/acc/products", {
      const response = await fetch(`${AccountsRootUrl}/products`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};






export const requestOtpFor2FA = async (password) => {
    // const url = `https://znginx.perisync.work/api/v1/acc/account/toggleTwoFA?status=true&password=${encodeURIComponent(password)}&otp=0&reqOtp=false`;
    const url = `${AccountsRootUrl}/account/toggleTwoFA?status=true&password=${encodeURIComponent(password)}&otp=0&reqOtp=false`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("at")}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Invalid password");

        if (data.msg === "otp sent") {
            toast.success("OTP has been sent.");
            return true;
        } else {
            toast.error("Unexpected response from server.");
            return false;
        }
    } catch (error) {
        toast.error(error.message || "Error validating password");
        return false; 
    }
};







export const toggleTwoFA = async (password, otp, status) => {
  const otpString = otp.join("");
  // const url = `https://znginx.perisync.work/api/v1/acc/account/toggleTwoFA?status=${status}&password=${encodeURIComponent(password)}&otp=${otpString}&reqOtp=false`;
  const url = `${AccountsRootUrl}/account/toggleTwoFA?status=${status}&password=${encodeURIComponent(password)}&otp=${otpString}&reqOtp=false`;

  try {
      const response = await fetch(url, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("at")}`,
          },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error toggling 2FA");

      if (data.msg === "toggle 2FA success") {
          localStorage.setItem("twoFAStatus", status); 
          return { success: true, status, message: "MFA updated successfully" };
      } else {
          return { success: false, message: data.msg || "Unexpected server response" };
      }
  } catch (error) {
      return { success: false, message: error.message || "Error toggling 2FA" };
  }
};




export const fetchSessions = async (authToken) => {
  try {
    // const response = await fetch(
    //   "https://znginx.perisync.work/api/v1/acc/account/session?page=1&size=100&search=",
    const response = await fetch(
      `${AccountsRootUrl}/account/session?page=1&size=100&search=`,
    
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result.data || []; 
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};





const API_BASE_URL = "https://znginx.perisync.work/api/v1/support";

export const fetchSupportTickets = async (page = 1, size = 5, searchKey = "", status = "", userId = "", productId = "") => {
  const token = localStorage.getItem("at"); 

  try {
    const response = await fetch(
      `${API_BASE_URL}/tickets?page=${page}&size=${size}&searchKey=${searchKey}&status=${status}&userId=${userId}&productId=${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return { data: null, total: 0 };
  }
};




export const fetchStatusCounts = async (searchKey = "", productId = "") => {
  const token = localStorage.getItem("at"); 

  try {
    const response = await fetch(
      `https://znginx.perisync.work/api/v1/support/statusCount?searchKey=${searchKey}&productId=${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching status counts:", error);
    return { all: 0, closed: 0, inProgress: 0, open: 0, resolved: 0 };
  }
};
