import React,{useState} from 'react'

function Home({workData , handler , categoryData ,currentLang , switchCategory}) {
  const [active ,setActive] = useState('0')

  // 點擊作品
  const handleClick= (dataId) =>{
    handler(dataId)
  }

  // 選擇分類
  const handleCategorySwitch = (id) =>{
    setActive(id)
    switchCategory(id)
  }


  
  return (
    <div className="home">
        <div className="catrgories">
          <ul>
            {
              categoryData ? 
              categoryData.map((item,index)=>{
                const{id, name , name_cht } = item
                return(
                  <li key={name+id} 
                      onClick={()=> handleCategorySwitch(id)} 
                      className={ active === id ? "animate__animated animate__fadeIn active":"animate__animated animate__fadeIn" }>
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
                const {id,title ,img,imgpath,display} = item
                return(
                      display === "1" ? <li key={title+id} className="work animate__animated animate__fadeIn" onClick={()=> handleClick(id)}>
                      <div className="imgRect" style={{backgroundImage : `url(${imgpath})`}}></div>
                      <div className="title">{title} </div>
                    </li> :""
                      
                  
                )
              }) : <li>目前還沒有</li>
            }

          </ul>
        </div>
    </div>
  )
}

export default Home
