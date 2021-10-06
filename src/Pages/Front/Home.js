import React from 'react'


function Home({workData , handler , categoryData ,currentLang , switchCategory}) {
  const handleClick= (dataId) =>{
    handler(dataId)
  }
  const handleCategorySwitch = (id) =>{
    switchCategory(id)
  }


  
  return (
    <div className="home">
       
        <div className="catrgories">
          <ul>
            {
              categoryData ? 
              categoryData.map((item,index)=>{
                const{id, name , name_cht ,sort_num} = item
                return(
                  <li key={name+id} onClick={()=> handleCategorySwitch(id)} className="animate__animated animate__fadeIn">
                    {currentLang === 'eng' ? name : name_cht}
                  </li>
                )
              }):<li>目前還沒有</li>
            }
          </ul>
        </div>
        <div className="workContainer">
          <ul>
            {workData ? 
              workData.map((item,index)=>{
                const {id,title ,vimeo_id,img} = item
                return(
                
                      <li key={title+id} className="work" onClick={()=> handleClick(id)}>
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
