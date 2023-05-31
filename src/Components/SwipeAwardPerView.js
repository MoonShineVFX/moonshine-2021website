import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
function SwipeAwardPerView({awardData,animationStart}) {
  return (
    <div className=' relative w-11/12'>
       <div className=' px-12 text-3xl md:text-3xl font-bold md:w-full py-4 leading-slug mb-10'>Awards</div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {
          awardData.map((item,index)=>{
            return(
              <SwiperSlide key={'a0'+index}>
                <div 
                  className={'flex flex-col justify-center items-center text-center pb-14 transition-all duration-1000 ' + (animationStart ? ' translate-y-0 opacity-100 ' : 'translate-y-[50px] opacity-0' )} 
                  style={animationStart ? { 'transition-delay': `${index * 500}ms`} : { 'transition-delay': `0ms`}}
                  >
                  <div><img src={process.env.PUBLIC_URL+'/images/award/'+ item.image} alt="" /></div>
                  <div className='text-[1.2rem] font-bold mb-3'>{item.title}</div>
                  <div className='text-zinc-300'>{item.awardtitle}</div>
                  <div className='text-zinc-300 whitespace-pre-wrap'>{item.subtitle}</div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default SwipeAwardPerView