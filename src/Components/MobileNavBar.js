import React from 'react'
import { Link ,useLocation  } from "react-router-dom";
function MobileNavbar({data}) {
  return (
    <div className='xs:block hidden fixed bg-neutral-900 bottom-0 z-40 shadow inset-x-0 text-stone-500'>
      <div className='flex justify-between'>
          <Link 
              key='home'
              to='/'
              className='w-full focus:text-stone-300 hover:text-stone-300 justify-center inline-block text-center pt-2 pb-1'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="inline-block  mb-1" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z"/></svg>
              <span className="tab tab-home block text-xs">HOME</span>
              
            </Link>
      { data?
            data.map((item,index)=>{
              return(
                  <Link 
                    key={index}
                    to={item.type}
                    className='w-full focus:text-stone-300 hover:text-stone-300 justify-center inline-block text-center pt-2 pb-1'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="inline-block  mb-1" fill="currentColor"><path d={item.icon}/></svg>
                    <span className="tab tab-home block text-xs">{item.engName}</span>
                    
                  </Link>

              )
            }): ""
          }
      </div>
    </div>
  )
}

export default MobileNavbar