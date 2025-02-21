import React from 'react'
import Search from './Search'

function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-20 gap-6 md:h-[650px] h-fit w-full bg-[#eef0fc]'>
                <h2 className='text-lg'>Find cars for sale and for rent near you</h2>
                <h2 className='text-[60px] font-bold'>Find Your Dream Car</h2>

                <Search />
                <img src="/tesla.png" alt="" className='mt-10'/>
            </div>
        </div>
    )
}

export default Hero