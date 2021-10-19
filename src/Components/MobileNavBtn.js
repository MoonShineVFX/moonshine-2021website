import React from 'react'

function MobileNavBtn({toggleTrueFalse}) {
  return (
    <div className="mobile-menu-btn-bar" id="mobile-menu-btn-bar">
      <span className="btn" id="mobile-menu-btn" onClick={toggleTrueFalse}>
        <img src="https://firebasestorage.googleapis.com/v0/b/moonshinewebsite21.appspot.com/o/img_icon%2Fmenu.svg?alt=media&token=96615d4d-e220-4e96-8fae-063abf8d7e1c"/>
      </span>
    </div>
  )
}

export default MobileNavBtn
