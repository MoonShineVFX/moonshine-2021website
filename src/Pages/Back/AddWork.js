import React,{useState} from 'react'
import { useForm } from "react-hook-form";

//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";

function AddWrok({handleCreateWork}) {
  const {register,handleSubmit } = useForm()
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  // 新增資料
  const onSubmit = data =>{
    let selectedFile = data.file[0];

    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.jpg'

    // 表單資料成為 JSON 資料
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
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
          setError(null);
          setFile({
            "filename":imgFileName,
            "file":selectedFile,
            "folder":'data/'
          });
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
    }
    handleCreateWork(currentData)
  }

  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  return (
    <div>
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
                        <b>圖片位置: </b>
                        <a href={url} className="text-break">{url}</a>
                      </p>
            )}
            {url && <img src={url} className="img-fluid"/>}
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
  )
}

export default AddWrok
