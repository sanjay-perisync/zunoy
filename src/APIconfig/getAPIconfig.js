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
export const fetchAccountData = async () => {
  try {
    const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/read");
    if (!response.ok) {
      throw new Error("Failed to fetch account data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching account data:", error);
    throw error;
  }
};




