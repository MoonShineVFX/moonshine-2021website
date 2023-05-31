import React from 'react'
import { Link   } from "react-router-dom";
function Home_about() {
  return (
    <div id="home_about">
      <div className="home_about_container relative mt-36 xs:mt-20">
        <div className="content absolute top-0 left-0 w-[300px]  xs:relative xs:w-full">
          <div className="title">
            About
          </div>
          <div className="desc">
            Animation is what we do best, whether it's 3D or 2D, 
photorealistic or stylized, characters or products, we breathe a soul into flat concepts. 
          </div>
          <div className="mt-3 hover:text-white text-gray-400 transition text-xs">
            <Link to='about'>
              More
            </Link>
          </div>
        </div>
        <div className=" ml-[150px] pt-[25%] relative bg-no-repeat bg-center bg-cover xs:pt-[56%] xs:ml-0" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/about-s04.png'})`}}>

        </div>
      </div>
    </div>
  )
}

export default Home_about