import React from 'react'
import Header from './Header'

function CompleteProfile() {
  return (
    <div>
        
        {/* left section */}

        <section>
        <Header/>

        <div className="mx-auto max-w-xs">
                    <h6 className="text-[20px] font-bold pb-5">
                        Create your Zunoy account in three simple steps
                    </h6>
                    <div className="mt-4 space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-center space-x-2 relative">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full 
        ${otpVerified ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"} text-sm font-medium`}>
                                {otpVerified ? "✔" : "1"}
                            </span>
                            <span className={`${otpVerified ? "text-indigo-600 font-semibold" : "text-gray-900 font-medium"}`}>
                                Email Verification
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>


                        {/* Step 2*/}
                        <div className="flex items-center space-x-2 relative">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full 
            ${otpVerified ? "bg-indigo-600" : "bg-gray-400"} text-white text-sm font-medium`}>
                                2
                            </span>
                            <span className={`${otpVerified ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                Setup Password
                            </span>
                            <div className="absolute left-1 top-7 w-[2px] h-6 bg-gray-300"></div>
                        </div>

                        {/* Step 3*/}
                        <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white text-sm font-medium">
                                3
                            </span>
                            <span className="text-gray-500">Complete your Profile</span>
                        </div>
                    </div>

                </div>
        </section>


        {/* right section */}
    </div>
  )
}

export default CompleteProfile