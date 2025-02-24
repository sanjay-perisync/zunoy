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
    <div className="flex flex-col justify-between  bg-white h-screen">
        <Navbar/>
      {/* Profile Header */}
      <div className="flex justify-between items-center max-w-[1640px] my-10">
      <div className="flex items-center space-y-5 gap-4  px-6 pb-4 ml-5">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mt-5">
          {/* Profile Icon */}
          <span className="text-2xl">👤</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.fullName || "User Name"}</h2>
          <p className="text-gray-500">{user?.email || "user@example.com"}</p>
        </div>
        </div>

        <div>
          <p className="text-indigo-500  border rounded-full p-2">Joined on: 13th Feb 2025</p>
        </div>
        </div>
      

      {/* Profile Information */}
      <div className=" max-w-[1600px] mx-10 space-y-4 px-5 py-4 border rounded-xl">
        <div className="flex justify-between border-b py-2">
          <p className="font-semibold text-[20px]">Profile Information</p>
          <button
          onClick={onEdit}
          className="ml-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl "
        >
          Edit
        </button>
        </div>
        {[
          { label: "First Name", value: user?.firstName },
          { label: "Last Name", value: user?.lastName },
          { label: "Contact Number", value: user?.phoneNo },
          { label: "Email", value: user?.email },
          { label: "Account Type", value: user?.accountType },
          { label: "Last Login At", value: user?.updatedAt },
        ].map((item, index) => (
          <div key={index} className="flex flex-col  pb-2">
            <span className="">{item.label}</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Delete Account Section */}
      <div className="mt-6 p-4 space-y-4 border rounded-xl mx-auto max-w-[1600px]">
        <h3 className="text-lg font-semibold border-b pb-4">Delete your Account</h3>
        <p className="text-gray-600 text-[18px]  mt-1">
        Deleting your Zunoy account is a permanent action that will result in the deletion of all your data across Zunoy products. If you’re sure about proceeding, click the button below to request deletion. Once proceeded, our team will contact you to discuss your request and understand your decision before finalizing the process.
        </p>
        <button
          onClick={onRequestDelete}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
        >
          Request Account Deletion
        </button>
      </div>

      <Mainpagefooter/>
    </div>
  );
};

export default Account;
