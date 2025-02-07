import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ImageGallery({ carDetail }) {
  // console.log(carDetail);

  const nextButtonRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [direc, setDirec] = useState(true);
  let images = carDetail?.imageUrls.length;
  // console.log(images);
  // useEffect(()=>{
  //   console.log(index);

  // },[index])



  useEffect(() => {
    if (index === images || index == 0) {
      setDirec(!direc);
      // console.log(direc);

    }

  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (nextButtonRef.current) {
        nextButtonRef.current.click();
        setIndex((prevIndex) => (prevIndex + 1) % images);
      }
    }, 1000); // Every 1 second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [index, images]);

  return (
    <div>
      <div className='h-fit w-full object-cover rounded-xl overflow-hidden'>
        <Carousel className='w-[100%] h-[100%]'>
          <CarouselContent>
            {
              carDetail?.imageUrls?.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt=""
                    className='w-[100%] h-[100%] object-contain'
                  />
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselPrevious ref={direc ? null : nextButtonRef} />
          <CarouselNext ref={direc ? nextButtonRef : null} />
        </Carousel>
      </div>
    </div>
  )
}
