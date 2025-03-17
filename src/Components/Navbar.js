import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Logout from "./Logout";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const activeTab =
    location.pathname.startsWith("/support") ? "Support" :
    location.pathname === "/account" ? "Account" :
    location.pathname === "/billing" ? "Billing" :
    location.pathname === "/security" ? "Security" :
    location.pathname === "/guestmanagement" ? "Guest Management" :
    "All apps";

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "User";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("email") || "No email available";

    setUserData({ firstName, lastName, email });
  }, []);

  return (
    <header className="text-black">
      {/* Top Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2062_2205)"><path d="M2.46466 0.0686505L9.61466 1.98508C11.069 2.37503 11.556 4.1928 10.4913 5.25734L5.25666 10.4913C4.19166 11.5562 2.37366 11.0689 1.984 9.61446L0.0686637 2.46402C-0.321003 1.00953 1.01033 -0.320967 2.46466 0.0686505Z" fill="#7A00FF"></path><path d="M21.5353 0.0686505L14.3853 1.98508C12.931 2.37503 12.444 4.1928 13.5087 5.25734L18.7433 10.4913C19.8083 11.5562 21.6263 11.0689 22.016 9.61446L23.9313 2.46402C24.321 1.00953 22.9897 -0.320967 21.5353 0.0686505Z" fill="#F9464C"></path><path d="M2.46466 23.931L9.61466 22.0146C11.069 21.6246 11.556 19.8069 10.4913 18.7423L5.25666 13.5083C4.19166 12.4435 2.37366 12.9307 1.984 14.3852L0.0686637 21.536C-0.321003 22.9905 1.01033 24.321 2.46466 23.9313V23.931Z" fill="#088BF5"></path><path d="M21.5353 23.931L14.3853 22.0146C12.931 21.6246 12.444 19.8069 13.5087 18.7423L18.7433 13.5083C19.8083 12.4435 21.6263 12.9307 22.016 14.3852L23.9313 21.5356C24.321 22.9901 22.9897 24.3206 21.5353 23.931Z" fill="#1AD3BB"></path></g><defs><clipPath id="clip0_2062_2205"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
          </button>
          <h6 className="text-xl font-semibold hidden lg:flex">Zunoy Accounts</h6>

          {/* Hamburger Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
            </svg>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <ThemeToggle />

       
          <div className="relative">
            <div className="bg-gray-200 rounded-full p-1 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="none">
                <path stroke="currentColor" strokeWidth="2" d="M20 21c0-1.3956 0-2.0933-.1722-2.6611a4.0002 4.0002 0 0 0-2.6667-2.6667C16.5933 15.5 15.8956 15.5 14.5 15.5h-5c-1.3956 0-2.0934 0-2.6611.1722a4.0001 4.0001 0 0 0-2.6667 2.6667C4 18.9067 4 19.6044 4 21M16.5 7.5c0 2.4853-2.0147 4.5-4.5 4.5S7.5 9.9853 7.5 7.5 9.5147 3 12 3s4.5 2.0147 4.5 4.5Z" />
              </svg>
            </div>

            {isProfileOpen && (
              <div className="absolute w-64 right-0 mt-2 flex flex-col gap-2 items-start bg-white shadow-lg rounded-lg p-3">
                <p className="text-gray-700 font-medium">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-sm text-gray-500">{userData.email}</p>
                <Logout />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-md p-4 absolute top-16 left-0 w-full z-50 h-screen">
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/mainpage" className="block py-2 px-4" onClick={() => setIsMenuOpen(false)}>All apps</Link>
            </li>
            <li>
              <Link to="/account" className="block py-2 px-4" onClick={() => setIsMenuOpen(false)}>Account</Link>
            </li>
            <li>
              <Link to="/billing" className="block py-2 px-4" onClick={() => setIsMenuOpen(false)}>Billing</Link>
            </li>
            <li>
              <Link to="/security" className="block py-2 px-4" onClick={() => setIsMenuOpen(false)}>Security</Link>
            </li>
            <li>
              <Link to="/support" className="block py-2 px-4" onClick={() => setIsMenuOpen(false)}>Support</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center space-x-6">
        
            {/* All Apps */}
            <Link to="/mainpage">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "All apps" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "All apps" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span className={`font-semibold text-[16px] ${activeTab === "All apps" ? "text-black" : "text-slate-600"}`}>
                  All apps
                </span>
              </button>
            </Link>

            {/* Account */}
            <Link to="/account">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "Account" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "Account" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className={`font-semibold text-[16px] ${activeTab === "Account" ? "text-black" : "text-slate-600"}`}>
                  Account
                </span>
              </button>
            </Link>

            {/* Billing */}
            <Link to="/billing">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "Billing" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "Billing" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span className={`font-semibold text-[16px] ${activeTab === "Billing" ? "text-black" : "text-slate-600"}`}>
                  Billing
                </span>
              </button>
            </Link>

            {/* Security */}
            <Link to="/security">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "Security" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "Security" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span className={`font-semibold text-[16px] ${activeTab === "Security" ? "text-black" : "text-slate-600"}`}>
                  Security
                </span>
              </button>
            </Link>

            {/* Support */}
            <Link to="/support">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "Support" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "Support" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span className={`font-semibold text-[16px] ${activeTab === "Support" ? "text-black" : "text-slate-600"}`}>
                  Support
                </span>
              </button>
            </Link>






            <Link to="/guestmanagement">
              <button className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${activeTab === "guestmanagement" ? "bg-gray-200" : ""}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${activeTab === "guestmanagement" ? "text-indigo-500" : "text-gray-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                
                <span className={`font-semibold text-[16px] ${activeTab === "guestmanagement" ? "text-black" : "text-slate-600"}`}>
                  Guest Management
                </span>
              </button>
            </Link>
          </div>

      </nav>
    </header>
  );
}

export default Navbar;
