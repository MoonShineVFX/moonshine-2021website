import React from 'react'

function Header({headerItem,currentLang}) {
  const {engname,chtname} = headerItem
  return (
    <div className="header">
      <div id="site-logo">
        <img  src="./img/msWebLogo.svg" alt="" />
        <div>{currentLang === 'eng' ? engname : chtname}</div>
      </div>

    </div>
  )
}

export default Header
