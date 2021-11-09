import React from 'react'

function Header({headerItem,currentLang,headerData}) {
  const {engname,chtname} = headerItem
  const {header}=headerData
  return (
    <div className="header">
      <div id="intro_bg_video">
        <iframe 
          title="video"
          src={`${header.video}?loop=1$title=0&background=1&muted=1&autoplay=1#t=3s`} 
          style={{position:"absolute" , top:"0",left:"0",width:"100%",height:"100%"}} 
          frameBorder="0" 
          allowFullScreen
          ></iframe>
      </div>
      <div id="site-logo" className="animate__animated animate__fadeIn">
        <img  src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_icon/${header.img}`} alt="" />
        <div>{currentLang === 'eng' ? engname : chtname}</div>
      </div>

    </div>
  )
}

export default Header
