import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getServiceForDashboard} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import { FiArrowRightCircle } from "react-icons/fi";
import { sectionState } from '../../../atoms/modalAtom';
import {  useRecoilValue } from 'recoil';
function Home_mainService() {
  const currentSection = useRecoilValue(sectionState)
  const [categoryData, setCategoryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  useEffect(()=>{
    getServiceForDashboard((res)=>{
      console.log(res)
      setServiceData(res)
      
    })
  },[])


  const AboutVideoContainer = ({url,start_time}) =>{
    const videoRef = React.useRef(null);
    function handlePlay() {
      var playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          videoRef.current.play();
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
    }
  
    function handleStop() {
      videoRef.current.pause();
    }
    return(
      <video 
        loop muted playsInline className='w-full h-full object-cover align-middle  brightness-75 hover:brightness-100 hidden lg:block' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url + '#t='+ start_time} type="video/mp4"/>
      </video>
    )
  }


  return (
    <div className='pt-0 h-screen'>
      <section id="about" className='w-full mx-auto  pt-[100px]  md:pt-22 flex flex-col justify-between h-full'>
        <div className={'w-5/6 lg:w-4/5 md:my-16 mx-auto lg:h-[15vh] flex flex-col lg:flex-row justify-start items-start lg:items-center lg:justify-cente transition-all delay-300 duration-1000 ' + (currentSection === 3 ? ' opacity-100 ' : ' opacity-0 ' )} >
          <div className='text-3xl font-bold  w-4/5 lg:w-3/5 mb-3 lg:mb-0'>
            Find Out More
          </div>
          <div className='text-lg font-light md:mb-0 text-zinc-100'>
            In addition to content creation, we provide virtual production, MR immersive interaction, technology development, and eduction, aiming to explore all possibilities in image and animation.
          </div>


        </div>
        <div className='grid lg:grid-cols-4 w-full grid-cols-2 h-[50vh] lg:h-[55vh] inset-0 '>
          {serviceData &&
          serviceData.map((item,index)=>{
            const {title , link , cover_video,start_time,video_poster} = item
            return(
              <a key={'service0'+index} href={link} target={"_blank"}>
                <div className=' relative group  transition-all cursor-pointer md:opacity-100 flex justify-center items-center h-full'>
                  {/* <img src={process.env.PUBLIC_URL+'/images/about/'+ cover_image} alt="" className='w-full object-cover opacity-50 group-hover:opacity-100 transition-all'/> */}
                  <AboutVideoContainer url={cover_video} start_time={start_time}/> 
                  <div className='video_img_cover block lg:hidden bg-center bg-cover bg-no-repeat h-screen  max-h-[25vh] w-full brightness-75'
                    style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/service/'+video_poster})`}}
                  >
                  </div>
                  <div className=' absolute  w-full text-center  font-bold uppercase  group-hover:tracking-[.25em] transition-all text-[1.2rem] tracking-[.15em] md:break-all  '>
                    {title}
                  </div>
                </div>
              </a>
            )
          })

          }
          
        </div>

      </section>

    </div>

  )
}

export default Home_mainService