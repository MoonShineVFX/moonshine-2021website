import React from 'react'
import { useRecoilState } from 'recoil';
import { byCategoryModalState,categoryState } from '../atoms/modalAtom';
function ImgHeader({imgPath,button,handler,categoryData}) {
  const [showModal, setShowModal] = useRecoilState(byCategoryModalState);
  const [categoryId, setCategoryId] = useRecoilState(categoryState);
  return (
    <div id="img_header" className='relative w-full h-[65vh] bg-no-repeat bg-center bg-cover xs:h-[35vh]'>
      <div className="img-wrapper">
        {/* <iframe src="https://player.vimeo.com/video/706129402?background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe> */}
        <div className="imgbg w-full h-[56vw]  absolute bg-no-repeat bg-center bg-cover  " 
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/work/' + imgPath})`}}>
          
        </div>
      </div>
      {button && <div className='inline-flex items-center justify-center h-12 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline absolute z-40 top-2/4 left-1/2 -translate-x-1/2 xs:text-base'
      onClick={() => {
        setShowModal(true);
        setCategoryId(categoryData)
      }}
      
      > {button}</div> }



    
    </div>
  )
}

export default ImgHeader