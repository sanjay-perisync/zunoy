import React, { useState, useEffect } from "react";
import { LogoutApi } from "../APIconfig/DeleteApiConfig";

import { useNavigate } from "react-router-dom";

function LogoutPopup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isModalOpen]);

  const handleLogout = () => {
    setLoading(true);
    LogoutApi({ setloader: setLoading })
      .then(() => {
        setIsModalOpen(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  
  
  return (
    <div>
      {/* Logout Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 text-red-500 border border-red-300 rounded-xl hover:bg-red-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span className="font-semibold text-[16px]">Logout</span>
      </button>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white py-3 space-y-2 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-[25px] font-bold border-b px-5 py-5">
              Confirmation!
            </h2>
            <p className="mt-2 px-5 font-semibold text-gray-500 text-[20px]">
              Would you like to logout from Zunoy Accounts?
            </p>
            <p className="text-gray-600 mt-1 px-5 text-[18px]">
              If you logout, your session will be deleted.
            </p>

            {/* Buttons */}
            <div className="mt-4 pb-3 px-5 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-semibold rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                disabled={loading}
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoutPopup;
