import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./AllPesticideSwiper.css"

// import required modules
import { Pagination } from 'swiper/modules';
import Pesticide from '../pesticide/Pesticide.jsx';

export default function AllPesticideSwiper({allPesticides,heading}) {
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
            allPesticides?.map((product)=>{
                return(
                    <>
                    <SwiperSlide><Pesticide data={product}/></SwiperSlide>
                    </>
                )
            })
        }
        
        
      </Swiper>
      </div>
    </>
  );
}
