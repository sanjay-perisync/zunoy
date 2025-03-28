import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { putAPICall } from "./axiosMethodCalls";
import { setBillingInfo } from "../Redux/Slices/Billing/billingSlice";
import { BillingSuccess } from "../Redux/Slices/Billing/billingSlice";
import { guestrooturl } from "./getAPIconfig";
import { UpdateGuestSuccess } from "../Redux/Slices/Guest/GuestSlice";




export const VerifyOtpApi = (data, setLoader, setStatus, navigate) => {
  return (dispatch) => {
    putAPICall(`${AccountsRootUrl}/verifyOtp`, data)
      .then((res) => {
        setLoader(false);
        console.log("API Response:", res);

        if (res?.data?.msg === "verified successfully") {
          setStatus("otp verified");
          toast.success("OTP verified successfully!");

          const identifier = res?.data?.identifier;
          const email = data?.email;

          if (identifier) {
            localStorage.setItem("identifier", identifier);  
          } else {
            console.error(" Identifier is missing in API response:", res?.data);
          }

          if (email) {
            localStorage.setItem("registrationEmail", email);
          }

          navigate("/setup-password");
        } else {
          setStatus("otp failed");
          toast.error("Invalid OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setLoader(false);
        dispatch({ type: "USER_VERIFICATION_FAILED", payload: err });
        toast.error(
          err?.response?.data?.msg ||
            "Unable to verify OTP. Please try again later."
        );
      });
  };
};





const API_BASE_URL = "https://znginx.perisync.work/api/v1/acc";

export const verifyEmail = async (email) => {
  return await axios.put(`${API_BASE_URL}/forgotPassword`, { email }); 
};



export const verifyOtp = async (email, otp) => {
  // return axios.put("https://znginx.perisync.work/api/v1/acc/verifyOtp", {
    return axios.put(`${AccountsRootUrl}/verifyOtp`, {

    email,
    otp: parseInt(otp, 10), 
  });
};


export const updatePassword = async (email, password, identifier) => {
  return await axios.put(`${API_BASE_URL}/setPassword`, {
    email,
    password,
    identifier,
    device: "133.0.0.0",
    ipAddress: "106.51.219.124",
  });
};






// export const changePassword = async ({ oldPassword, newPassword, otp, killSession }) => {
//   try {
//       const token = localStorage.getItem("at");

//       const payload = {
//           oldPassword,
//           newPassword,
//           killSession,
//           otp: otp ?? 0,
//       };

//       // Add OTP only if MFA is enabled
//       if (otp !== undefined && otp !== null) {
//           payload.otp = otp;
//       }

//       const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/resetPassword", {
//           method: "PUT",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       return { success: response.ok, data };
//   } catch (error) {
//       console.error("Error:", error);
//       return { success: false, error: "Something went wrong." };
//   }
// };




// export const changePasswordMFA = async ({ oldPassword, newPassword, otp, killSession }) => { 
//   try {
//       const token = localStorage.getItem("at");

//       const payload = {
//           oldPassword,
//           newPassword,
//           killSession,
//           otp: otp || 0,  
//       };

//       console.log("Request URL: https://znginx.perisync.work/api/v1/acc/account/resetPassword");
//       console.log("Request Method: PUT");
//       console.log("Payload:", JSON.stringify(payload, null, 2));

//       const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/resetPassword", {
//           method: "PUT",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       console.log("Status Code:", response.status, response.ok ? "OK" : "FAILED");
//       console.log("Preview:\n", JSON.stringify(data, null, 2));

//       return { success: response.ok, data };
//   } catch (error) {
//       console.error("Error:", error);
//       return { success: false, error: "Something went wrong." };
//   }
// };


export const changePassword = async ({ oldPassword, newPassword, otp, killSession, is2FAEnabled }) => {
  try {
      const token = localStorage.getItem("at");
      if (!token) {
          return { success: false, message: "Authentication error. Please log in again." };
      }

      const payload = {
          oldPassword,
          newPassword,
          killSession,
      };

   
      if (is2FAEnabled) {
          payload.otp = otp ?? 0;
      }

      console.log("Sending API Request:", payload);

      const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/resetPassword", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response Data:", data);

      if (!response.ok) {
          throw new Error(data.msg || "Error updating password");
      }

      return { success: true, message: data.msg };
  } catch (error) {
      console.error("Error:", error);
      return { success: false, message: error.message || "Something went wrong." };
  }
};








// export const updateBillingAddress = async (billingData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/billingAddress`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("at")}`,
//       },
//       body: JSON.stringify(billingData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update billing address");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error updating billing address:", error);
//     return null;
//   }
// };


// export const updateBillingAddress = (billingData) => {
//   return (dispatch) => {
//     // setLoading(true);

//     const options = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("at")}`,
//       },
//     };

//     putAPICall(`${API_BASE_URL}/billingAddress`, options)
//       .then((response) => {
//         // setLoading(false);
//         dispatch(BillingSuccess(response));
//       })
//       .catch((err) => {
//         // setLoading(false);
//         dispatch({ type: "FETCH_Billing_DETAILS_FAILED", payload: err });
//         toast.error(
//           err?.response?.data?.msg ||
//             "Unable to fetch Billing details. Please try again later."
//         );
//       });
//   };
// };






export const updateBillingAddress = (billingData) => {
  return (dispatch) => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("at")}`,
      },
    };

    putAPICall(`${API_BASE_URL}/billingAddress`, billingData, options) 
      .then((response) => {
        dispatch(BillingSuccess(response.data)); 
        toast.success("Billing address updated successfully!");
      })
      .catch((err) => {
        dispatch({ type: "FETCH_BILLING_DETAILS_FAILED", payload: err });
        toast.error(
          err?.response?.data?.msg ||
            "Unable to update Billing details. Please try again later."
        );
      });
  };
};






export const UpdateGuestAPI = (formData, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-app-id": "2"
        
      },
    };
  

    putAPICall(`${guestrooturl}/guest`,formData, options)
      .then((response) => {
        setLoading(false);
        // dispatch(UpdateGuestSuccess(response?.data));
        dispatch(UpdateGuestSuccess({ data: response?.data }));

        toast.success("Guest updated successfully!");
      })
      .catch((err) => {
        setLoading(false);
        dispatch({ type: "Update_Failed", payload: err });

        toast.error(
          err?.response?.data?.msg || "Unable to Update. Please try again later."
        );
      });
  };
};