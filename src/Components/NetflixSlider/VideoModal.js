import React,{ useEffect, useState } from 'react'
import { HiOutlineX} from "react-icons/hi";
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player';
import { useRecoilState, useRecoilValue } from 'recoil';
import { videoModalState, videoState } from '../../atoms/modalAtom';
function VideoModal() {
  const [showModal, setShowModal] = useRecoilState(videoModalState);

  const video = useRecoilValue(videoState);
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
        <div className="relative aspect-video">
          <ReactPlayer
            url={video && video }
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            controls
          />

        </div>

      </>
    </MuiModal>
  )
}

export default VideoModal