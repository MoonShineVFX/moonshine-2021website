import React,{useState,useEffect} from 'react'


function Home({workData , handler}) {
  const handleClick= (dataId) =>{
    handler(dataId)
  }
  
  return (
    <div className="home">
       
        <div className="catrgories">
          <ul>
            <li>VFX</li>
            <li>VFX</li>
            <li>VFX</li>
            <li>VFX</li>
          </ul>
        </div>
        <div className="workContainer">
          <ul>
            {workData ? 
              workData.map((item,index)=>{
                const {id,title ,vimeo_id,img} = item
                return(
                
                      <li key={id} className="work" onClick={()=> handleClick(id)}>
                        <div className="imgRect" style={{backgroundImage : `url(https://www.moonshine.tw/data/img_work/${img})`}}></div>
                        <div className="title">{title} </div>
                      </li>
                  
                )
              }) : <li>目前還沒有</li>
            }
            <li>
              <div className="imgRect"></div>
              <div className="title"></div>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Home
