import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { useStorage } from "../../Helper/useStorage";
function Addwork({handleAddWork}) {
  const {register,handleSubmit } = useForm()
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const onSubmit = data =>{
    handleAddWork({
      "id": Date.now(),
      "time_added": new Date().toISOString(),
      "title": data.title,
      "intro": data.description,
      "vimeo_id": data.vimeoid,
      "sort_num":"0"
    })
  }

  const handleChange = (e) => {
      let selectedFile = e.target.files[0];

      if (selectedFile) {
          if (types.includes(selectedFile.type)) {
              setError(null);
              setFile(selectedFile);
          } else {
              setFile(null);
              setError("Please select an image file (png or jpg)");
          }
      }
  };
  
  // Getting the progress and url from the hook
  const { progress, url , rename } = useStorage(file);
  return (
    <div>
      <h3>新增作品</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title">名稱</label>
          <input type="text" className="form-control" id="title"  {...register('title', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="vimeoid">vimeo 影片 ID (example: 60964497)</label>
          <input type="text" className="form-control" id="vimeoid"  {...register('vimeoid', { required: true })}/>

        </div>
        <div className="mb-3">
          <label htmlFor="file">圖片</label>
          <input type="file" className="form-control" id="file"  onChange={handleChange}/>
          
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

        <button type="submit" className="btn btn-primary">儲存</button>
        <button type="reset" className="btn btn-primary">重設</button>
      </form>
    </div>
  )
}

export default Addwork
