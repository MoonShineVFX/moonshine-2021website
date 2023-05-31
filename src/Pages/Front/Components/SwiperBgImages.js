import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade,Autoplay } from "swiper";
function SwiperBgImages({imgData}) {
  return (
    <div className='relative w-full  bg-no-repeat bg-bottom bg-cover '>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        speed={2000}
        autoplay
        autoHeight
        loop={true}
        height={'300'}
        modules={[EffectFade,Autoplay]}
        className="mySwiper h-auto lg:h-[80vh]"
      >
        {
          imgData.map((item,index)=>{
            return(
              <SwiperSlide key={index}>
                <div className='w-full bg-cover bg-no-repeat bg-bottom h-auto pt-[45%]'
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/'+ item})`}}
                >

                </div>
              </SwiperSlide>
            )
          })
        }


      </Swiper>
    </div>
  )
}

export default SwiperBgImages