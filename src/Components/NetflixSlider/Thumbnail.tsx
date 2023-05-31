import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../atoms/modalAtom';
import { Movie } from '../../types';
import { motion,AnimatePresence  } from "framer-motion"
function Thumbnail({movie,categorystyle}) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{type:'spring' , stiffness:50 , delay:0.15}}
      className={categorystyle ? 'relative w-1/5 px-2 cursor-pointer transition-transform duration-200 ease-out h-36 hover:scale-105' : `relative  cursor-pointer transition-transform duration-200 ease-out h-36  min-w-[260px] hover:scale-105  xs:h-40 xs:min-w-[120px]  `}
      onClick={() => {
        setShowModal(true);
        setCurrentMovie(movie);
      }}
    >
      <div
        className=' bg-no-repeat bg-center bg-cover absolute top-0 left-0 inset-0 rounded saturate-80'
        style={{backgroundImage: `url(${movie.imgpath})`}}
      >

      </div>
      {/* <img
        src={movie.imgpath} 
        className="xs:rounded-sm rounded saturate-80"
        alt={movie.title}
      /> */}
    </motion.div>
    </AnimatePresence>
  )
}

export default Thumbnail