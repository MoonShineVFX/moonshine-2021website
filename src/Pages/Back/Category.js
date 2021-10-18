import React,{useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
function Category({categoryData ,handleCreateCategory,handleDeleteCategory,handleUpdateCategory}) {
  const [switchUi , setSwitchUi] = useState({data: "", uid: ""})
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () => handleDeleteCategory(uid)
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
      <div className="col-10">
        
        <h3>分類列表    
          <button 
            type="button" 
            className="btn btn-primary standardBtn ms-2" 
            onClick={()=>{handleClick('create')}}
          >新增分類</button>
        </h3>
        <table className="table cmsWork table-hover ">
          <thead className="thead-color">
              <tr>
                <th scope="col">#id</th>
                <th scope="col">作品名稱</th>
                <th scope="col">作品名稱英文</th>
                <th scope="col">編輯/刪除</th>
              </tr>
            </thead>
            <tbody>
            {categoryData.length>0 ? 
              categoryData.map((item,index)=>{
                const {id,name ,name_cht,uid} = item
                return(
                
                  <tr key={name+id}>
                    <td className="id">{id}</td>
                    <td className="title"> {name}</td>
                    <td className="title">{name_cht} </td>

                    <td>
                      <div className="d-grid gap-2 d-md-block">
                        <button 
                          type="button" 
                          className="btn btn-success btn-sm"
                          onClick={()=>{handleClick('edit' , uid)}} >編輯</button>
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
      <div className="col-2 position-sticky bg-light text-muted align-self-start py-3 fixed-top" style={{minHeight:'100vh' , marginTop:'-25px'}}>
      {(() => {
          switch (switchUi.string) {
            case 'create':
                return (
                  <AddCategory handleCreateCategory={handleCreateCategory}/>
                )
            case 'edit':
                return (
                  <EditCategory handleUpdateCategory={handleUpdateCategory} uid={switchUi.uid}/>
                )
            default:
                return (
                  <AddCategory handleCreateCategory={handleCreateCategory}/>
                )
          }
      })()}
        
      </div>
      
    </div>
  )
}

export default Category
