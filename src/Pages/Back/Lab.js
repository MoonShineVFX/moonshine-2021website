import React,{useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import AddLab from './AddLab';
function Lab({labinfoData,labData,handleDeleteLabData}) {
  const [switchUi , setSwitchUi] = useState({data: "", uid: ""})
  console.log(labinfoData)
  console.log(labData)
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () => handleDeleteLabData(uid)
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  // 按下功能切換
  const handleClick=(string,uid)=>{
    setSwitchUi({
      string,
      uid
    })
    console.log(switchUi)
  }
  return (
    <div className="row">
      <div className="col">
        LAB info


        <div className="labdata">
          <h3>Lab列表
            <button 
              type="button" 
              className="btn btn-primary standardBtn ms-2" 
              onClick={()=>{handleClick('create')}}
            >新增LAB</button>
          </h3>
          <div class="row  g-4">
          {labData.length>0 ? 
            labData.map((item,index)=>{
              const {id,name ,name_cht,description_1, description_1_cht, description_2, description_2_cht,sitelink,title_1,title_1_cht,title_2,title_2_cht,uid} = item
              return(
                
                <div class="col-6">
                  <div class="card">
                    <div class="card-body">
                      <h5>#{id}</h5>
                      <div class="fs-6"><span className="badge  bg-secondary">英文名稱 / 中文名稱</span> {name} /  {name_cht}</div>

                      <div class="card-text"><span className="badge  bg-secondary">介紹-1 英文</span><br /> 
                        <div className="fs-6 fw-bolder">{title_1}</div>
                        <div className="fs-6 fw-light">{description_1}</div>
                        
                      </div>
                      <div class="card-text"><span className="badge  bg-secondary">介紹-1 中文</span><br /> 
                        <div className="fs-6 fw-bolder">{title_1_cht}</div>
                        <div className="fs-6 fw-light">{description_1_cht}</div>
                        
                      </div>
                      <div class="card-text"><span className="badge  bg-secondary">介紹-2 英文</span><br /> 
                        <div className="fs-6 fw-bolder">{title_2}</div>
                        <div className="fs-6 fw-light">{description_2}</div>
                        
                      </div>
                      <div class="card-text"><span className="badge  bg-secondary">介紹-2 中文</span><br /> 
                        <div className="fs-6 fw-bolder">{title_2_cht}</div>
                        <div className="fs-6 fw-light">{description_2_cht}</div>
                        
                      </div>
                      
                      <p class="card-text"><span className="badge  bg-secondary">網站連結</span><br /><a href={sitelink} target="_blank" rel="noreferrer">{sitelink}</a></p>
                      <div className="d-grid gap-2 d-md-block">
                        <button 
                          type="button" 
                          className="btn btn-primary btn-sm"
                          onClick={()=>{handleClick('edit' , uid)}} >編輯</button>
                        <button type="button" className="btn btn-light btn-sm" onClick={()=> {onDelete(uid)}}>刪除</button>
                      </div>
                    </div>
                    

                  </div>
                </div>
                
              )
            }) :  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
            }
          </div>

          
          
        </div>
      </div>
      <div className="col-2 position-sticky bg-light text-muted align-self-start py-3 fixed-top" style={{minHeight:'100vh' , marginTop:'-25px'}}>
      {(() => {
          switch (switchUi.string) {
            case 'create':
                return ( <AddLab/>
                )
            case 'edit':
                return (<div>2</div>
                )
            default:
                return (<AddLab/>
                )
          }
      })()}
        
      </div>
       

    </div>
  )
}

export default Lab
