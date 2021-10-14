import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useStorage } from "../../Helper/useStorage";
function Addwork({handleCreateWork , workData , categoryData,handleDeleteWork , handleUpdateWork,handleUpdateWorkDisplay}) {
  const {register,handleSubmit } = useForm()
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [isChecked, setIsChecked] = useState(false);
  console.log(workData)
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

  
  // Getting the progress and url from the hook
  const { progress, url } = useStorage(file);
  return (
    <div className="row">
      <div className="col-12">
        <h3>作品列表</h3>
        <table className="table cmsWork table-hover ">
          <thead className="thead-color">
              <tr>
                <th scope="col">#id</th>
                <th scope="col">作品縮圖</th>
                <th scope="col">作品名稱</th>
                <th scope="col">vimeo</th>
                <th scope="col">分類項目(擇一)</th>
                <th scope="col">是否可見</th>
                <th scope="col">編輯/刪除</th>
              </tr>
            </thead>
            <tbody>
            {workData ? 
              workData.map((item,index)=>{
                const {uid,id,title ,img,vimeo_id,display,imgpath} = item
                return(
                
                  <tr key={title+id}>
                    <td className="id">{id}</td>
                    <td > <img src="" alt="" />  </td>
                    <td className="title">{title} </td>
                    <td> <a href={`https://vimeo.com/${vimeo_id}`} target="_blank" rel="noreferrer" >{vimeo_id}</a></td>
                    <td>
                      <ul className="categoryList">
                        {
                          categoryData ? 
                          categoryData.map((item,index)=>{
                            const{id, name , name_cht } = item
                            return(
                              <li key={name+id}>
                                {name}
                              </li>
                            )
                          }):<li>目前還沒有</li>
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
                        <button type="button" className="btn btn-success btn-sm">編輯</button>
                        <button type="button" className="btn btn-light btn-sm" onClick={()=> {onDelete(uid)}}>刪除</button>
                      </div>
                    </td>
                  </tr>
                  
                )
              }) : <li>目前還沒有</li>
            }
            </tbody>
        </table>

      </div>
      <div className="col-3">
        <h3>新增作品</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title">名稱</label>
            <input type="text" className="form-control" id="title"  {...register('title', { required: true })}/>
          </div>
          <div className="mb-3">
            <label htmlFor="vimeoid">vimeo 影片 ID (example: 594440744)</label>
            <input type="text" className="form-control" id="vimeoid"  {...register('vimeoid', { required: true })}/>

          </div>
          <div className="mb-3">
            <label htmlFor="file">圖片</label>
            <input type="file" className="form-control" id="file"  {...register('file', { required: true })} />
            
            {error && <p>{error}</p>} 
            <div className="preview">
              {file && <p>{progress}% uploaded</p>}
              {url && (
                        <p>
                          <b>File url: </b>
                          <a href={url}>{url}</a>
                        </p>
              )}
              {url && <img src={url} />}
            </div>

          </div>
          <div className="mb-3">
            <label htmlFor="description">簡介(credit)</label>
            <textarea name="description" className="form-control" id="description" cols="30" rows="10" {...register('description', { required: true })}></textarea>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button type="submit" className="btn btn-primary">儲存</button>
            <button type="reset" className="btn btn-light">重設</button>
          </div>
          
        </form>

      </div>
      
    </div>
  )
}

export default Addwork
