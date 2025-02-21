import React from 'react';
import { useState } from "react";
import ThemeToggle from './ThemeToggle';
import LogoutPopup from './Logout';


function Navbar() {
  const [active, setActive] = useState("All apps");
  return (
    <div className=''>


      <header className="  text-black">

        {/* top header */}
        <div className="px-6 py-4 flex justify-between items-center border-b">
          {/* Left Side  */}
          <div className="flex items-center gap-4">
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" className='flex lg:hidden text-gray-500 h-8' focusable="false" aria-hidden="true" viewBox="0 0 24 24"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 6h18M3 18h18"></path></svg></svg>
            <svg width="24" height="24" className='hidden lg:flex' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path d="M2.46466 0.0686505L9.61466 1.98508C11.069 2.37503 11.556 4.1928 10.4913 5.25734L5.25666 10.4913C4.19166 11.5562 2.37366 11.0689 1.984 9.61446L0.0686637 2.46402C-0.321003 1.00953 1.01033 -0.320967 2.46466 0.0686505Z" fill="#7A00FF" />
                <path d="M21.5353 0.0686505L14.3853 1.98508C12.931 2.37503 12.444 4.1928 13.5087 5.25734L18.7433 10.4913C19.8083 11.5562 21.6263 11.0689 22.016 9.61446L23.9313 2.46402C24.321 1.00953 22.9897 -0.320967 21.5353 0.0686505Z" fill="#F9464C" />
                <path d="M2.46466 23.931L9.61466 22.0146C11.069 21.6246 11.556 19.8069 10.4913 18.7423L5.25666 13.5083C4.19166 12.4435 2.37366 12.9307 1.984 14.3852L0.0686637 21.536C-0.321003 22.9905 1.01033 24.321 2.46466 23.931V23.931Z" fill="#088BF5" />
                <path d="M21.5353 23.931L14.3853 22.0146C12.931 21.6246 12.444 19.8069 13.5087 18.7423L18.7433 13.5083C19.8083 12.4435 21.6263 12.9307 22.016 14.3852L23.9313 21.5356C24.321 22.9901 22.9897 24.3206 21.5353 23.931Z" fill="#1AD3BB" />
              </g>
            </svg>
            <h6 className="text-xl font-semibold hidden lg:flex">Zunoy Accounts</h6>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-8">
          
            <ThemeToggle/>
            <svg className="w-7 h-7 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" strokeWidth="2" d="M8.7449 20.1c.6346.5601 1.4682.9 2.3812.9.913 0 1.7466-.3399 2.3813-.9m3.0187-11.7a5.4 5.4 0 1 0-10.8 0c0 2.7812-.7016 4.6854-1.4853 5.9449-.661 1.0624-.9916 1.5936-.9795 1.7418.0134.1641.0482.2266.1804.3247.1194.0886.6578.0886 1.7344.0886h11.9c1.0767 0 1.615 0 1.7344-.0886.1322-.0981.167-.1606.1804-.3247.0121-.1482-.3184-.6794-.9795-1.7418-.7837-1.2595-1.4853-3.1637-1.4853-5.9449Z" />
            </svg>
            <div className='bg-gray-200 rounded-full p-1'>
              <svg className="w-7 h-7 text-black " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeWidth="2" d="M20 21c0-1.3956 0-2.0933-.1722-2.6611a4.0002 4.0002 0 0 0-2.6667-2.6667C16.5933 15.5 15.8956 15.5 14.5 15.5h-5c-1.3956 0-2.0934 0-2.6611.1722a4.0001 4.0001 0 0 0-2.6667 2.6667C4 18.9067 4 19.6044 4 21M16.5 7.5c0 2.4853-2.0147 4.5-4.5 4.5S7.5 9.9853 7.5 7.5 9.5147 3 12 3s4.5 2.0147 4.5 4.5Z" />
              </svg>
            </div>

          </div>
        </div>


        {/* bottom navbar */}
        <nav className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b">
          {/* Left Section */}
          <div className="flex items-center space-x-6">


            {/* All apps */}
            <button
              onClick={() => setActive("All apps")}
              className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${active === "All apps" ? "bg-gray-200" : ""
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${active === "All apps" ? "text-indigo-500" : "text-gray-400"
                  }`}
                width="18"
                height="20"
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
              <span className={`font-semibold text-[16px] ${active === "All apps" ? "text-black" : "text-slate-600"}`}>
                All apps
              </span>

            </button>

            {/* Account */}
            <button
              onClick={() => setActive("Account")}
              className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${active === "Account" ? "bg-gray-200" : ""
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${active === "Account" ? "text-indigo-500" : "text-gray-400"
                  }`}
                width="18"
                height="18"
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
              <span className={`font-semibold text-[16px] ${active === "Account" ? "text-black" : "text-slate-600"}`}>
                Account
              </span>

            </button>

            {/* Billing */}
            <button
              onClick={() => setActive("Billing")}
              className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${active === "Billing" ? "bg-gray-200" : ""
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${active === "Billing" ? "text-indigo-500" : "text-gray-400"
                  }`}
                width="18"
                height="18"
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
              <span className={`font-semibold text-[16px] ${active === "Billing" ? "text-black" : "text-slate-600"}`}>
                Billing
              </span>

            </button>

            {/* Security */}
            <button
              onClick={() => setActive("Security")}
              className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${active === "Security" ? "bg-gray-200" : ""
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${active === "Security" ? "text-indigo-500" : "text-gray-400"
                  }`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span className={`font-semibold text-[16px] ${active === "Security" ? "text-black" : "text-slate-600"}`}>
                Security
              </span>

            </button>

            {/* Support */}
            <button
              onClick={() => setActive("Support")}
              className={`flex items-center space-x-4 px-3 py-1.5 rounded-lg font-semibold ${active === "Support" ? "bg-gray-200" : ""
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${active === "Support" ? "text-indigo-500" : "text-gray-400"
                  }`}
                width="18"
                height="18"
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
              <span className={`font-semibold text-[16px] ${active === "Support" ? "text-black" : "text-slate-600"}`}>
                Support
              </span>

            </button>
          </div>

          {/* Right Section */}
          {/* <button className="flex items-center space-x-2 px-4 py-2 text-red-500 border border-red-300 rounded-xl hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className='font-semibold text-[16px] '>Logout</span>
          </button> */}
          <LogoutPopup/>
        </nav>

      </header>

    </div>
  )
}

export default Navbar;