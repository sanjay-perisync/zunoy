import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { putAPICall } from "./axiosMethodCalls";




export const VerifyOtpApi = (data, setLoader, setStatus, navigate) => {
  return (dispatch) => {
    putAPICall(`${AccountsRootUrl}/verifyOtp`, data)
      .then((res) => {
        setLoader(false);
        console.log("✅ API Response:", res);

        if (res?.data?.msg === "verified successfully") {
          setStatus("otp verified");
          toast.success("OTP verified successfully!");

          const identifier = res?.data?.identifier;
          const email = data?.email;

          if (identifier) {
            localStorage.setItem("identifier", identifier);  
          } else {
            console.error("❌ Identifier is missing in API response:", res?.data);
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
  return axios.put("https://znginx.perisync.work/api/v1/acc/verifyOtp", {
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






export const changePassword = async ({ oldPassword, newPassword, otp, killSession }) => {
  try {
      const token = localStorage.getItem("at");

      const payload = {
          oldPassword,
          newPassword,
          killSession,
          otp: otp ?? 0,
      };

      // Add OTP only if MFA is enabled
      if (otp !== undefined && otp !== null) {
          payload.otp = otp;
      }

      const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/resetPassword", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
      });

      const data = await response.json();
      return { success: response.ok, data };
  } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Something went wrong." };
  }
};




export const changePasswordMFA = async ({ oldPassword, newPassword, otp, killSession }) => { 
  try {
      const token = localStorage.getItem("at");

      const payload = {
          oldPassword,
          newPassword,
          killSession,
          otp: otp || 0,  
      };

      console.log("Request URL: https://znginx.perisync.work/api/v1/acc/account/resetPassword");
      console.log("Request Method: PUT");
      console.log("Payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/resetPassword", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Status Code:", response.status, response.ok ? "OK" : "FAILED");
      console.log("Preview:\n", JSON.stringify(data, null, 2));

      return { success: response.ok, data };
  } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Something went wrong." };
  }
};

