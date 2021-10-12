import React from 'react'

function Footer({currentLang,footerData,socialitemData}) {
  const {footer} = footerData
  return (
    <div className="footer">
      <div className="companyInfo">
        <p>{currentLang === 'eng' ? footer.tel : footer.tel_cht }</p>
        <p>{currentLang === 'eng' ? footer.email : footer.email_cht }</p>
        <p>{currentLang === 'eng' ? footer.address : footer.address_cht }</p>
      </div>
      <div className="logos">
        {socialitemData.length >0 ? 
            socialitemData.map((item,index)=>{
              const {id ,img , link} = item
              return(
              
                    <div key={id} className="social">
                      <a href={link} target="_blank" rel="noreferrer">
                        <img src={process.env.PUBLIC_URL + '/img/'+img} alt="" />
                      </a> 
                    </div>
                
              )
            }) : <div></div>
        }
        <div className="mslogo"><img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt=""/></div>
      </div>
      <div className="copyright">{currentLang === 'eng' ? footer.copyright : footer.copyright_cht }</div> 
    </div>
  )
}

export default Footer
