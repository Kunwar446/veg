import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './AllVegetableSwiper.css';

// import required modules
import { Pagination } from 'swiper/modules';
import Vegetable from '../vegetable/Vegetable.jsx';

export default function AllVegetableSwiper({allVegetables,heading}) {
  return (
    <>
      <div className="swiperWrapper">

        <h1 className='heading'>{heading}</h1>
        
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            allVegetables?.map((product)=>{
                return(
                    <>
                    <SwiperSlide><Vegetable data={product}/></SwiperSlide>
                    </>
                )
            })
        }
        
        
      </Swiper>
      </div>
    </>
  );
}
