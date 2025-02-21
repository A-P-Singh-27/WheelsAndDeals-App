import React from 'react'

export default function Description({carDetail}) {
  return (
    <div>
       {carDetail?.listingDescription? <div className='p-10 bg-white rounded-xl shadow-md mt-6 border'>
            <h2 className='my-2 font-medium text-2xl'>Description</h2>
            <p>{carDetail?.listingDescription}</p>
        </div>:
        <div className='w-full mt-7 h-[100px] bg-slate-200 animate-pulse rounded-xl'></div>
       }
    </div>
  )
}
