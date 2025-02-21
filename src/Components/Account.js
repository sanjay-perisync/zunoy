import React, { useEffect, useState } from "react";
import { fetchAccountData } from "../APIconfig/getAPIconfig";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";

const Account = ({ onEdit, onRequestDelete }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchAccountData();
        setUser(data);
      } catch (error) {
        console.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="  p-6 bg-white shadow-md rounded-lg">
        <Navbar/>
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          {/* Profile Icon */}
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.fullName || "User Name"}</h2>
          <p className="text-gray-500">{user?.email || "user@example.com"}</p>
        </div>
        <button
          onClick={onEdit}
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      </div>

      {/* Profile Information */}
      <div className="mt-4 space-y-4">
        {[
          { label: "First Name", value: user?.firstName },
          { label: "Last Name", value: user?.lastName },
          { label: "Contact Number", value: user?.contactNumber },
          { label: "Account Type", value: user?.accountType },
          { label: "Last Login At", value: user?.lastLogin },
        ].map((item, index) => (
          <div key={index} className="flex justify-between border-b pb-2">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value || "N/A"}</span>
          </div>
        ))}
      </div>

      {/* Delete Account Section */}
      <div className="mt-6 p-4 border-t">
        <h3 className="text-lg font-semibold">Delete your Account</h3>
        <p className="text-gray-600 text-sm mt-1">
          Deleting your account is a permanent action. If you're sure about
          proceeding, click the button below to request deletion.
        </p>
        <button
          onClick={onRequestDelete}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Request Account Deletion
        </button>
      </div>

      <Mainpagefooter/>
    </div>
  );
};

export default Account;
