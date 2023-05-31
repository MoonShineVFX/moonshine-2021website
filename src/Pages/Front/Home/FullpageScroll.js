import React,{useState} from 'react'
import ReactFullpage from '@fullpage/react-fullpage';
//import units
import Home_mainCategory from './Home_mainCategory';
import Home_mainAbout from './Home_mainAbout';
import Home_mainService from './Home_mainService';
import Footer from '../../../Components/Footer';
import footerData from '../../../Components/footer.json'
import socialMediaData from '../../../Components/socialitemData.json'
import partnerjsonData from '../../../Components/partnerItem.json'
import awardjsonData from '../../../Components/awardItem.json'
import { sectionState } from '../../../atoms/modalAtom';
import { useRecoilState } from 'recoil';
function FullpageScroll(){
  const {socialmedia} = socialMediaData
  const {award} = awardjsonData
  const [currentPage, setCurrentPage] = useRecoilState(sectionState);

  return(
    <ReactFullpage
      //fullpage options
      licenseKey = {'VKGDI-QLS3J-S8IPJ-NAEY6-JXCCJ'}
      navigation
      scrollingSpeed = {600} /* Options here */
      onLeave={(section, origin, destination, direction)=>{
        console.log(origin.index)
        setCurrentPage(origin.index)
      }}

      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Home_mainCategory />
            </div>
            <div className="section">
              <Home_mainAbout />
            </div>
            <div className="section">
              <Home_mainService />
            </div>
            <div className='section fp-auto-height'>
              <Footer footerData={footerData} socialmedia={socialmedia} awardData={award}/>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  )

}


export default FullpageScroll