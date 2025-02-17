/*eslint-disable */
import { AccountsRootUrl, ProjectId } from "./ConstantRootURL/RootUrl";
import { toast } from "react-hot-toast";
import { putAPICall } from "./axiosMethodCalls";

export const ResetPasswordApi = (data, { setloader, setStatus }) => {
  return (dispatch) => {
    putAPICall(`${AccountsRootUrl}/forgotPassword`, data)
      .then((res) => {
        setStatus("otp sent");
        if (res?.data?.msg === "otp sent") {
          // GlobalToaster(5, "success");
        } else {
          toast.success(res?.data?.msg);
        }
        setloader(false);
      })
      .catch((err) => {
        dispatch({ type: "USER_VERIFICATION_FAILED", payload: err });
        setloader(false);
        toast.error(
          err?.response?.data?.msg ||
          "Unable to update. Please try again later."
        );
      });
  };
};
