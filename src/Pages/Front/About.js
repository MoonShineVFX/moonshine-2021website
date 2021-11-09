import React from 'react'

function About({aboutStatsData,currentLang,aboutInfoData,aboutStrengthData}) {
  return (
    <div className="uContainer">
      <div className="office mt30 animate__animated animate__fadeIn">
        <img src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_about/office.jpg`} alt="" />
      </div>
      <div className="stats animate__animated animate__fadeIn">
        {
          aboutStatsData ? 
          aboutStatsData.map((item,index)=>{
            const{id, left , left_cht ,center,center_cht,right,right_cht,link} = item
            return(
              <div key={left+id} className="statsContent">
                <div className="statsLeft">
                  {currentLang === 'eng' ? left : left_cht}
                </div>
                <div className="statsCenter">
                  {currentLang === 'eng' ? center : center_cht}
                </div>
                <div className="statsright">
                  {link.length>0 ? 
                    <a href={link} target="_blank" rel="noreferrer">{currentLang === 'eng' ? right : right_cht }</a>
                  :
                  null}
                </div>
              
              </div>
            )
          }):<div>目前還沒有</div>
        }
      </div>
      <div className="about animate__animated animate__fadeIn">
        <h2>{aboutInfoData ? 
              currentLang === 'eng' ? aboutInfoData.title_1 : aboutInfoData.title_1_cht : ''}</h2>
        <div className="content">
            {aboutInfoData ? currentLang === 'eng' ? aboutInfoData.description_1 : aboutInfoData.description_1_cht : '' }
        </div>
        <h2>{aboutInfoData ? currentLang === 'eng' ? aboutInfoData.title_2 : aboutInfoData.title_2_cht : '' }</h2>
        <div className="content">
            {aboutInfoData ? currentLang === 'eng' ? aboutInfoData.description_2 : aboutInfoData.description_2_cht : '' }
        </div>

      </div>
      <div className="strength">
        {aboutStrengthData.length>0 ? 
          aboutStrengthData.map((item,index)=>{
            const {id,title ,title_cht,description,description_cht,image} = item
            return(
            
              <div key={title+id} className="strengthContent" >
                <div className="title">{currentLang === 'eng' ? title : title_cht }</div>
                <div className="description">{currentLang === 'eng' ? description : description_cht }</div>
                <div className="img">
                  <img src={`https://storage.googleapis.com/web-moonshine.appspot.com/img_about/${image}`} alt="" />
                </div>
              </div>
              
            )
          }) : <div>目前還沒有</div>
        }
      </div>
    </div>
  )
}

export default About
