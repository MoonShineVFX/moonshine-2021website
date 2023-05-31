import React,{useRef, useState, useEffect} from 'react'
import { HiOutlineChevronRight,HiOutlineChevronLeft } from "react-icons/hi";
import Thumbnail from './Thumbnail';
import { CgMoreO } from "react-icons/cg";
import { Link   } from "react-router-dom";

import { useRecoilState } from 'recoil';
import { byCategoryModalState,categoryState } from '../../atoms/modalAtom';

//helper
import { queryByCategoryId } from '../../Helper/getfunction'

function Row({title,categoryData}) {
  const [showModal, setShowModal] = useRecoilState(byCategoryModalState);
  const [categoryId, setCategoryId] = useRecoilState(categoryState);
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [workData, setWorkData] = useState([]);

  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  useEffect(()=>{
    queryByCategoryId(categoryData.id , function(res){
      setWorkData(res)
    })
  },[])

  return (
    <div className="h-40 xs:space-y-0.5 space-y-2">
      <h2 className="group  flex items-center w-full cursor-pointer  font-semibold text-[#e5e5e5da] hover:text-white  transition duration-200  text-2xl xs:text-sm"
        onClick={() => {
          setShowModal(true);
          setCategoryId(categoryData)
        }}>
        {title}
        <div  className='flex items-center text-sm ml-1 font-bold text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition -translate-x-2 group-hover:translate-x-2'> <p className='ml-1'>Show More</p></div>
      </h2>
      <div className="group relative -ml-2">
        <HiOutlineChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 xs:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center overflow-hidden xs:space-x-2  space-x-2.5 p-2"
        >
          {
            workData.length > 0 ?
            workData.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            )) : <svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
          }
        </div>

        <HiOutlineChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 xs:opacity-100"
          onClick={() => handleClick('right')}
        />
        <div className="absolute top-0 bottom-0 right-0 z-30 m-auto h-full w-80 cursor-pointer opacity-100 transition bg-gradient-to-l from-black pointer-events-none"></div>
      </div>
    </div>
  )
}

export default Row