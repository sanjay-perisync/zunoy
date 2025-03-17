/* eslint-disable */
import { toast } from "react-hot-toast";
import { deleteAPICall } from "./axiosMethodCalls";
import { AccountsRootUrl } from "./ConstantRootURL/RootUrl";
import { guestrooturl } from "./getAPIconfig";
import { DeleteGuestSuccess } from "../Redux/Slices/Guest/GuestSlice";
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

    

    if (!token) {
     
      toast.error("Session expired. Redirecting...");
      localStorage.clear();
      window.location.replace("/login"); 
      return;
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

   
    
    deleteAPICall(`${AccountsRootUrl}/account/logout`, options)
      .then((res) => {
        setloader(false);
        // localStorage.clear();
        window.location.replace("/"); 
        resolve(res);
      })
      .catch((err) => {
        setloader(false);
        toast.error("Logout failed. Please try again.");
        // localStorage.clear();
        window.location.replace("/"); 
        reject(err);
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



export const DeleteGuestAPI = (guestId, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-app-id": "2"
      },
    };
  
    deleteAPICall(`${guestrooturl}/guest?userId=${guestId}`, options)
      .then((response) => {
        setLoading(false);
        dispatch(DeleteGuestSuccess(guestId));
        toast.success("Guest deleted successfully");
      })
      .catch((err) => {
        setLoading(false);
        dispatch({ type: "Delete", payload: err });

        toast.error(
          err?.response?.data?.msg || "Unable to delete. Please try again later."
        );
      });
  };
};