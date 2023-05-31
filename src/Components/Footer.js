import React from 'react'
import PartnerMarquee from './PartnerMarquee'
import SwipeAwardPerView from './SwipeAwardPerView'
import { sectionState } from '../atoms/modalAtom';
import {  useRecoilValue } from 'recoil';
function Footer({footerData,socialmedia,partnerjsonData,awardData}) {
  const currentSection = useRecoilValue(sectionState)
  console.log(currentSection)
  const {footer} = footerData
  return (
    <div className="flex flex-col items-center pt-24 mb-16 w-full mx-auto ">

      {
        awardData && <SwipeAwardPerView awardData={awardData}  animationStart= {currentSection === 3 ? true : false} />
      }
      
      <div className="flex flex-wrap justify-around md:justify-between mx-auto md:flex-row mt-24 w-4/5 border-t pt-4 gap-6">
        {socialmedia.length >0 ? 
          socialmedia.map((item,index)=>{
            const {id ,image , link, title} = item
            return(
              <div key={title+id} className="social">
                <a href={link} target="_blank" rel="noreferrer" className='text-base text-zinc-400 hover:text-zinc-100'>
                  {title}
                </a> 
              </div>
            )
          }) : <div></div>
        }
        
      </div>

      <div className="flex gap-8 mt-8 flex-col ">
        {awardData && 
          <div className="contact_info mt-0">
            <a href="/contact" className='text-zinc-400 hover:text-zinc-100'>Contact Us</a>
          </div>
        }
      </div>
      <div className=" text-xs text-zinc-400 text-center mt-10">{footer.copyright}</div> 
    </div>  
  )
}

export default Footer