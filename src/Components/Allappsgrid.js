import React from "react";
import ComingSoonCard from "./Comingsooncards";

const products = [
    {
      id: 1,
      name: "FormFlow",
      description:
        "Zoop Forms allows users to create custom API endpoints for secure form submission and data collection.",
      badge: "NEW",
      tag: "Free",
      icon: "https://account.zunoy.com/images/zoopform.svg",
    },
    {
      id: 2,
      name: "MockAPI",
      description: "Zoop API lets you modify request and responses of the APIs.",
      badge: "NEW",
      tag: "Free",
      icon: "https://account.zunoy.com/images/zoopapi.svg",
    },
    {
      id: 3,
      name: "WatchTower",
      description:
        "Your complete solution for monitoring site performance, managing incidents, and ensuring optimal uptime.",
      badge: "NEW",
      tag: "Free",
      icon: "https://account.zunoy.com/images/zooptime.svg",
    },
  ];
  
  const Allappsgrid = () => {
    return (
      <div className="mx-auto max-w-[1550px] p-6 mt-10">
        <h2 className="text-[28px] font-bold mb-6">Our Products</h2>
  
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-white p-8 flex flex-col justify-between rounded-lg border h-auto lg:h-[450px]"
            >
              {/* Dynamic Badge */}
              {product.badge && (
                <span className="absolute top-0 right-0 bg-green-600 text-white px-3 py-[2px] rounded-bl-lg rounded-tr-lg text-sm">
                  {product.badge}
                </span>
              )}
  
              {/* Product Info (Flexible Height) */}
              <div className="mt-5 flex-grow">
                <div className="flex items-center gap-4">
                  <img src={product.icon} alt={product.name} className="w-10 h-10" />
                  <h3 className="font-semibold text-[20px]">{product.name}</h3>
                  <span className="bg-gray-300 px-3 py-[2px] rounded-full">
                    {product.tag}
                  </span>
                </div>
  
                <p className="text-black text-[18px] mt-2">{product.description}</p>
              </div>
  
              {/* Button and Links (Fixed Position) */}
              <div className=" flex flex-col items-start gap-3">
                <button className="bg-indigo-500 text-white px-4 py-2 mt-4 lg:mt-0 mb-5 rounded-xl w-24">
                  Try Now
                </button>
  
                <div className="flex flex-col text-gray-500 underline space-y-1">
                  <a href="#">Read more</a>
                  <a href="#">Documentation</a>
                  <a href="#">Raise a Ticket</a>
                </div>
              </div>
            </div>
          ))}
  
          {/* Coming Soon Card */}
          <ComingSoonCard />
        </div>
      </div>
    );
  };
  
  export default Allappsgrid;
  