import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";
import { toast } from "react-hot-toast";
import { putAPICall } from "./axiosMethodCalls";

export const VerifyOtpApi = (data, setLoader, setStatus, navigate) => {
  return (dispatch) => {
    putAPICall(`${AccountsRootUrl}/verifyOtp`, data)
      .then((res) => {
        setLoader(false);
        console.log("API Response:", res);

        if (res?.data.msg === "verified successfully" ) {
          setStatus("otp verified");
          toast.success("OTP verified successfully!");
         
          localStorage.setItem("registrationEmail", data.email);
          navigate("/setup-password");
        } else {
          setStatus("otp failed");
          toast.error("Invalid OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.error("API Error:", err); 
        setLoader(false);
        dispatch({ type: "USER_VERIFICATION_FAILED", payload: err });
        toast.error(
          err?.response?.data?.msg || "Unable to verify OTP. Please try again later."
        );
      });
  };
};