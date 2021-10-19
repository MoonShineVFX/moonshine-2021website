import React from 'react'
import {Link} from "react-router-dom";
function MobileNavBar({isToggled,currentLang,switchLang,navitemData,socialitemData,switchHeaderName}) {
  const handleSwitch = (data)=>{
    switchLang(data)
  }
  const handleNavItem = (id)=>{
    switchHeaderName(id)
  }
  return (
    <ul className={isToggled ?  "mobile-menu active" : "mobile-menu"} id="mobile-menu">
      {navitemData.length >0 ? 
        navitemData.map((item)=>{
          const {id,engname ,chtname,path} = item
          return(
          
                <li key={id} >

                  <Link to={"/"+path} onClick={()=> handleNavItem(id)}>
                    {currentLang === 'eng' ? engname : chtname}  
                  </Link>
                </li>
            
          )
        }) : <li >
                <div className="text-placeholder"></div>
            </li>
      }
      <li className="langChange">
        <span onClick={()=> handleSwitch('eng')}>English</span> 
        <span onClick={()=> handleSwitch('cht')}>中文</span>
      </li>


      <li>
        <ul className="mobile-menu-icon">
        {socialitemData.length >0 ? 
          socialitemData.map((item,index)=>{
            const {id ,img , link} = item
            return(
            
                  <li key={id} >
                    <a href={link} target="_blank" rel="noreferrer">
                      <img src={process.env.PUBLIC_URL + '/img/'+img} alt="" />
                    </a> 
                  </li>
              
            )
          }) : <li></li>
        }
        </ul>
      </li>
		
		

	  </ul>
  )
}

export default MobileNavBar
