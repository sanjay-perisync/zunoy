import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Leftlogin() {
  return (
    <div className='flex flex-col justify-center lg:justify-between py-4 min-h-screen '>
       {/* <header className='pt-4 pl-6 hidden lg:flex'>
        <img src='/images/image 314.svg' alt='' className='object-cover h-10'></img>
       </header> */}
        <Header/>


        <section className='mx-auto max-w-4xl space-y-4 mb-10 px-5'>
            <div className='text-3xl font-bold'>Accounts</div>
            <p className='text-gray-400 text-[18px]'>
            Zunoy Accounts is a secure and efficient account management system designed to streamline user authentication, preferences, and access control. It offers seamless integration with various platforms, ensuring a smooth user experience with features like dark mode preferences, API-based authentication, and enhanced security protocols.
            </p>
            <h5 className='text-3xl font-bold pt-5'>
            Featured Products
            </h5>

            <div className='flex flex-wrap gap-4 '>
                <button className='flex border rounded-lg items-center space-x-2 px-5 py-4 w-[180px]'>
                    <img src='https://account.zunoy.com/images/zoopform.svg' alt=''></img>
                    <p className='font-bold'>FormFlow</p>
                </button>
                <button className='flex border rounded-lg items-center space-x-2  px-5 py-4 w-[180px]'>
                    <img src='https://account.zunoy.com/images/zooptime.svg' alt=''></img>
                    <p className='font-bold'>WatchTower</p>
                </button>
                <button className='flex border rounded-lg items-center space-x-2  px-5 py-4 w-[180px]'>
                    <img src='https://account.zunoy.com/images/zoopapi.svg' alt=''></img>
                    <p className='font-bold'>MockAPI</p>
                </button>
            </div>
        </section>



        {/* <footer className='text-center text-gray-500 text-[16px]'>
          <p>© 2025, Zunoy Pvt. Ltd. All Rights Reserved.</p>
        </footer> */}

        <Footer/>
        </div>
  )
}

export default Leftlogin;