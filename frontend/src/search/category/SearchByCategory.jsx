import CarItem from '@/components/CarItem';
import Header from '@/components/Header'
import Search from '@/components/Search'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SearchByCategory() {
  const { category } = useParams();
  console.log('category', category);
  const [carList, setCarList] = useState();

  useEffect(()=>{
    console.log('hi',carList);
    
  },[carList])


  useEffect(() => {

    const getCarList = async () => {
      try {
        const response = await fetch(`https://wheelsanddeals.onrender.com/api/cars/getcarsbycategory?category=${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to get Cars by this category');
        }

        const result = await response.json();
        // console.log('cars by the given category', result);
        setCarList(result);
        // alert('Listing added successfully!');
        if (!carList) {
          console.log('this is not available.tz1');
          
        }
      } catch (error) {
        console.error('Error in getting cars:', error);
        // alert('Error submitting form. Please try again.');
      }
    }
    getCarList();

  }, [])

  return (
    <div>
      <Header />

      <div className='p-16 bg-black flex justify-center'>
        <Search />
      </div>

      <div className='p-10 lg:px-20'>
        <h2 className='font-bold tex-4xl '>{category}</h2>

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

export default SearchByCategory