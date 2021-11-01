import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
function Lab({labData , currentLang , labInfoData}) {
  const [ height , setHeight] = useState("")
  const onScroll = (e) => {
    setHeight(e.target.documentElement.scrollTop)
  }
  // TODO 滾動替換影片
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    
  },[]);

  return (
    
    <div className="cContainter">
      <div className="animate__animated animate__fadeIn lab">
        <h2>{  labInfoData ?
                    currentLang === 'eng' ? labInfoData.name : labInfoData.name_cht 
                          : '' }</h2>
        
        <div className="content">
          {   labInfoData ? 
                    currentLang === 'eng' ? labInfoData.description : labInfoData.description_cht 
                    : ''}
        </div>
      </div>
      <div className="animate__animated animate__fadeIn">
        {
          labData ?
          labData.map((item,index)=>{
            const{id,name,name_cht,image,video,title_1,title_1_cht,description_1,description_1_cht,title_2,title_2_cht,description_2,description_2_cht,sitelink,imgpath} = item
            return(
             <div 
                key={id} 
                ref={el=>{
                      if(!el) return 

                      if(height > el.offsetTop +(el.getBoundingClientRect().height /3.3)  ){
                        el.querySelector(`#image${id}`).classList.remove('active')
                        el.querySelector(`#video${id}`).classList.add('active')
                      }else{
                        el.querySelector(`#image${id}`).classList.add('active')
                        el.querySelector(`#video${id}`).classList.remove('active')
                      }
                    }}>
               <h2>{currentLang === 'eng' ? name : name_cht }</h2>
               <div className="stickyScroll">
                 <div className="image">
                    <div className="image-inner">
                      <div className="image-wrapper active" id={`image${id}`}>
                        <img src={imgpath} alt="" className="img-fluid" />
                      </div>
                      <div className="image-wrapper" id={`video${id}`}>

                          <ReactPlayer 
                            url={video} 
                            width= {500}
                            height= {300}
                            controls={true}
                            volume={0.2}
                          />
                    
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
                          <p><a href={sitelink} rel="noreferrer" target="_blank">{currentLang === 'eng' ? 'More About '+name : '更多關於 '+name_cht }</a></p>
                          
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
