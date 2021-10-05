import React,{useState,useEffect} from 'react'

function Navbar({currentLang , switchLang}) {
  // const [currentLang, setCurrentLang] = useState("");
  const navItem = [
    {id:1, engname:'Work',chtname:"作品"},
    {id:2, engname:'Lab',chtname:"Lab"},
    {id:3, engname:'About Us',chtname:"關於"},
    {id:4, engname:'Blog',chtname:"部落格"},
    {id:5, engname:'Contact',chtname:"聯絡"},
  ]
  const socialitem =[
    {id:1, name:'vitag',img:"vitaglogo.svg" , link:'https://vitag.net/'},
    {id:2, name:'vimeo',img:"vimeo.svg", link:'https://vimeo.com/user27215381'},
    {id:3, name:'fb',img:"fb.svg", link:'https://www.facebook.com/MoonShineAnimation'},
    {id:4, name:'ig',img:"ins.svg", link:'https://instagram.com/moonshine.tw/'},
    {id:5, name:'xin',img:"xinlogo.svg", link:'https://www.xinpianchang.com/u10430270'},
  ]
  const handleSwitch = (data)=>{
    switchLang(data)
  }
  useEffect(()=>{
    // localStorage.setItem('lang' ,lang)
    // setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  },[])
  return (
        <ul className="site-menu">
          {navItem ? 
            navItem.map((item,index)=>{
              const {id,engname ,chtname} = item
              return(
              
                    <li key={id} >
                      <a href="/">
                        {currentLang === 'eng' ? engname : chtname}  
                      </a> 
                    </li>
                
              )
            }) : <li>目前還沒有</li>
          }
          {socialitem ? 
            socialitem.map((item,index)=>{
              const {id,name ,img , link} = item
              return(
              
                    <li key={id} >
                      <a href={link} target="_blank">
                        <img src={process.env.PUBLIC_URL + '/img/'+img} alt="" />
                      </a> 
                    </li>
                
              )
            }) : <li>目前還沒有</li>
          }
          <li onClick={()=> handleSwitch('eng')}><span>English</span></li>
          <li onClick={()=> handleSwitch('cht')}><span>中文</span></li>
        </ul>
        
  )
}

export default Navbar
