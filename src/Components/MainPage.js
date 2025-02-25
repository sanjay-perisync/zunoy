import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Mainpagefooter from './Mainpagefooter';
import { Avatar, AvatarGroup, Skeleton } from "@mui/material";
import { fetchProducts } from '../APIconfig/getAPIconfig';

const badgeImage = "https://dev-account.zoop360.com/images/newbannerlogo.svg";


const productLogos = [
  "https://account.zunoy.com/images/zoopform.svg",
  "https://account.zunoy.com/images/zoopapi.svg",
  "https://account.zunoy.com/images/zooptime.svg"
];

function MainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <header className='top-0 left-0 sticky z-10 bg-white'>
        <Navbar />
      </header>

      <section>
        <div className="mx-auto max-w-[1550px] p-6 mt-10">
          <h2 className="text-[28px] font-bold mb-6">Our Products</h2>

          {loading ? (
            /* Skeleton Loader Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array(4).fill().map((_, index) => (
                <div key={index} className="bg-white p-8 rounded-lg border h-[450px]">
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <div className="mt-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="60%" height={30} className="mt-2" />
                    <Skeleton variant="text" width="80%" height={20} className="mt-2" />
                  </div>
                  <Skeleton variant="rectangular" width="100px" height={40} className="mt-4" />
                </div>
              ))}
              {/* Skeleton for Coming Soon Card */}
              <div className="bg-white p-10 rounded-lg border h-[450px] flex flex-col justify-center items-center">
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="text" width={200} height={20} className="mt-2" />
                <Skeleton variant="circular" width={50} height={50} className="mt-3" />
              </div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              Error loading products: {error}
            </div>
          ) : (
            /* Product Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <div key={product.id} className="relative bg-white p-8 flex flex-col justify-between rounded-lg border h-[450px]">

                  <img
                    src={badgeImage}
                    alt="New Badge"
                    className="absolute translate-x-[4px] top-0 right-0 w-[80px] h-[30px]"
                  />

                  {/* Product Info */}
                  <div className="mt-5 flex-grow">
                    <div className="flex items-center gap-4">
                      <img src={productLogos[index % productLogos.length]} alt={product.name} className="w-10 h-10" />
                      <h3 className="font-semibold text-[20px]">{product.name}</h3>
                      <span className="bg-gray-300 px-3 py-[2px] rounded-full">
                        {product.tierInfo?.name || "Free"}
                      </span>
                    </div>

                    <p className="text-black text-[18px] mt-2">{product.description}</p>
                  </div>

                  {/* Button and Links */}
                  <div className="flex flex-col items-start gap-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-500 text-white px-4 py-2 mt-4 lg:mt-0 mb-5 rounded-xl w-24 text-center"
                    >
                      Try Now
                    </a>

                    <div className="flex flex-col text-gray-500 underline space-y-1">
                      <a href={"#"}>Read more</a>
                      <a href={"#"}>Documentation</a>
                      <a href={"#"}>Raise a Ticket</a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coming Soon Card */}
              <div className="bg-white p-10 rounded-lg border flex flex-col items-center justify-center h-[450px]">
                <h3 className="text-red-500 font-semibold text-xl">Coming Soon</h3>
                <p className="text-gray-600 text-center text-[18px]">
                  We're cooking something special...
                </p>

                {/* Icons Section */}
                <div className="flex mt-3 items-center">
                  <AvatarGroup max={5}>
                    <img
                      src="https://account.zunoy.com/images/zoopshare.svg"
                      alt="Icon 1"
                      className="w-11 h-11 rounded-full border border-gray-200 p-1 shadow-lg relative z-100"
                    />

                    <Avatar
                      alt="Product Icon"
                      src="https://account.zunoy.com/images/zoopapi.svg"
                      sx={{
                        filter: "blur(2px)",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Avatar
                      alt="Product Icon"
                      src="https://account.zunoy.com/images/zoopshare.svg"
                      sx={{
                        filter: "blur(2px)",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Avatar
                      alt="Product Icon"
                      src="https://account.zunoy.com/images/zoopshare.svg"
                      sx={{
                        filter: "blur(2px)",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </AvatarGroup>

                  <span className="ml-3 text-gray-500 font-medium text-lg">+3</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <Banner />
      </section>

      <footer>
        <Mainpagefooter />
      </footer>
    </div>
  );
}

export default MainPage;
