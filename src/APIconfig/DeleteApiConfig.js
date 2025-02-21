/* eslint-disable */
import { toast } from "react-hot-toast";
import { deleteAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";

// export const LogoutApi = ({ setloader }) => {
//   return (dispatch) => {
//     const options = {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("at"),
//       },
//     };
//     deleteAPICall(`${AccountsRootUrl}/account/logout`, options)
//       .then((res) => {
//         setloader(false);
//         if (localStorage.getItem("mobile") === "true") {
//           window.location.href = "/"
//         }
//         dispatch(LogoutSuccess(res));
//         dispatch(ResetStateNotifcation())
//         GlobalToaster(1, 'success')

//       })
//       .catch((err) => {
//         dispatch({ type: "LOG_OUT_FAILED", payload: err });
//         toast.error(
//           err?.response?.data?.msg ||
//           "Unable to update. Please try again later."
//         );
//       });
//   };
// };

export const LogoutApi = ({ setloader }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("at");

    console.log("🚀 Logout API Called - Token:", token);

    if (!token) {
      console.warn("⚠️ No token found. User might already be logged out.");
      toast.error("Session expired. Redirecting...");
      localStorage.clear();
      console.log("Redirecting to /login...");
      window.location.href = "/"; // Redirect to home page
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(" Sending DELETE request to:", `${AccountsRootUrl}/account/logout`);
    console.log("🛠 Headers:", options);

    deleteAPICall(`${AccountsRootUrl}/account/logout`, options)
      .then((res) => {
        console.log("Logout API Success:", res);
        setloader(false);
        localStorage.clear(); 
        GlobalToaster(1, "Logged out successfully");
        resolve(res);
      })
      .catch((err) => {
        console.error("Logout API Error:", err);

        setloader(false);
        if (err.response?.status === 401) {
          toast.error("Session expired. Redirecting");
          localStorage.clear();
        } else {
          toast.error(err?.response?.data?.msg || "Unable to logout. Try again.");
        }
        reject(err);
      })
      .finally(() => {
        console.log(" Waiting 3 seconds before redirecting...");
        setTimeout(() => {
          console.log("Redirecting now...");
          window.location.href = "/";
        }, 3000); 
      });
  });
};
