// import React from "react";
// import { Avatar, AvatarGroup } from "@mui/material";

// const products = [
//   {
//     id: 1,
//     name: "FormFlow",
//     description:
//       "Zoop Forms allows users to create custom API endpoints for secure form submission and data collection.",
//     badge: "NEW",
//     tag: "Free",
//     icon: "https://account.zunoy.com/images/zoopform.svg",
//   },
//   {
//     id: 2,
//     name: "MockAPI",
//     description: "Zoop API lets you modify request and responses of the APIs.",
//     badge: "NEW",
//     tag: "Free",
//     icon: "https://account.zunoy.com/images/zoopapi.svg",
//   },
//   {
//     id: 3,
//     name: "WatchTower",
//     description:
//       "Your complete solution for monitoring site performance, managing incidents, and ensuring optimal uptime.",
//     badge: "NEW",
//     tag: "Free",
//     icon: "https://account.zunoy.com/images/zooptime.svg",
//   },
// ];

// const Allappsgrid = () => {
//   return (
//     <div className="mx-auto max-w-[1550px] p-6 mt-10">
//       <h2 className="text-[28px] font-bold mb-6">Our Products</h2>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="relative bg-white p-8 flex flex-col justify-between rounded-lg border h-auto lg:h-[450px]"
//           >
//             {/* Dynamic Badge */}
//             {product.badge && (
//               <span className="absolute top-0 right-0 bg-green-600 text-white px-3 py-[2px] rounded-bl-lg rounded-tr-lg text-sm">
//                 {product.badge}
//               </span>
//             )}

//             {/* Product Info (Flexible Height) */}
//             <div className="mt-5 flex-grow">
//               <div className="flex items-center gap-4">
//                 <img src={product.icon} alt={product.name} className="w-10 h-10" />
//                 <h3 className="font-semibold text-[20px]">{product.name}</h3>
//                 <span className="bg-gray-300 px-3 py-[2px] rounded-full">
//                   {product.tag}
//                 </span>
//               </div>

//               <p className="text-black text-[18px] mt-2">{product.description}</p>
//             </div>

//             {/* Button and Links (Fixed Position) */}
//             <div className=" flex flex-col items-start gap-3">
//               <button className="bg-indigo-500 text-white px-4 py-2 mt-4 lg:mt-0 mb-5 rounded-xl w-24">
//                 Try Now
//               </button>

//               <div className="flex flex-col text-gray-500 underline space-y-1">
//                 <a href="#">Read more</a>
//                 <a href="#">Documentation</a>
//                 <a href="#">Raise a Ticket</a>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Coming Soon Card */}
//         <div className="bg-white p-10 rounded-lg space-y-3 border flex flex-col items-center justify-center h-auto">
//           <h3 className="text-red-500 font-semibold text-xl">Coming Soon</h3>
//           <p className="text-gray-600 text-center text-[18px]">
//             We're cooking something special...
//           </p>

//           {/* Icons Section */}
//           <div className="flex mt-3 items-center">
//             <AvatarGroup max={5}>
//               <img
//                 src="https://account.zunoy.com/images/zoopshare.svg"
//                 alt="Icon 1"
//                 className="w-11 h-11 rounded-full border border-gray-200 p-1 shadow-lg relative z-100"
//               />

//               <Avatar
//                 alt="Travis Howard"
//                 src="https://account.zunoy.com/images/zoopapi.svg"
//                 sx={{
//                   filter: "blur(2px)",
//                   boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
//                 }}
//               />
//               <Avatar
//                 alt="Cindy Baker"
//                 src="https://account.zunoy.com/images/zoopshare.svg"
//                 sx={{
//                   filter: "blur(2px)",
//                   boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
//                 }}
//               />
//               <Avatar
//                 alt="Cindy Baker"
//                 src="https://account.zunoy.com/images/zoopshare.svg"
//                 sx={{
//                   filter: "blur(2px)",
//                   boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
//                 }}
//               />

//             </AvatarGroup>

//             <span className="ml-3 text-gray-500 font-medium text-lg">+3</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Allappsgrid;
