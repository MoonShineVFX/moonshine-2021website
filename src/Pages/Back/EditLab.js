import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";

// 檔案上傳方法
import { useStorage } from "../../Helper/useStorage";

function EditLab({labData,handleUpdateLab,uid}) {
  const {register,handleSubmit,reset } = useForm({defaultValues: { 
    name: "", 
    name_cht: "",
    title_1:"",
    title_1_cht:"",
    description_1:"",
    description_1_cht:"",
    title_2:"",
    title_2_cht:"",
    description_2:"",
    description_2_cht:"",
    video:"",
    sitelink:"",
  }})
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [ singleData , setSingleData] = useState({});

  // 編輯資料
  const onSubmit = data =>{
    let selectedFile = data.file[0];

    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.jpg'

    // 有換圖檔的JSON資料
    const currentDataWithFile ={
      "name": data.name,
      "name_cht": data.name_cht,
      "title_1": data.title_1,
      "title_1_cht": data.title_1_cht,
      "description_1": data.description_1,
      "description_1_cht": data.description_1_cht,
      "title_2": data.title_2,
      "title_2_cht": data.title_2_cht,
      "description_2": data.description_2,
      "description_2_cht": data.description_2_cht,
      "video": data.video,
      "sitelink":data.sitelink,
      "image": imgFileName,
    }

    // 沒有換圖檔的JSON資料
    const currentDataWithoutFile ={
      "name": data.name,
      "name_cht": data.name_cht,
      "title_1": data.title_1,
      "title_1_cht": data.title_1_cht,
      "description_1": data.description_1,
      "description_1_cht": data.description_1_cht,
      "title_2": data.title_2,
      "title_2_cht": data.title_2_cht,
      "description_2": data.description_2,
      "description_2_cht": data.description_2_cht,
      "video": data.video,
      "sitelink":data.sitelink,
    }

    // 如果有新圖檔 執行編輯資料(有圖檔) 沒有新圖檔 修改文字資料
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
        handleUpdateLab(uid,currentDataWithFile)
    }else{
        handleUpdateLab(uid,currentDataWithoutFile)
    }
    
  }

  // 顯示現在要編輯的資料
  const getADoc = async(uid) =>{
    
    var findLike = labData.find(function(item){
      return item.uid === uid;  
    });
    reset(findLike)
    setSingleData(findLike)
  }
  useEffect(()=>{
    getADoc(uid)

  },[uid])

  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  return (
    <div className="miniForm">
      <h3>編輯LAB</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="mb-3 col input-group-sm">
          <label htmlFor="name" className="form-label">英文名稱</label>
          <input type="text" className="form-control" id="name"  {...register('name', { required: true })}/>
        </div>
        <div className="mb-3 col input-group-sm">
          <label htmlFor="name_cht" className="form-label">中文名稱</label>
          <input type="text" className="form-control" id="name_cht"  {...register('name_cht', { required: true })}/>
        </div>
        <div className="mb-3 input-group-sm">
          <label htmlFor="sitelink">網站連結</label>
          <input type="text" className="form-control" id="sitelink"  {...register('sitelink', { required: true })}/>
        </div>
        <div className="mb-3 input-group-sm">
          <label htmlFor="video">vimeo 影片位置(https://player.vimeo.com/video/435638545)</label>
          <input type="text" className="form-control" id="video"  {...register('video', { required: true })}/>
        </div>
        <div className="mb-3 input-group-sm">
          <label htmlFor="file">圖片</label>
          <input type="file" className="form-control" id="file"  {...register('file')} />
          
          {error && <p>{error}</p>} 
          <div className="preview">
            {file && <p>{progress}% uploaded</p>}
            {url && (
                      <p>
                        <b>圖片位置: </b>
                        <a href={url} className="text-break">{url}</a>
                      </p>
            )}
            {url ? <img src={url} className="img-fluid"/>
                :   <img src={singleData ? singleData.imgpath :　"1"} className="img-fluid" />}
          </div>

        </div>
        <div className="d-grid gap-3">
          <div className="p-2 bg-light border  ">
            <div className="mb-3 input-group-sm">
              <label htmlFor="title_1" className="form-label">介紹1 - 英文標題</label>
              <input type="text" className="form-control" id="title_1"  {...register('title_1', { required: true })}/>
            </div>
            <div className="mb-3 input-group-sm">
              <label htmlFor="description_1" className="form-label">介紹1 - 英文</label>
              <textarea type="text" className="form-control" id="description_1"  {...register('description_1', { required: true })}></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label htmlFor="title_1_cht" className="form-label">介紹1 - 中文標題</label>
              <input type="text" className="form-control" id="title_1_cht"  {...register('title_1_cht', { required: true })}/>
            </div>
            <div className="mb-3 input-group-sm">
              <label htmlFor="description_1_cht" className="form-label">介紹1 - 中文</label>
              <textarea type="text" className="form-control" id="description_1_cht"  {...register('description_1_cht', { required: true })}></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label htmlFor="title_1" className="form-label">介紹2 - 英文標題</label>
              <input type="text" className="form-control" id="title_1"  {...register('title_1', { required: true })}/>
            </div>
            <div className="mb-3 input-group-sm">
              <label htmlFor="description_1" className="form-label">介紹2 - 英文</label>
              <textarea type="text" className="form-control" id="description_1"  {...register('description_1', { required: true })}></textarea>
            </div>
          </div>
          <div className="p-2 bg-light border ">
            <div className="mb-3 input-group-sm">
              <label htmlFor="title_1_cht" className="form-label">介紹2 - 中文標題</label>
              <input type="text" className="form-control" id="title_1_cht"  {...register('title_1_cht', { required: true })}/>
            </div>
            <div className="mb-3 input-group-sm">
              <label htmlFor="description_1_cht" className="form-label">介紹2 - 中文</label>
              <textarea type="text" className="form-control" id="description_1_cht"  {...register('description_1_cht', { required: true })}></textarea>
            </div>
          </div>
        </div>



        <div className="d-grid gap-2 d-md-block col-12">
          <button type="submit" className="btn btn-primary">新增</button>
          <button type="reset" className="btn btn-light">重設</button>
        </div>
        
      </form>
    </div>
  )
}

export default EditLab
