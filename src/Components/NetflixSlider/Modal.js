import React,{ useEffect, useState } from 'react'
import { HiOutlineX} from "react-icons/hi";
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const movie = useRecoilValue(movieState);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden  rounded-md "
    >
      <>
        <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          >
          <HiOutlineX className="h-6 w-6" />
        </button>
        <div className="relative aspect-video bg-black">
          <ReactPlayer
            url={movie.vimeo_id ? `https://vimeo.com/${movie.vimeo_id}` : `${movie.video_url}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            controls
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            
          </div>
        </div>
        <div className="flex flex-col w-full space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-base  ">
              <p className="font-semibold text-yellow-600">
                {movie?.title}
              </p>
            </div>

            <div className="flex flex-col  gap-x-10 gap-y-4 font-light md:flex-row  ">
              <div className="whitespace-pre-line w-full overflow-y-scroll max-h-48 text-sm"> {movie?.intro} </div>

            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal