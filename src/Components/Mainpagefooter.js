import React from 'react';

function Mainpagefooter() {
  return (
    <footer className="flex flex-wrap justify-center lg:justify-between gap-4 items-center mx-auto max-w-[1550px] px-6 py-2 border-t">
   
      <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-indigo-500">
        <a href="#">Zunoy.com</a>
        <hr className="w-px h-4 bg-gray-100" />
        <a href="#">Terms of Service</a>
        <hr className="w-px h-4 bg-gray-100" />
        <a href="#">Privacy Policy</a>
        <hr className="w-px h-4 bg-gray-100" />
        <a href="#">Cookies Policy</a>
      </div>

      <div className="text-sm text-black">
        <span>© 2025 | Zunoy | All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Mainpagefooter;
