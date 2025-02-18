/* eslint-disable */
import { getAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

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

// // Verify OTP API
// export const VerifyOtpApi = (data, setLoader, setOtpVerified, setError) => {
//   setLoader(true);
//   console.log("Starting OTP verification with data:", data);

//   const options = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("at"),
//     },
//   };

//   // Using the same path structure as sendOtp since that works
//   const url = `${AccountsRootUrl}/verifyOtp?email=${encodeURIComponent(data?.email)}&otp=${encodeURIComponent(data?.otp)}`;
//   console.log("Verification URL:", url);

//   return getAPICall(url, options)
//     .then((res) => {
//       console.log("Raw API Response:", res);
//       setLoader(false);

//       if (res?.data?.msg === "otp verified" || res?.msg === "otp verified") {
//         setOtpVerified(true);
//         setError("");
//         return res;
//       } else {
//         const errorMsg = "OTP verification failed: " + (res?.data?.msg || res?.msg || "Unknown error");
//         console.log("Verification failed:", errorMsg);
//         setError(errorMsg);
//         throw new Error(errorMsg);
//       }
//     })
//     .catch((err) => {
//       console.error("Detailed error:", err);
//       setLoader(false);
//       // More specific error handling
//       if (err.response?.status === 404) {
//         setError("Invalid verification endpoint. Please contact support.");
//       } else {
//         setError(err.response?.data?.msg || "Error verifying OTP. Please try again.");
//       }
//       throw err;
//     });
// };