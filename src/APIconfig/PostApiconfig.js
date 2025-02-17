/* eslint-disable */
import { toast } from "react-hot-toast";
import { postAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl, SupportUrl } from "./ConstantRootURL/RootUrl";
// import { Validatesuccess } from "src/slices/auth/validateLogin";


export const VALIDATE_EMAIL = ({ ...data }, { setloader, setTFa, setLoginSeat, setModalType }) => {
  return (dispatch) => {
    console.log("API URL:", `${AccountsRootUrl}/login`);
    console.log("Request Data:", data);

    postAPICall(`${AccountsRootUrl}/login`, { ...data })
      .then((res) => {
        console.log("API Response:", res);

        if (data?.killSession) {
          setLoginSeat(false);
        }
        if (res?.status === 200) {
          console.log("Login Successful:", res.data);
          if (res?.data === "OTP sent") {
            setTFa(true);
          } else {
            dispatch(Validatesuccess(res));
            dispatch(preferenceSuccess(res));
            dispatch(LanguageSuccess(res));

            localStorage.setItem("at", res?.headers?.at);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("accType", res?.data?.accountType);
            localStorage.setItem("email", res?.data?.email);

            setloader(false);
          }
        } else if (res?.status === 202) {
          console.log("Additional validation required.");
          dispatch(Validatesuccess(res));
        }
      })
      .catch((err) => {
        setloader(false);
        console.error("API Error:", err);
        if (err?.response) {
          console.error("Error Response Data:", err.response.data);
          console.error("Status Code:", err.response.status);
        }

        if (err?.response?.status === 406) {
          setModalType(true);
          setLoginSeat(true);
        }

        toast.error(err?.response?.data?.msg || "Unable to create. Please try again later.");
      });
  };
};

