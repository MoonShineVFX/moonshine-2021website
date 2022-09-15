import React from 'react'

function Header({headerItem,currentLang,headerData}) {
  const {engname,chtname} = headerItem
  return (
    <div className="header">
      <div className='tpnlogo'>
        <img  src={process.env.PUBLIC_URL + '/img/2022/tpn-white.png'} alt=""  />
      </div>
      
      <div id="intro_bg_video">
        <iframe 
          title="video"
          src={`${headerData.video}?loop=1$title=0&background=1&muted=1&autoplay=1#t=3s`} 
          style={{position:"absolute" , top:"0",left:"0",width:"100%",height:"100%"}} 
          frameBorder="0" 
          allowFullScreen
          ></iframe>
      </div>
      <div id="site-logo" className="animate__animated animate__fadeIn">
        <img  src={process.env.PUBLIC_URL + '/img/2022/svg-08.svg'} alt="" />
        <div>{currentLang === 'eng' ? engname : chtname}</div>
      </div>

    </div>
  )
}

export default Header
