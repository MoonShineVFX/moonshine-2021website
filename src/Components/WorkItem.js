import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
function WorkItem({data,handler}) {
  const {title,vimeo_id,intro } = data
  // let finalIntro= intro.replace('\\n', '\n')
  const [active , setActive] = useState(false)
  const handleClick= () =>{
    setActive(!active)
    setTimeout(() => {
      handler()
    }, 450);
    // handler()
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(!active)
    }, 500);
    return () => clearTimeout(timer);
  },[]);
  return (
    <div className="workitem">
      <div className={active ? "blackbg active" : "blackbg"} onClick={handleClick}></div>
      <div className={active ? "itemContent active" : "itemContent"}>
        <div className="closeBtn" onClick={handleClick}>X</div>
        <div className="thumb player-wrapper" >
          <ReactPlayer 
            className='react-player'
            url={`https://vimeo.com/${vimeo_id}`} 
            width= "100%"
            height= "100%"
            controls={true}
            volume={0.4}
          />
        </div>
        <article>
          <div className="title">{title}
          </div>
          <div className="description">
          {intro}
          </div>
        </article>
      </div>
    </div>
  )
}

export default WorkItem
