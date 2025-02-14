import React from 'react';
import Leftlogin from './Leftlogin';
import Loginform from './Loginform';


function Login() {
  return (
    <div className='flex flex-wrap-reverse lg:flex-nowrap justify-center items-center lg:justify-start lg:items-start '>
  
  
      <div className='lg:w-[1060px] lg:border-r'>
      <Leftlogin/>
      </div>
      <div className='lg:w-[690px] '>
     
      <Loginform/>
      </div>
    </div>
  )
}

export default Login;