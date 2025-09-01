import React from 'react'
import { Link } from 'react-router-dom'


function preminum() {
  return (
    <>
        <div className="bg-gradient-to-b from-[#b89b9e] to-[#0e0e0e] text-white p-10 text-center min-h-screen">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Listen without limits.<br />
                Try 1 month of Premium<br />
                for free.
            </h1>
            <p className="text-base md:text-lg mt-4 text-gray-200">Only $4999/-month after. Cancel anytime.</p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <button className="bg-[#20E863] rgba(15, 163, 65, 1) hover:bg-white text-black font-semibold py-2 px-6 rounded-full"> Try Free For 1 Month</button>
                <button className="border border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition"> View All Premium Plans</button>
            </div>
              <Link to='/Home'>
                <button className="border border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-[#20E863] rgba(15, 163, 65, 1) hover:text-black transition mt-5"> Back To Home</button>
              </Link>
        </div>
    </>    
  )
}

export default preminum
