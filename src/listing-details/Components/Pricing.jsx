import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";

export default function Pricing({ carDetail }) {
  return (
    <div className="p-10 rounded-xl border shadow-md">
      <h2>Our Price</h2>
      <h2 className="font-bold text-4xl">${carDetail?.sellingPrice}</h2>

      <Button className="text-white h-fit mt-7 rounded-xl break-words flex items-center">
        <MdOutlineLocalOffer className="text-lg mr-2" />
        Make an Offer Price
      </Button>
    </div>

  )
}
