import React,{useEffect, useState, useRef} from 'react'
import { FaVimeoV,FaLinkedin,FaFacebookF,FaInstagram,FaTimes } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import { Link ,useLocation,useNavigate  } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { sectionState } from '../atoms/modalAtom';
import {  useRecoilValue ,useRecoilState } from 'recoil';
function Navbar_centerLogo({data ,nav_Work, toggleTrueFalse,socialmedia}) {
  const currentSection = useRecoilValue(sectionState)
  console.log(currentSection)
  const [navbar, setNavbar] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  const [stickyClass, setStickyClass] = useState(false);

  let location = useLocation();
  const { pathname } = useLocation();
  const stickNavbar = () => {
    console.log('scroll')
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 300 ? setStickyClass(true) : setStickyClass(false);
    }
  };
  useEffect(()=>{
    setShowMessage(false)
    if(currentSection > 0){
      setStickyClass(true) 
    }else{
      setStickyClass(false)
    }
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  },[location,currentSection])
  
  return (
    <div id="navbar" className={`fixed top-0 w-full z-30 transition-all duration-500 ` + (stickyClass === true ? ' bg-black '  : ' bg-transparent '  )}>
      <div className='flex justify-between items-center mx-4 md:mx-10 my-5'>
        <div className=" ">
          <Link
            to="/"
          >
            <img src={process.env.PUBLIC_URL+'/images/mslogo2022.svg'} alt=""  className='max-w-full '/>
          </Link>

        </div>
        <div className='flex  space-x-10 items-center'>
          <div className={' space-x-10  transition-all delay-300 hidden md:flex  ' + (stickyClass === true  ? ' translate-y-0 '  : '  -translate-y-20 '  )}>
              <ul className='flex items-center gap-10  text-base' >
                { nav_Work?
                  nav_Work.map((item,index)=>{
                    return(
                      <li key={index} className=" font-light ">
                        <a 
                          href={'/works/'+item.type}
                          className="hover:tracking-widest text-[1rem] font-bold text-zinc-300 hover:text-zinc-100 transition-all"
                        >
                          {item.engName}
                        </a>
                      </li>
                    )
                  }): ""
                }
              </ul>
              <ul className='flex items-center space-x-10  text-base capitalize' >
              { data?
                data.map((item,index)=>{
                  return(
                    <li key={index} className=" font-light ">
                      <Link 
                        to={item.type}
                        className="hover:tracking-widest text-[1rem] font-bold hover:text-zinc-100 transition-all text-zinc-300 "
                      >
                        {item.engName}
                      </Link>
                    </li>
                  )
                }): ""
              }
            </ul>
          </div>

          <div className='' onClick={()=>{setShowMessage(true)}}>
            <div className=" rounded-full  w-8 h-7 p-1 flex flex-col justify-between group cursor-pointer">
              <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
              <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
              <span className="block w-full h-0.5 bg-gray-100 group-hover:w-7 transition-all"></span>
            </div>
          </div>
        </div>

      </div>
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={300}
        classNames="bigNav"
        unmountOnExit
      >
        <div className="fixed top-0 w-full bg-black  h-screen flex flex-col justify-center items-center gap-11" ref={nodeRef}>
          <div className=' absolute top-9 right-9 cursor-pointer' onClick={()=>{setShowMessage(false)}}>
            <TfiClose size={32} className="ml-auto" /> 
          </div>
          <div className="block mb-5 mt-6 lg:mb-16 lg:mt-11">
            <Link
              to="/"
            >
              <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="" className='mx-auto'/>
            </Link>

          </div>
          <ul className='flex flex-col items-center  mb-5 gap-5 md:gap-10' >
            { nav_Work?
              nav_Work.map((item,index)=>{
                return(
                  <li key={index} className="text-[1.4rem] font-bold  leading-7">
                    <a 
                      href={'/works/'+item.type}
                      className="hover:tracking-widest hover:text-white text-zinc-400 transition-all"
                    >
                      {item.engName}
                    </a>
                  </li>
                )
              }): ""
            }
          </ul>
          <ul className='flex flex-col items-center  mb-5 gap-5 lg:gap-10' >
            { data?
              data.map((item,index)=>{
                return(
                  <li key={index} className="text-[1.4rem] font-bold leading-7">
                    <Link 
                      to={item.type}
                      className="hover:tracking-widest transition-all"
                    >
                      {item.engName}
                    </Link>
                  </li>
                )
              }): ""
            }
          </ul>
          <ul className='flex items-center justify-center  gap-8  lg:gap-20 flex-wrap mx-10 md:mx-0'>
            {
              socialmedia.length ? 
              socialmedia.map((item,index)=>{
                const {id,image, link,title}=item
                return(
                  <li key={id} className="social hover:-translate-y-1 transition">
                    <a href={link} target="_blank" rel="noreferrer" className='text-base'>
                      {title}
                    </a> 
                  </li>
                )
              }) : <div>loading </div>
            }
            {/* <li className= {"mx-3 "  + (i18n.language === 'zh-TW' ?' text-white  ' : ' text-zinc-500') } >
              <p onClick={() => changeLanguage("zh-TW")}>繁</p>
            </li>
            <li className={""  + (i18n.language === 'zh-TW' ?' text-zinc-500  ' : ' text-white') }>
              <p onClick={() => changeLanguage("en")}>EN</p>
            </li> */}

          </ul>
        </div>
      </CSSTransition>
      


    </div>
  )
}

export default Navbar_centerLogo