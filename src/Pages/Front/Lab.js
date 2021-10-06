import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
function Lab({labData , currentLang}) {
  
  const {labinfo , labdata}=labData
  const onScroll = (e) => {
    console.log(e.target.documentElement.scrollTop)
  }
  // TODO 滾動替換影片
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  },[]);

  return (
    
    <div className="cContainter">
      <div className="animate__animated animate__fadeIn lab">
        <h2>{currentLang === 'eng' ? labinfo.name : labinfo.name_cht }</h2>
        
        <div className="content">
          {currentLang === 'eng' ? labinfo.description : labinfo.description_cht }
        </div>
      </div>
      <div className="animate__animated animate__fadeIn">
        {
          labdata ?
          labdata.map((item,index)=>{
            const{id,name,name_cht,image,video,title_1,title_1_cht,description_1,description_1_cht,title_2,title_2_cht,description_2,description_2_cht,sitelink} = item
            return(
             <div key={id}>
               <h2>{currentLang === 'eng' ? name : name_cht }</h2>
               <div className="stickyScroll">
                 <div className="image">
                    <div className="image-inner">
                      <div className="image-wrapper active">
                        <img src={`https://www.moonshine.tw/data/img/${image}`} alt="" />
                      </div>
                      <div className="image-wrapper">
                      <div className="thumb player-wrapper" >
                        <ReactPlayer 
                          className='react-player'
                          url={video} 
                          width= "100%"
                          height= "100%"
                          controls={true}
                          volume={0.4}
                        />
                      </div>
                      </div>
                    </div>
                 </div>
                 <div className="text-sections">
                    <div className="text-section">
                      <div>
                        <h3>{currentLang === 'eng' ? title_1 : title_1_cht }</h3>
                        <div className="content">
                          {currentLang === 'eng' ? description_1 : description_1_cht }
                        </div>
                      </div>
                    </div>
                    <div className="text-section">
                      <div>
                        <h3>{currentLang === 'eng' ? title_2 : title_2_cht }</h3>
                        <div className="content">
                          {currentLang === 'eng' ? description_2 : description_2_cht }
                          <p><a href={sitelink} rel="noreferrer" target="_blank">更多關於{currentLang === 'eng' ? name : name_cht }</a></p>
                          
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
             </div> 
            )
          }): <div></div>
        }
      </div>
      
    </div>
  )
}

export default Lab
