import React from 'react'
import SwipeAwardPerView from '../../../Components/SwipeAwardPerView'
import { sectionState } from '../../../atoms/modalAtom';
import {  useRecoilValue } from 'recoil';
function Award({awardData}) {
  const currentSection = useRecoilValue(sectionState)
  return (
    <div className="flex flex-col items-center pt-24 mb-16 w-full mx-auto ">
      {
        awardData && <SwipeAwardPerView awardData={awardData}  animationStart= {currentSection === 2 ? true : false} />
      }
    </div>
  )
}

export default Award