import React from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";

export default function Features({ features }) {
    console.log(features);

    return (
        <div className='mt-6'>
            <div className='p-10 bg-white rounded-xl border shadow-md'>
                <h2 className='font-medium text-2xl'>Features</h2>
                <div className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {
                        features?.map((item, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <IoMdCheckboxOutline className='text-lg bg-blue-100 text-primary' />
                                {item?.title}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
