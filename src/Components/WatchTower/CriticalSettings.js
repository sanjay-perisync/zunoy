import { CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteMonitorAPI } from "../../APIconfig/DeleteApiConfig";
import { useNavigate } from "react-router-dom";

const CriticalSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const navigate =  useNavigate();

  const dispatch = useDispatch();
  

  const monitor = useSelector(
    (state) => state?.MonitorSliceReducer?.ViewMonitorSlice || []
  );

//   console.log(monitor);
  

  const id = monitor?.data?.id;
//   console.log("ID:",id);
  

  const monitorName = monitor?.data?.name;



  const handleDelete = () => {
    if (id) {
      setLoading(true); 
      dispatch(DeleteMonitorAPI(id,setLoading,navigate))
        setIsModalOpen(false); 
        setDeleteText("");   
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-semibold text-xl">Delete Monitor</h1>
        <p className="text-gray-500">
          Please remove this monitor if required. Be aware that once deleted, it
          cannot be restored.
        </p>
        <p>
          To confirm this, type{" "}
          <span className="text-red-500 font-bold">"DELETE"</span> (case
          sensitive).
        </p>


<div>
        <TextField
          type="text"
          label="Enter DELETE"
          variant="filled"
          value={deleteText}
          onChange={(e) => setDeleteText(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              border: "3px solid",
              borderColor: "#F8F8F8",
              borderRadius: "8px",
              backgroundColor: "white",
            },
            "& .MuiInputBase-root:hover": {
              borderColor: "#BEBEBE",
              backgroundColor: "#F8F8F8",
            },
            "& .MuiInputBase-root.Mui-focused": {
              borderColor: "#1976D2",
              backgroundColor: "white",
            },
            "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
              display: "none",
            },
          }}
        />
        </div>

        <button
          className={`px-3 py-2 rounded-xl font-semibold ${
            deleteText === "DELETE"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => setIsModalOpen(true)}
          disabled={deleteText !== "DELETE"}
        >
          Delete Monitor
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white py-3 space-y-2 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-[25px] font-bold border-b px-5 py-5">
              Confirmation!
            </h2>
            <p className="mt-2 px-5 font-semibold text-gray-500 text-[20px]">
              Would you like to delete this monitor?
            </p>
            <span className="pl-5 text-gray-400">{monitorName}</span>

            <div className="mt-4 pb-3 px-5 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-semibold rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CriticalSettings;
