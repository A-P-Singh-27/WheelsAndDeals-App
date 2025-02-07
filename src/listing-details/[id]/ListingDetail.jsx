import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../Components/DetailHeader'
import { useParams } from 'react-router-dom'
import ImageGallery from '../Components/ImageGallery';
import Description from '../Components/Description';
import Features from '../Components/Features';
import Pricing from '../Components/Pricing';
import Specification from '../Components/Specification';
import OwnerDetail from '../Components/OwnerDetail';
import Footer from '@/components/Footer';
import FinancialCalculater from '../Components/FinancialCalculater';
import MostSearchedCar from '@/components/MostSearchedCar';

export default function ListingDetail() {

  const [carinfo , setCarinfo] = useState();
  const { id } = useParams();
  console.log(id);

  const getCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/cars/getcarbyid?recordId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const result = await response.json();
      setCarinfo(result[0]);
      console.log('the car', result[0]);

      // alert('Listing fetched successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Error in fecthcing form . Please try again.');
    }
  }
  useEffect(()=>{
    getCarDetails();
  },[]);


  return (
    <div>
      <Header />
      <div className='p-10 md:px-20'>
      {/* Header detail component */}
        <DetailHeader carDetail={carinfo}/>
        <div className= 'grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
          {/* left */}
          <div className='md:col-span-2 '>
            {/* image gallery */}
            <ImageGallery carDetail={carinfo}/>
            {/* description */}
            <Description carDetail={carinfo}/>
            {/* featureslist */}
            <Features features={carinfo?.features}/>
            {/* financinal calculator */}
            <FinancialCalculater carDetail={carinfo}/>
          </div>

          {/* right */}
          <div >
            {/* pricing */}
            <Pricing carDetail={carinfo}/>
            {/* car specification */}
            <Specification carDetail={carinfo}/>
            {/* owners details */}
            <OwnerDetail carDetail={carinfo}/>
          </div>
        </div>
        <MostSearchedCar/>
      </div>
      <Footer/>
    </div>
  )
}
