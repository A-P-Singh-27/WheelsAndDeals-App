import CarItem from '@/components/CarItem';
import Header from '@/components/Header';
import Search from '@/components/Search';
import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function SearchByOptions() {

  const location = useLocation();

  const [searchparam] = useSearchParams();
    const [carList, setCarList] = useState();
  const condition=searchparam.get('condition');
  const make=searchparam.get('make');
  const price=searchparam.get('price');

  console.log('condition , make , price: ' , condition,make,price);

  const getCarList = async () => {
    try {
      const response = await fetch(`https://wheelsanddeals.onrender.com/api/cars/getcarsbyconditions?condition=${condition}&make=${make}&price=${price}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },

      });

      if (!response.ok) {
          throw new Error('Failed to fetch cars');
      }

      const result = await response.json();
      console.log('the car by condition' , result);
      
      
      if (result.length==0) {
        try {
          const response = await fetch(`https://wheelsanddeals.onrender.com/api/cars/getallcarlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
  
        });
  
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
  
        const result = await response.json();
        console.log('the car by condition' , result);
        setCarList(result);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }else{
      setCarList(result);
      }
      // alert('Listing fetched successfully!');
  } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Error in fecthcing form . Please try again.');
  }
  }
  useEffect(()=>{
    getCarList();
  },[location])

  return (
    <div>
      <Header />

      <div className='p-16 bg-black flex justify-center'>
        <Search />
      </div>

      <div className='p-10 lg:px-20'>
        {/* <h2 className='font-bold tex-4xl '>{category}</h2> */}

        {/* List of CarList */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
        {
          carList?.length>0?
          carList?.map((car , index)=>(
            <div key={index}>
              <CarItem car={car}/>
            </div>
          )) :
          [1,2,3,4,5,6].map((item,index)=>(
            <div className='h-[370px] rounded-xl bg-slate-200 animate-pulse'></div>
          ))
        }
        </div>
      </div>
    </div>
  )
}
