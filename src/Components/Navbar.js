import React from 'react'
import {Link} from "react-router-dom";
function Navbar({currentLang , switchLang , navitemData,socialitemData, switchHeaderName}) {
  // const [currentLang, setCurrentLang] = useState("");

  const handleSwitch = (data)=>{
    switchLang(data)
  }
  const handleNavItem = (id)=>{
    switchHeaderName(id)
  }

  return (
        <ul className="site-menu">
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
          {socialitemData.length >0 ? 
            socialitemData.map((item,index)=>{
              const {id ,img , link,name} = item
              return(
              
                    <li key={id} >
                      <a href={link} target="_blank" rel="noreferrer">
                        <img src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_icon/${img}`} alt="" className={'c'+name}/>
                      </a> 
                    </li>
                
              )
            }) : <li></li>
          }
          <li onClick={()=> handleSwitch('eng')}><span>English</span></li>
          <li onClick={()=> handleSwitch('cht')}><span>中文</span></li>
        </ul>
        
  )
}

export default Navbar
