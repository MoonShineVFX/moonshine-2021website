import React,{useState} from 'react'
import { BsArrowRightCircle } from "react-icons/bs";
import { Link   } from "react-router-dom";
function Services({data}) {
  let [addActive, setAddActive] = useState({
    class: null,
    index: 1
  });
  const hoverOn = (e) => {
    setAddActive({
      index: parseInt(e.currentTarget.dataset.id),
      show: true
    });
  };

  const hoverOff = (e) => {
    setAddActive({
      index: parseInt(e.currentTarget.dataset.id),
      show: false
    });
  };
  return (
    <div id="Home_services" className='mt-36 xs:mt-20'>
      <div className="home_header">
        <h1>Services</h1>
        <div className="desc">Animation is what we do best, whether it's 3D or 2D <br />
photorealistic or stylized, characters or products, we breathe a soul into flat concepts. </div>
      </div>
      <div className="service_list_container">
        <div className="service_list flex flex-wrap w-full xs:flex-col">
          {
            data ? data.map((item)=>{
              const { id,image,title,desc,params_name} = item
              return(
                <div 
                  data-id={id}
                  key = {id}
                  className={'pt-[30%] relative bg-no-repeat bg-center bg-cover transition-all delay-100 duration-300 flex overflow-hidden cursor-pointer brightness-50 flex-1  xs:brightness-100' + (addActive.index === id ? ' service_item active ' : 'service_item ')}
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/service/'+image})`}}
                  onMouseOver={hoverOn}
                  onMouseOut={hoverOff}
                >
                  <div className=" absolute bottom-1 p-10 max-w-[90%] min-w-[320px] overflow-hidden xs:px-[10%] xs:py-[5%] xs:flex xs:items-center">
                    <div className=" text-xl mb-5 font-bold xs:mb-0 xs:mr-5">{title}</div>
                    <div className=" text-sm font-light xs:hidden ">
                      {desc}
                    </div>
                    <div className="mt-3 hover:translate-x-2.5 transition xs:mt-0 ">
                      <Link to={`services?q=${params_name}`}>
                        <BsArrowRightCircle size={25}/>
                      </Link>
                    </div>

                  </div>

                </div>
              )
            }) : <svg className="animate-spin h-5 w-5 mr-3 fill-white" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>
          }
        </div>
      </div>

      
    </div>
  )
}

export default Services