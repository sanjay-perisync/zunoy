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

    console.log(" Logout API Called - Token:", token);

    if (!token) {
      console.warn(" No token found. User might already be logged out.");
      toast.error("Session expired. Redirecting...");
      localStorage.clear();
      console.log("Redirecting to /login...");
      window.location.href = "/";
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(" Sending DELETE request to:", `${AccountsRootUrl}/account/logout`);
    console.log("Headers:", options);

    deleteAPICall(`${AccountsRootUrl}/account/logout`, options)
      .then((res) => {
        console.log("Logout API Success:", res);
        setloader(false);
        localStorage.clear();
        toast.success("You've logged out successfully");
        resolve(res);
      })
      .catch((err) => {
        console.error("Logout API Error:", err);

        setloader(false);
        if (err.response?.status === 401) {
          toast.error("Session expired. Redirecting...");
          localStorage.clear();
        } else {
          toast.error(err?.response?.data?.msg || " Logout failed. Please try again.");
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





export const handleConfirmDelete = async (selectedSession) => {
  if (!selectedSession) {
    return { success: false, message: "No session selected" };
  }

  try {
    const token = localStorage.getItem("at");
    const response = await fetch(
      `https://znginx.perisync.work/api/v1/acc/account/session?id=${selectedSession.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "Session deleted successfully"
      };
    } else {
      return {
        success: false,
        message: data.msg || "Failed to delete session"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error deleting session"
    };
  }
};




export const endAllSessions = async () => {
  try {
      const token = localStorage.getItem("at");
      const response = await fetch(
          "https://znginx.perisync.work/api/v1/acc/account/session/kill",
          {
              method: "DELETE",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );

      const data = await response.json();
      
      if (response.ok) {
          return { 
              success: true, 
              message: "All sessions ended successfully" 
          };
      } else {
          return { 
              success: false, 
              message: data.msg || "Failed to end all sessions" 
          };
      }
  } catch (error) {
      return { 
          success: false, 
          message: "Error ending all sessions" 
      };
  }
};