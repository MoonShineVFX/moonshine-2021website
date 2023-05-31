import React from 'react'
import ReactPlayer from 'react-player'
import { motion } from "framer-motion"
import { categoryState,videoModalState, videoState } from '../atoms/modalAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
import VideoModal from './NetflixSlider/VideoModal';
function Header({v_url,header_title,start_time,tpa_display}) {
  const isShowModal = useRecoilValue(videoModalState);
  const [currentVideo, setCurrentVideo] = useRecoilState(videoState);
  const [showModal, setShowModal] = useRecoilState(videoModalState);
  const player = React.createRef()
  return (
    <div id="header" className='relative w-full h-[68vh] bg-no-repeat bg-center bg-cover xs:h-[35vh]'>
      {tpa_display &&       
        <div className=' absolute bottom-10 w-40 right-10 md:w-20 md:right-9'>
          <img src={ process.env.PUBLIC_URL + '/images/tpn-white.png'} alt="" className='w-full' />
        </div>
      }

      <div className="vimeo-wrapper">
        {/* <iframe src="https://player.vimeo.com/video/706129402?background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe> */}
        <ReactPlayer
          url={v_url}
          className='react-player'
          playing
          playsinline
          muted
          loop
          width='100vw'
          height='56.25vw'
          config={{ vimeo: { playerOptions: { background: true }}}}
          ref={player}
          onReady={()=>{
            if(start_time){
              player.current.seekTo(3)
            }
          }}
        />
      </div>
      <div className='absolute bottom-5 left-5 bg-zinc-800 hover:bg-zinc-900 px-4 py-2 rounded-md cursor-pointer font-normal hidden'
        onClick={() => {
          setShowModal(true);
          setCurrentVideo(v_url);
        }}
      >
        PLAY FULL VIDEO       
      </div>
      <div className="caption absolute   flex flex-col justify-center items-center bottom-0 ">
          {/* <img src={ process.env.PUBLIC_URL + '/images/MS_logo.svg'} alt="" className='w-1/3' /> */}
        {/* <div className="title">MOONSHINE</div> */}
        {/* <button type='button' className="header_playbtn" >play video</button> */}
        <div className='text-white text-4xl font-thin'>
        {/* {header_title} */}
        </div>
        
      </div>
      {isShowModal && <VideoModal />}
    
    </div>
  )
}

export default Header