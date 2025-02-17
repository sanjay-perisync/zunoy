/* eslint-disable */
import { toast } from "react-hot-toast";
import { deleteAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

export const LogoutApi = ({ setloader }) => {
  return (dispatch) => {
    const options = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("at"),
      },
    };
    deleteAPICall(`${AccountsRootUrl}/account/logout`, options)
      .then((res) => {
        setloader(false);
        if (localStorage.getItem("mobile") === "true") {
          window.location.href = "/"
        }
        dispatch(LogoutSuccess(res));
        dispatch(ResetStateNotifcation())
        GlobalToaster(1, 'success')

      })
      .catch((err) => {
        dispatch({ type: "LOG_OUT_FAILED", payload: err });
        toast.error(
          err?.response?.data?.msg ||
          "Unable to update. Please try again later."
        );
      });
  };
};