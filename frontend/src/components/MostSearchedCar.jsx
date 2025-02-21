import FakeData from '@/Shared/FakeData';
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useUser } from '@clerk/clerk-react';


function MostSearchedCar() {
  // console.log(FakeData.carList);
  const { user } = useUser();
  const [carLists, setCarLists] = useState([]);

  useEffect(() => {
    GetPopularCars();
  }, [user])
  useEffect(() => {
    console.log('car fetched successfully:', carLists);
  }, [carLists])
  const GetPopularCars = async (req, res) => {

    try {
      const response = await fetch(`https://wheelsanddeals.onrender.com/api/cars/getpopularcarlisting`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const result = await response.json();
      setCarLists(result);

      // alert('Listing fetched successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Error in fecthcing form . Please try again.');
    }
  }

  return (
    <div id='new' className='mx-0 md:mx-24'>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Car</h2>

      <Carousel>
        <CarouselContent>
          {carLists.map((car, index) => (
            <CarouselItem className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <CarItem car={car} key={index} />
            </CarouselItem>
          ))}

        </CarouselContent>
        <CarouselPrevious className='hidden md:inline'/>
        <CarouselNext className='hidden md:inline'/>
      </Carousel>



    </div>
  )
}

export default MostSearchedCar