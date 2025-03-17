// import React, { useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
// import Navbar from './Navbar';

// function Hamburger() {
//     const location = useLocation();
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const activeTab =
//         location.pathname.startsWith("/support") ? "Support" :
//         location.pathname === "/account" ? "Account" :
//         location.pathname === "/billing" ? "Billing" :
//         location.pathname === "/security" ? "Security" :
//         location.pathname === "/guestmanagement" ? "GuestManagement" :
//         "All apps";

//     return (
//         <div>
//             {/* Mobile Navigation */}
//             <div className="lg:hidden">
//                 <Navbar onClick={toggleMenu} />
//             </div>

//             {/* Mobile Menu */}
//             {isMenuOpen && (
//                 <div className="lg:hidden flex flex-col space-y-4 p-4 bg-white border-b">
//                     <Link to="/mainpage" className={`p-2 rounded-lg ${activeTab === "All apps" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "All apps" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//                                 <line x1="8" y1="21" x2="16" y2="21"></line>
//                                 <line x1="12" y1="17" x2="12" y2="21"></line>
//                             </svg>
//                             <span className="font-semibold text-[16px]">All apps</span>
//                         </div>
//                     </Link>
//                     <Link to="/account" className={`p-2 rounded-lg ${activeTab === "Account" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "Account" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                 <circle cx="12" cy="7" r="4"></circle>
//                             </svg>
//                             <span className="font-semibold text-[16px]">Account</span>
//                         </div>
//                     </Link>
//                     <Link to="/billing" className={`p-2 rounded-lg ${activeTab === "Billing" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "Billing" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
//                                 <line x1="1" y1="10" x2="23" y2="10"></line>
//                             </svg>
//                             <span className="font-semibold text-[16px]">Billing</span>
//                         </div>
//                     </Link>
//                     <Link to="/security" className={`p-2 rounded-lg ${activeTab === "Security" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "Security" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//                             </svg>
//                             <span className="font-semibold text-[16px]">Security</span>
//                         </div>
//                     </Link>
//                     <Link to="/support" className={`p-2 rounded-lg ${activeTab === "Support" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "Support" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <line x1="12" y1="16" x2="12" y2="12"></line>
//                                 <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                             </svg>
//                             <span className="font-semibold text-[16px]">Support</span>
//                         </div>
//                     </Link>
//                     <Link to="/guestmanagement" className={`p-2 rounded-lg ${activeTab === "GuestManagement" ? "bg-gray-200 text-black" : "text-slate-600"}`} onClick={toggleMenu}>
//                         <div className="flex items-center space-x-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${activeTab === "GuestManagement" ? "text-indigo-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <circle cx="12" cy="12" r="10"></circle>
//                                 <line x1="12" y1="16" x2="12" y2="12"></line>
//                                 <line x1="12" y1="8" x2="12.01" y2="8"></line>
//                             </svg>
//                             <span className="font-semibold text-[16px]">Guest Management</span>
//                         </div>
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Hamburger;