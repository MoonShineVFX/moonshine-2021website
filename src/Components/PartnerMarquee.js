import React from 'react'
import Marquee from "react-fast-marquee";

function PartnerMarquee({partnerData}) {
  const {partner} = partnerData
  return (
    <div id="partner_marquee">
      <div className=' px-12 text-3xl md:text-3xl font-bold md:w-full py-4 leading-slug mb-10'>PartnerShip</div>
      <Marquee 
        speed={40}
        gradientColor={[0,0,0]}
        className="align-middle items-center"
      >
        <div className="marquee-content inline-block items-center my-12">
          {
            partner?
            partner.map((item,index)=>{
              return (
                <div className="marquee-item w-[130px] h-[120px] leading-[120px] float-left mx-4 flex align-middle my-auto" key={index}>
                  <img 
                    src={process.env.PUBLIC_URL+'/images/partner/'+item.image} alt="" className='max-w-[90px] align-middles mx-0 my-auto block'
                  />
                </div>
              )
            }) : ""
          }
        </div>
        
      </Marquee>

    </div>

  )
}

export default PartnerMarquee