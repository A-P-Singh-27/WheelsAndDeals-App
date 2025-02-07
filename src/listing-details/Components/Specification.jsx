import IconField from '@/add-listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

export default function Specification({carDetail}) {
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='font-medium justify-self-center text-2xl'>Specifications</h2>
        {carDetail?CarSpecification.map((item,index)=>(
            <div className='mt-5 flex justify-between items-center flex-wrap'>
                <h2>{item.name}</h2>
                <h2>{carDetail?.[item.name]}</h2>
            </div>
        )):
            <div className='w-full h-[500px] bg-slate-200 animate-pulse'></div>
        }
        
    </div>
  )
}
