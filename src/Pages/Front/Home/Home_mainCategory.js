import React, { useState, useEffect } from 'react'
import { Link ,useLocation  } from "react-router-dom";
import { getCategory} from '../../../Helper/getfunction'
import { LoadingAnim } from '../../../Helper/HtmlComponents';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../atoms/modalAtom';
function Home_mainCategory() {

  const [categoryData, setCategoryData] = useState([]);
  const [currentCategory, setCurrentCategory] = useRecoilState(categoryState);
  useEffect(()=>{
    getCategory((res)=>{
      setCategoryData(res)
      console.log(res)
    })

  },[])

  const VideoContainer = ({url}) =>{
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
        loop muted playsInline 
        className='md:h-screen  max-h-[25vh] w-full object-cover object-center  lg:max-h-screen opacity-40 hover:opacity-100 hidden lg:block' 
        ref={videoRef}
        onMouseOver={handlePlay}
        onMouseOut={handleStop}
      >
        <source src={url} type="video/mp4"/>
      </video>
    )
  }

  return (
    <div>
      <ul className='grid lg:grid-cols-2 w-full md:h-screen grid-cols-1 h-auto aspect-square mt-0 md:p-0 md:mt-0 relative'>
        {
          categoryData ? 
          categoryData.map((item,index)=>{
            const{id, name, name_cht, display, imgpath, cover_video, slug,video_poster } = item
            return display === '1' ? 
              <Link key={name+id} 
                  to={"/works/"+slug}
                  onClick={
                    ()=>{
                      setCurrentCategory(item)
                    }
                  }
                  className=" relative cursor-pointer  text-white md:text-[1.6rem] bg-no-repeat bg-cover bg-center flex justify-center items-center tracking-[.15em] hover:tracking-[.25em] transition-all    "
                  // style={{backgroundImage : `url(${imgpath})`}}
              >
     
                  <VideoContainer url={cover_video}  /> 
                  <div className='video_img_cover block lg:hidden bg-center bg-cover bg-no-repeat h-screen  max-h-[25vh] w-full brightness-75'
                    style={{backgroundImage : `url(${process.env.PUBLIC_URL+'/images/home/'+video_poster})`}}
                  >
                  </div>

                <div className=' absolute font-bold uppercase text-[1.2rem]'> {name }</div>
               
              </Link>
              :
              null


          }): <LoadingAnim />
        }
        <div className='scroll-down'></div>
      </ul>

    </div>

  )
}

export default Home_mainCategory