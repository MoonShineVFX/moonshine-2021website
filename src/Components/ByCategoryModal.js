import React,{ useEffect, useState } from 'react'
import { HiOutlineX} from "react-icons/hi";
import MuiModal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { byCategoryModalState,categoryState } from '../atoms/modalAtom';
import Thumbnail from './NetflixSlider/Thumbnail';

//helper
import { getWorksByCategoryAndLimits,getWorks } from '../Helper/getfunction'

function ByCategoryModal() {
  const [showModal, setShowModal] = useRecoilState(byCategoryModalState);
  const categoryData = useRecoilValue(categoryState);
  const {id , name} = categoryData
  const [currentlistData , setCurrentlistData] = useState([])
  const [latestDoc , setLatestDoc] = useState([])
  const handleClose = () => {
    setShowModal(false);
  };
  const handleClick = ()=>{
    getWorksByCategoryAndLimits(id, function(res){
      console.log(res)

    
    })
  }

  useEffect(()=>{
    if(id !== '1'){
      getWorksByCategoryAndLimits(id,function(res){
        setCurrentlistData(res)
      })
    }else{
      getWorks((res)=>{
        setCurrentlistData(res)
      })
    }

  },[])
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-6xl overflow-y-scroll  rounded-md "
    >
      <>
        <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          >
          <HiOutlineX className="h-6 w-6" />
        </button>
        <div className="flex flex-col w-full rounded-b-md bg-[#181818] px-10 py-8">
          <div className="flex items-center justify-center space-x-2 text-base my-12 ">
              <p className="font-semibold text-white text-3xl">
                {name}
              </p>
            </div>
          <div className="space-y-6 text-lg mt-6">
            <div className="flex flex-wrap">
            {
              currentlistData.length > 0 ?
              currentlistData.map((movie) => (
                <Thumbnail key={movie.id} movie={movie} categorystyle={true} />
              )) :<svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>


            }
            </div>

            {/* <button className='text-3xl' onClick={handleClick}>LOAD MORE</button> */}

          </div>
        </div>
      </>
        

    </MuiModal>
  )
}

export default ByCategoryModal