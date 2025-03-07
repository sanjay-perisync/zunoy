import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";
import { updateBillingAddress } from "../APIconfig/PutApiconfig";

function Billing() {
  const [showForm, setShowForm] = useState(false);
  const [billingInfo, setBillingInfo] = useState(null);
  const [formData, setFormData] = useState({
    line1: "",
    line2: "",
    state: "",
    city: "",
    postalCode: "",
    country: "India",
    gstNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = await updateBillingAddress(formData);
    if (updatedData) {
      setBillingInfo(updatedData);
      setShowForm(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[1400px] my-5">
        <div className="border rounded-xl mt-5 p-0">
          {!showForm && (
            <div className="flex justify-between items-center border-b border-gray-300 p-4">
              <h6 className="font-semibold text-xl">Billing Information</h6>
              <button
                className="bg-[#635DFF] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#5349E6]"
                onClick={() => setShowForm(true)}
              >
                {billingInfo ? "Edit" : "Add"}
              </button>
            </div>
          )}

          {!showForm ? (
            billingInfo ? (
              <div className="">
                {[
                  {
                    label: "Address Line 1", value: billingInfo.line1, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M15.29 20.663h3.017a2.194 2.194 0 0 0 2.193-2.194v-6.454a3.3 3.3 0 0 0-1.13-2.48l-5.93-5.166a2.194 2.194 0 0 0-2.88 0L4.63 9.534a3.3 3.3 0 0 0-1.13 2.481v6.454c0 1.212.982 2.194 2.194 2.194h3.29m6.306 0v-6.581c0-.908-.736-1.645-1.645-1.645H10.63c-.909 0-1.645.737-1.645 1.645v6.581m6.306 0H8.984" />
                      </svg>
                    )
                  },
                  {
                    label: "Address Line 2", value: billingInfo.line2, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M15.29 20.663h3.017a2.194 2.194 0 0 0 2.193-2.194v-6.454a3.3 3.3 0 0 0-1.13-2.48l-5.93-5.166a2.194 2.194 0 0 0-2.88 0L4.63 9.534a3.3 3.3 0 0 0-1.13 2.481v6.454c0 1.212.982 2.194 2.194 2.194h3.29m6.306 0v-6.581c0-.908-.736-1.645-1.645-1.645H10.63c-.909 0-1.645.737-1.645 1.645v6.581m6.306 0H8.984" />
                      </svg>
                    )
                  },
                  {
                    label: "State", value: billingInfo.state, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137" />
                        <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                      </svg>
                    )
                  },
                  {
                    label: "City", value: billingInfo.city, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M472 48H40a24.03 24.03 0 0 0-24 24v368a24.03 24.03 0 0 0 24 24h88v-58.822a20.01 20.01 0 0 1 10.284-17.478l91.979-51.123L200 260.919V200a56 56 0 0 1 112 0v60.919l-30.263 75.655l91.979 51.126A20.01 20.01 0 0 1 384 405.178V464h88a24.03 24.03 0 0 0 24-24V72a24.03 24.03 0 0 0-24-24m-8 384h-48v-26.822a52.03 52.03 0 0 0-26.738-45.451L321.915 322.3L344 267.081V200a88 88 0 0 0-176 0v67.081l22.085 55.219l-67.347 37.432A52.03 52.03 0 0 0 96 405.178V432H48V80h416Z" /></svg>
                    )
                  },
                  {
                    label: "Pin code", value: billingInfo.postalCode, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137" />
                        <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                      </svg>
                    )
                  },
                  {
                    label: "Country", value: billingInfo.country, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137" />
                        <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                      </svg>
                    )
                  },
                  billingInfo.gstNumber && {
                    label: "GST Number", value: billingInfo.gstNumber, icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137" />
                        <circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" />
                      </svg>
                    )
                  },
                ]
                  .map((field, index) =>
                    field ? (
                      <div key={index} className="flex items-center gap-3 border-b py-4 px-4 last:border-b-0">
                        <span className="text-lg">{field.icon}</span>
                        <div>
                          <p className="font-semibold">{field.label}</p>
                          <p className="text-gray-600">{field.value}</p>
                        </div>
                      </div>
                    ) : null
                  )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-4">
                <img
                  src="https://dev-account.zoop360.com/assets/no-data-813afbfd.svg"
                  alt="No Data"
                  width="200"
                />
                <p className="text-gray-500 mt-2">Information not yet added.</p>
              </div>
            )
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="border-b p-4 font-semibold text-[20px]">
                Update Billing Details
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                {[
                  { label: "Address Line 1", name: "line1" },
                  { label: "Address Line 2", name: "line2" },
                  { label: "State", name: "state" },
                  { label: "City", name: "city" },
                  { label: "Pin Code / Zip Code", name: "postalCode" },
                ].map((field) => (
                  <Box key={field.name} display="flex" alignItems="center" gap={2} p={2} borderBottom="1px solid #E0E0E0">
                    <Typography sx={{ minWidth: 150, fontWeight: 500 }}>{field.label}</Typography>
                    <TextField
                      name={field.name}
                      label={field.label}
                      fullWidth
                      variant="filled"
                      value={formData[field.name]}
                      onChange={handleChange}
                      sx={{
                        "& .MuiInputBase-root": {
                          border: "3px solid",
                          borderColor: "#F8F8F8",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          transition: "border-color 0.3s ease",
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
                  </Box>
                ))}

                <Box display="flex" alignItems="center" gap={2} p={2} borderBottom="1px solid #E0E0E0">
                  <Typography sx={{ minWidth: 150, fontWeight: 500 }}>Country</Typography>
                  <TextField
                    label="Country"
                    fullWidth
                    disabled
                    value="India"
                    variant="filled"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "white",
                      },
                      "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                        display: "none",
                      },
                    }}
                  />
                </Box>

                <Box display="flex" justifyContent={"space-between"} alignItems="center" gap={2} p={2} borderBottom="1px solid #E0E0E0">
                  <Typography sx={{ minWidth: 150, fontWeight: 500 }}>GST Number</Typography>
                  <TextField
                    name="gstNumber"
                    label="GST Number (Optional)"
                    variant="filled"
                    fullWidth
                    value={formData.gstNumber}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        transition: "border-color 0.3s ease",
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
                </Box>
              </div>

              <div className="flex justify-end mt-4 gap-4 p-4">
                <button type="button" className="font-semibold" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="ml-2 bg-indigo-500 px-3 py-[6px] text-white font-semibold rounded-xl">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <footer className="mx-auto max-w-[1400px]">
        <Mainpagefooter />
      </footer>
    </div>
  );
}

export default Billing;
