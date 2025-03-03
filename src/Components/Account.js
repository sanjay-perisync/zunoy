import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Mainpagefooter from "./Mainpagefooter";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";

const fetchAccountData = async () => {
  try {
    const token = localStorage.getItem('at');

    if (!token) {
      throw new Error("No authentication token found in localStorage");
    }

    const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/read", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch account data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching account data:", error);
    throw error;
  }
};


const uploadProfilePicture = async (file) => {
  try {
    const token = localStorage.getItem("at");
    if (!token) throw new Error("No authentication token found");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/uploadPic", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload profile picture");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading profile picture:", error.message);
    throw error;
  }
};




const AvatarSelector = ({ isOpen, onClose, setProfilePicture }) => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Reset selected avatar
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      if (!isOpen) return;

      try {
        const token = localStorage.getItem("at");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/avatar", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch avatars: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid avatar data format");

        setAvatars(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching avatars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, [isOpen]);

  const handleAvatarSelect = async (avatar) => {
    try {
      console.log("Selected Avatar ID:", avatar.id);

      const token = localStorage.getItem("at");
      if (!token) throw new Error("No authentication token found");

      const formData = new FormData();
      formData.append("id", avatar.id);

      const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/uploadPic", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading avatar:", errorData);
        throw new Error(errorData.msg || "Failed to upload avatar");
      }

      const data = await response.json();
      console.log("Avatar Uploaded Successfully:", data);

      setProfilePicture(data.url);
      onClose();
    } catch (error) {
      console.error("Error uploading avatar:", error.message);
    }
  };

  const handleRemove = () => {

    setUploadedAvatar(null);
    setSelectedAvatar(null);
    setProfilePicture(null);
    localStorage.removeItem("profilePicture");
    console.log("Avatar removed successfully");
    onClose();
  };


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const token = localStorage.getItem("at");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/uploadPic", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error uploading image:", errorData);
          throw new Error(errorData.msg || "Failed to upload image");
        }

        const data = await response.json();
        console.log("Image Uploaded Successfully:", data);

        setUploadedAvatar(data.url);
        setProfilePicture(data.url);
        setSelectedAvatar(null);
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };

  const handleSelect = async () => {
    try {
      let avatarToUpload = uploadedAvatar || (selectedAvatar && selectedAvatar.url);

      if (!avatarToUpload) {
        console.log("No avatar selected.");
        return;
      }

      if (selectedAvatar && !uploadedAvatar) {
        const token = localStorage.getItem("at");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const formData = new FormData();
        formData.append("id", selectedAvatar.id);

        const response = await fetch("https://znginx.perisync.work/api/v1/acc/account/uploadPic", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error uploading avatar:", errorData);
          throw new Error(errorData.msg || "Failed to upload avatar");
        }

        const data = await response.json();
        console.log("Avatar Uploaded Successfully:", data);

        setProfilePicture(data.url);
        localStorage.setItem("profilePicture", data.url);
      } else if (uploadedAvatar) {
        setProfilePicture(uploadedAvatar);
        localStorage.setItem("profilePicture", uploadedAvatar);
      }

      onClose();
    } catch (error) {
      console.error("Error in handleSelect:", error.message);
    }
  };


  useEffect(() => {

    if (isOpen) {
      setSelectedAvatar(null);
      setUploadedAvatar(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white flex flex-col justify-between rounded-lg h-[500px] w-[500px] p-4">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-lg font-semibold">Choose your Avatar</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-4">
            <CircularProgress size={40} thickness={4} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <div className="flex gap-4">
            {/*Selected avatar and Remove option */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div
                className={`w-32 h-32 rounded-lg border ${!selectedAvatar && !uploadedAvatar ? "border-gray-500" : "border-gray-200"
                  } flex items-center justify-center cursor-pointer overflow-hidden`}
                onClick={handleRemove}
              >
                {uploadedAvatar ? (
                  <img
                    src={uploadedAvatar}
                    alt="Uploaded Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : selectedAvatar ? (
                  <img
                    src={selectedAvatar.url}
                    alt={selectedAvatar.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src="/default-avatar.png" alt="Default Preview" className="w-full h-full object-cover" />
                )}
              </div>
              <div
                className="w-32 h-32 flex flex-col items-center justify-center cursor-pointer"
                onClick={handleRemove}
              >
                <span className=" flex gap-2 py-4 text-[18px] font-semibold">Preview</span>
                <div className="text-white font-semibold text-[18px] px-4 py-2 bg-red-500 rounded-xl flex items-center gap-2">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144M7 6v13z" />
                    </svg>
                  </div>
                  <div><span>Remove</span></div>
                </div>

              </div>
            </div>

            {/*  Available avatars */}
            <div className="flex flex-wrap gap-4">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`w-24 h-24 rounded-lg p-4${selectedAvatar?.id === avatar.id ? "border-blue-500" : "border-gray-200"
                    } flex items-center justify-center cursor-pointer overflow-hidden`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {/* upload image */}
              <div className="w-24 h-24 rounded-lg border-2 border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0"
                  onChange={handleFileChange}
                />
                <span className="text-xl font-semibold text-gray-500">+</span>
              </div>
            </div>
          </div>
        )}


        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-3 py-1 text-red-500 font-medium">
            Cancel
          </button>
          {(selectedAvatar || uploadedAvatar) && (
            <button
              onClick={handleSelect}
              className="px-5 py-2 bg-indigo-500 text-white rounded-lg font-medium"
            >
              Save
            </button>
          )}
        </div>

      </div>
    </div>
  );
};


const Account = ({ onEdit, onRequestDelete }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
  });

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNo: user?.phoneNo || "",
    });
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSave = async () => {
  //   try {
  //     const token = localStorage.getItem("at"); // Get authentication token from localStorage

  //     const response = await fetch(
  //       "https://znginx.perisync.work/api/v1/acc/account/update",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${token}`
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("Profile updated successfully");
  //     } else {
  //       console.error("Failed to update profile");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  //   setIsEditing(false);
  // };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("at");

      const response = await fetch(
        "https://znginx.perisync.work/api/v1/acc/account/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchAccountData();
        setUser(data);


        if (data.profilePictureUrl) {
          setProfilePicture(data.profilePictureUrl);
          localStorage.setItem("profilePicture", data.profilePictureUrl);
        } else {
          const storedProfilePic = localStorage.getItem("profilePicture");
          if (storedProfilePic) {
            setProfilePicture(storedProfilePic);
          }
        }
        setError(null);
      } catch (error) {
        console.error("Failed to load user data");
        setError("Failed to load user data. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);



  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <CircularProgress size={50} thickness={4} />
  //     </div>
  //   );
  // }



  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadProfilePicture(file);
      if (response.profilePictureUrl) {
        setProfilePicture(response.profilePictureUrl);
        localStorage.setItem("profilePicture", response.profilePictureUrl); // Save to localStorage
        const userData = await fetchAccountData();
        setUser(userData);
      }
    } catch (error) {
      setError("Failed to upload profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const handleAvatarSelect = (avatarUrl) => {
    setProfilePicture(avatarUrl);
  };





  return (
    <div className="bg-white h-screen">

      <header className="top-0 left-0 sticky z-10 bg-white">
        <Navbar />
      </header>

      {loading ? (
        <div className="flex justify-center h-[700px] items-center py-4">
          <CircularProgress size={40} thickness={4} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <section className="px-4">
          <div className="flex flex-wrap justify-between items-center w-full lg:max-w-[1550px] mx-auto  my-10">
            <div className="flex items-center space-y-5 gap-4 pb-4">
              <div className="relative flex items-center justify-center mt-5 group">
                {/* Avatar Container */}
                <div
                  className="w-20 md:w-28 h-20 md:h-28 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-200 p-1 relative"
                  onClick={() => setIsAvatarSelectorOpen(true)}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-2xl">👤</span>
                  )}


                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 mr-1"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M11.5 8C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9M5 5h2l2-2h5l2 2h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m4.41-1l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.41l-2-2z" />
                    </svg>

                    <span className="text-[16px]">Select</span>
                  </div>
                </div>


                <label
                  className="absolute top-0 right-1 p-1 cursor-pointer "
                  onClick={() => setIsAvatarSelectorOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <g>
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </g>
                  </svg>
                </label>
              </div>


              <div>

                <p className="text-gray-500 text-xs md:text-sm">
                  {user?.email?.toUpperCase()}
                </p>

                <h2 className="text-xl font-semibold">
                  {user ? `${user.firstName} ${user.lastName}` : "User Name"}
                </h2>
              </div>
            </div>
            <div>
              <p className="text-indigo-500 border rounded-full p-2">
                Joined on: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
          </div>



          {/* profile details */}
          <div className="w-full lg:max-w-[1550px] mx-auto space-y-4 px-5 py-4 border rounded-xl">
            <div className="flex justify-between border-b py-2">
              <p className="font-semibold text-[20px]">Profile Information</p>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="ml-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl"
                >
                  Edit
                </button>
              ) : null}
            </div>

            {/* First Name */}
            <div className="flex items-center gap-5 pb-2 border-b">
              {!isEditing && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="text-gray-400 h-8 w-8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5m-4 0V5a2 2 0 1 1 4 0v1m-4 0a2 2 0 1 0 4 0m-5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 0 0-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
              )}

              {/* Edit Mode */}
              {isEditing ? (
                <div className="flex items-center gap-3 w-full">
                  <label htmlFor="firstName" className="text-gray-600 w-24">
                    First Name
                  </label>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="filled"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: errors.phoneNo ? "red" : "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        transition: "border-color 0.3s ease",
                      },
                      "& .MuiInputBase-root:hover": {

                        backgroundColor: "#F8F8F8",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: errors.phoneNo ? "red" : "#1976D2",
                        backgroundColor: "white",
                      },
                      "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                        display: "none",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col pb-2">
                  <span className="text-gray-600">First Name</span>
                  <span className="font-medium text-gray-900">{formData.firstName}</span>
                </div>
              )}
            </div>


            {/* Last Name */}
            <div className="flex items-center gap-5 pb-2 border-b">
              {!isEditing && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="text-gray-400 h-8 w-8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5m-4 0V5a2 2 0 1 1 4 0v1m-4 0a2 2 0 1 0 4 0m-5 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 0 0-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
              )}

              {/* Edit Mode  */}
              {isEditing ? (
                <div className="flex items-center gap-3 w-full ">
                  <label htmlFor="lastName" className="text-gray-600 w-24">
                    Last Name
                  </label>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="filled"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: errors.phoneNo ? "red" : "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        transition: "border-color 0.3s ease",
                      },
                      "& .MuiInputBase-root:hover": {

                        backgroundColor: "#F8F8F8",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: errors.phoneNo ? "red" : "#1976D2",
                        backgroundColor: "white",
                      },
                      "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                        display: "none",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col pb-2">
                  <span className="text-gray-600">Last Name</span>
                  <span className="font-medium text-gray-900">{formData.lastName}</span>
                </div>
              )}
            </div>



            {/* Email */}
            <div className="flex items-center gap-5 pb-2 border-b">
              {!isEditing && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="text-gray-400 h-8 w-8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-.67 2L12 10.75L5.67 6ZM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2a1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1"
                    />
                  </svg>
                </div>
              )}

              {/* Edit Mode  */}
              {isEditing ? (
                <div className="flex items-center gap-3 w-full">
                  <label htmlFor="email" className="text-gray-600 w-24">
                    Email
                  </label>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    variant="filled"
                    value={formData.email}
                    disabled
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "#F8F8F8",
                        cursor: "not-allowed",
                      },
                      "& .MuiInputBase-root:hover": {
                        borderColor: "#BEBEBE",
                        backgroundColor: "#F8F8F8",
                      },
                      "& .MuiInputBase-root.Mui-disabled": {
                        color: "gray",
                        "-webkit-text-fill-color": "gray",
                      },
                      "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                        display: "none",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium text-gray-900">{formData.email}</span>
                </div>
              )}
            </div>



              {/* mobile number */}
            <div className="flex items-center gap-5 pb-2 border-b">
              {!isEditing && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="text-gray-400 h-8 w-8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M4 23v-2h16v2zM4 3V1h16v2zm8 10q1.25 0 2.125-.875T15 10t-.875-2.125T12 7t-2.125.875T9 10t.875 2.125T12 13m-8 7q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm1.75-2q1.125-1.4 2.725-2.2T12 15t3.525.8T18.25 18H20V6H4v12zm2.95 0h6.6q-.725-.5-1.562-.75T12 17t-1.737.25T8.7 18m3.3-7q-.425 0-.712-.288T11 10t.288-.712T12 9t.713.288T13 10t-.288.713T12 11m0 1"
                    />
                  </svg>
                </div>
              )}

              {/* Edit Mode */}
              {isEditing ? (
                <div className="flex items-center gap-3 w-full">
                  <label htmlFor="phoneNo" className="text-gray-600 w-24">
                    Contact No.
                  </label>
                  <TextField
                    fullWidth
                    id="phoneNo"
                    label="phoneNo"
                    variant="filled"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    error={!!errors.phoneNo}
                    helperText={errors.phoneNo}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "3px solid",
                        borderColor: errors.phoneNo ? "red" : "#F8F8F8",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        transition: "border-color 0.3s ease",
                      },
                      "& .MuiInputBase-root:hover": {

                        backgroundColor: "#F8F8F8",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: errors.phoneNo ? "red" : "#1976D2",
                        backgroundColor: "white",
                      },
                      "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after": {
                        display: "none",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col pb-2">
                  <span className="text-gray-600">Contact Number</span>
                  <span className="font-medium text-gray-900">{formData.phoneNo}</span>
                </div>
              )}
            </div>



            {/* Account Type  */}
            {!isEditing && (
              <div className="flex items-center gap-5 pb-2">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-gray-400 h-8 w-8" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.25a3.75 3.75 0 1 1 3.75-3.75A3.75 3.75 0 0 1 12 12.25m0-6a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 12 6.25m7 13a.76.76 0 0 1-.75-.75c0-1.95-1.06-3.25-6.25-3.25s-6.25 1.3-6.25 3.25a.75.75 0 0 1-1.5 0c0-4.75 5.43-4.75 7.75-4.75s7.75 0 7.75 4.75a.76.76 0 0 1-.75.75" /></svg>
                </div>
                <div className="flex flex-col pb-2">
                  <span>Account Type</span>
                  <span className="font-medium text-gray-900">{user?.accountType}</span>
                </div>
              </div>
            )}

            {/* Last Login */}
            {!isEditing && (
              <div className="flex items-center gap-5 pb-2">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-gray-400 h-8 w-8" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.25a3.75 3.75 0 1 1 3.75-3.75A3.75 3.75 0 0 1 12 12.25m0-6a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 12 6.25m7 13a.76.76 0 0 1-.75-.75c0-1.95-1.06-3.25-6.25-3.25s-6.25 1.3-6.25 3.25a.75.75 0 0 1-1.5 0c0-4.75 5.43-4.75 7.75-4.75s7.75 0 7.75 4.75a.76.76 0 0 1-.75.75" /></svg>
                </div>
                <div className="flex flex-col pb-2">
                  <span>Last Login</span>
                  <span className="font-medium text-gray-900">{user?.metaData?.lastLogin?.time ? new Date(user.metaData.lastLogin.time).toLocaleString() : ""}</span>
                </div>
              </div>
            )}

            {/*  Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-6 py-2 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                >
                  {loading ? (
                    <CircularProgress size={20} thickness={2} style={{ color: 'white' }} />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="my-6 p-4 space-y-4 border rounded-xl w-full lg:max-w-[1550px] mx-auto ">
            <h3 className="text-lg font-semibold border-b pb-4">Delete your Account</h3>
            <p className="text-gray-600 text-[18px] mt-1">
              Deleting your Zunoy account is a permanent action that will result in the deletion of all your data across Zunoy products. If you’re sure about proceeding, click the button below to request deletion. Once proceeded, our team will contact you to discuss your request and understand your decision before finalizing the process.
            </p>
            <button onClick={onRequestDelete} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600">
              Request Account Deletion
            </button>
          </div>
        </section>
      )}
      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        onSelect={handleAvatarSelect}
        setProfilePicture={setProfilePicture}
      />

      <footer className="mx-auto max-w-[1620px]">
        <Mainpagefooter />
      </footer>


    </div>
  );
};

export default Account;