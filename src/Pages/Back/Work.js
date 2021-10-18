import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import AddWork from './AddWork'
import EditWork from './EditWork';
function Work({handleCreateWork , workData , categoryData,handleDeleteWork , handleUpdateWork,handleUpdateWorkDisplay,handleUpdateWorkCatrgory}) {
  const {register,handleSubmit } = useForm()
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [isChecked, setIsChecked] = useState(false);
  const [switchUi , setSwitchUi] = useState({data: "", uid: ""})
  
  const onSubmit = data =>{
    let selectedFile = data.file[0];
    const imgFileName = Date.now()+'.jpg'
    const currentData ={
      "id": Date.now().toString(36),
      "time_added": new Date().toISOString(),
      "title": data.title,
      "intro": data.description,
      "vimeo_id": data.vimeoid,
      "img": imgFileName,
      "sort_num":"0",
      "display":"1"
    }
    if (selectedFile) {
        if (types.includes(selectedFile.type)) {
            setError(null);
            setFile({
              "filename":imgFileName,
              "file":selectedFile
            });
        } else {
            setFile(null);
            setError("Please select an image file (png or jpg)");
        }
    }
    handleCreateWork(currentData)
  }
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () =>  handleDeleteWork(uid)
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  const onUpdate = (id)=>{
    handleUpdateWork(id)
  }
 
  const handleChange = (uid,display) => {
    handleUpdateWorkDisplay(uid,display)
    // console.log( e.target.defaultChecked)
    // e.target.defaultChecked = false
  };
  const handleCategoryId = (id,uid) => {
    handleUpdateWorkCatrgory(id,uid)
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
      <div className="col-9">
        <h3>作品列表
        <button 
            type="button" 
            className="btn btn-primary standardBtn ms-2" 
            onClick={()=>{handleClick('create')}}
          >新增作品</button>
        </h3>
        <table className="table cmsWork table-hover ">
          <thead className="thead-color">
              <tr>
                <th scope="col">作品縮圖</th>
                <th scope="col">作品名稱</th>
                <th scope="col">分類項目(擇一)</th>
                <th scope="col">是否可見</th>
                <th scope="col">編輯/刪除</th>
              </tr>
            </thead>
            <tbody>
            {workData.length>0 ? 
              workData.map((item,index)=>{
                const {uid,id,title ,img,vimeo_id,display,imgpath , category} = item
                return(
                
                  <tr key={title+id}>
                    <td > <img src={imgpath ? imgpath : 'https://via.placeholder.com/150?text=Process'} alt="" /></td>
                    <td className="title">
                      <span>id #{id}</span> <br />
                      <p>{title}</p>
                      <span>VIMEO <a href={`https://vimeo.com/${vimeo_id}`} target="_blank" rel="noreferrer" >{vimeo_id}</a></span> </td>
                    <td>
                      <ul className="categoryList">
                        {
                          categoryData ? 
                          categoryData.map((item,index)=>{
                            const{id, name , name_cht } = item
                            return(
                              <li 
                                key={name+id} 
                                className={id ===category ? 'active' : ''}
                                onClick={()=>{handleCategoryId(id,uid)}}
                              >
                                {name}
                              </li>
                            )
                          }):'資料讀取中...'
                        }
                      </ul>
                    </td>
                    <td>
                      
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={ display === "1" ? !isChecked: isChecked} onChange={(e)=>{handleChange(uid,display)}} />
                        </div>
                    </td>
                    <td>
                      <div className="d-grid gap-2 d-md-block">
                        <button 
                          type="button" 
                          className="btn btn-success btn-sm"
                          onClick={()=>{handleClick('edit' , uid)}}>編輯</button>
                        <button type="button" className="btn btn-light btn-sm" onClick={()=> {onDelete(uid)}}>刪除</button>
                      </div>
                    </td>
                  </tr>
                  
                )
              }) :  <tr class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </tr>
            }
            </tbody>
        </table>

      </div>
      <div className="col-3 position-sticky bg-light text-muted align-self-start py-3 fixed-top" style={{minHeight:'100vh' , marginTop:'-25px'}}>
      {(() => {
        switch (switchUi.string) {
          case 'create':
              return (
                <AddWork handleCreateWork={handleCreateWork}/>
              )
          case 'edit':
              return (
                <EditWork handleUpdateWork={handleUpdateWork} uid={switchUi.uid} workData={workData}/>
              )
          default:
              return (
                <AddWork handleCreateWork={handleCreateWork}/>
              )
        }
      })()}

      </div>
      
    </div>
  )
}

export default Work