import React from 'react'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { Movie } from '../../../types';
import { Link   } from "react-router-dom";
import { motion,AnimatePresence  } from "framer-motion"
function Newest({data}) {
  console.log(data)
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  
  return (
    <div id="Newest">
      <div className="home_header header_newwest">
        <h1>Newest</h1>
        <Link to='work' className="more hover:text-white">More</Link>

      </div>
      
      
      <div className=" flex w-full xs:flex-col">
        {
          data ? data.map((item)=>{
            const { id,image,title,imgpath} = item
            return(
              <motion.div 
                key = {id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                transition={{type:'spring' , stiffness:50}}
                className=" flex-1 relative m-[0.5%] cursor-pointer first:ml-0 last:mr-0 h-auto  group transition-all   xs:flex-initial xs:m-0 " 
                onClick={() => {
                  setShowModal(true);
                  setCurrentMovie(item);
                }}
              > 
                <div className='overflow-hidden'>
                  <div className='bg-no-repeat bg-cover bg-center pt-[55%] transition-all brightness-75 hover:brightness-110 duration-300  hover:scale-125 xs:pt-[25%]' style={{backgroundImage: `url(${imgpath})`}}></div>
                </div>

                <div className="mt-2 text-xs text-stone-300 opacity-0 group-hover:opacity-100 transition duration-300">{title}</div>
              </motion.div>
            )
          }) :<svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
        }

      
      </div>
    </div>
  )
}

export default Newest