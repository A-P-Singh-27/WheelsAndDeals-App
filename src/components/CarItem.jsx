import { Separator } from '@radix-ui/react-select'
import React from 'react'
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiSpeedometer } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { GiOpenFolder } from "react-icons/gi";
import { Link } from 'react-router-dom';


function CarItem({ car }) {
    
    return (
        <Link to={'/listing-details/'+car._id}>
        <div className='rouunded-xl bg-white border hover:shadow-md cursor-pointer'>
            <h2 className='absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1 text-white'>New</h2>
            <img src={car.imageUrls[0]} alt="carimage" width="100%" className='rounded-t-xl h-[180px] object-cover' />
            <div className='p-4'>
                <h2 className='font-bold text-black text-lg mb-2'>{car?.listingTitle}</h2>
                <Separator /><hr />
                <div className='grid grid-cols-3 mt-5'>
                    <div className='flex flex-col items-center'>
                        <BsFillFuelPumpFill className='text-lg mb-2' mb-2 />
                        <h2 className='text-xs md:text-lg xl:text-xl'>{car?.mileage}</h2>
                    </div>

                    <div className='flex flex-col items-center'>
                        <GiSpeedometer className='text-lg mb-2' />
                        <h2 className='text-xs md:text-lg xl:text-xl'>{car?.fuelType}</h2>
                    </div>
                    <div className='flex flex-col items-center'>
                        <TbManualGearbox className='text-lg mb-2' />
                        <h2 className='text-xs md:text-lg xl:text-xl '>{car?.transmission}</h2>
                    </div>
                </div>
                <Separator className='my-2' /><hr className='my-2' />
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-xl'>${car?.sellingPrice}</h2>
                    <h2 className='text-primary text-sm'>View Details <GiOpenFolder className='inline' /></h2>
                </div>


            </div>
        </div>
        </Link>
    )
}

export default CarItem