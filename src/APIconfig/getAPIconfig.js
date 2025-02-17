/* eslint-disable */
// import { toast } from "react-hot-toast";
import { getAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

// Uncomment and modify if needed
// export const GetSessionsApi = (
//   PageData,
//   searchValue,
//   { setloader, setTotalRows }
// ) => {
//   return (dispatch) => {
//     const options = {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("at"),
//       },
//     };
//     getAPICall(
//       `${AccountsRootUrl}/account/session?page=${PageData?.page + 1}&size=${PageData?.pageSize}&search=${searchValue}`,
//       options
//     )
//       .then((res) => {
//         setTotalRows(res?.data?.total);
//         // dispatch(GetSessionsSuccess(res));
//         setloader(false);
//       })
//       .catch((err) => {
//         setloader(false);
//         dispatch({ type: "GET_SESSION_FAILED", payload: err });
//         // toast.error(
//         //   err?.response?.data?.msg ||
//         //   "Unable to retrieve the data. Please try again later."
//         // );
//       });
//   };
// };

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
      } else {
        setError("Unexpected response: " + (res?.msg || "No message"));
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      setLoader(false);
      setError("Error sending OTP. Please try again.");
      throw err;
    });
};

// Verify OTP API
export const VerifyOtpApi = (data, setLoader, setOtpVerified, setError) => {
  setLoader(true);

  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("at"),
    },
  };

  return getAPICall(
    `${AccountsRootUrl}/verifyOtp?email=${data?.email}&otp=${data?.otp}`,
    options
  )
    .then((res) => {
      console.log("Verify OTP API Response:", res);
      setLoader(false);

      if (res?.data?.msg === "otp verified") {
        setOtpVerified(true);
        setError("");
      } else {
        setError("OTP verification failed: " + (res?.msg || "Unknown error"));
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      setLoader(false);
      setError("Error verifying OTP. Please try again.");
      throw err;
    });
};



// export const VerifyOtpApi = (data, setLoader, setOtpVerified, setError) => {
//   setLoader(true);

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("OTP Verified Successfully");
//       setLoader(false);
//       setOtpVerified(true);
//       setError("");
//       resolve({ data: { msg: "otp verified" } });
//     }, 1000);   
//   });
// };

