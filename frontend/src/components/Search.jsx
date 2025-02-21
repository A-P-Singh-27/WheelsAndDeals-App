import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { IoSearch } from "react-icons/io5";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Data from '@/Shared/Data';
import { Link } from 'react-router-dom';


function Search() {
    const [cars,setCars] = useState();
    const [make,setMake] = useState();
    const [price,setPrice] = useState();


    return (
        <div className='p-2 rounded-xl  md:p-5 classname bg-white md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%] '>
            <Select onValueChange={(value)=>setCars(value)}>
                <SelectTrigger className="outline-none rounded-[0.5rem] md:border-none w-full shadow-none text-lg mb-2 md:mb-0">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent className='bg-white rounded-[0.5rem]'>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className='hidden md:block '/>

            <Select onValueChange={(value)=>setMake(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg rounded-[0.5rem] mb-2 md:mb-0">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent className='bg-white rounded-[0.5rem]'>
                    {Data.CarMakes.map((maker , index)=>(
                    <SelectItem value={maker.name}>{maker.name}</SelectItem>

                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='hidden md:block'/>

            <Select onValueChange={(value)=>setPrice(value)}>
                <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg rounded-[0.5rem] mb-2 md:mb-0">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent className='bg-white rounded-[0.5rem]'>
                    {Data.Pricing.map((price , index)=>(
                    <SelectItem value={price.amount}>{price.amount}</SelectItem>

                    ))}
                </SelectContent>
            </Select>

                <Link to={'/search?condition='+cars+'&make='+make+'&price='+price} className='flex justify-center w-[100%]'>
                <IoSearch className='text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer'/>
                </Link>
            

        </div>
    )
}

export default Search