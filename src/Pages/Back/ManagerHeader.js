import React ,{useEffect,useState} from 'react'
import { useForm } from "react-hook-form";
function ManagerHeader({headerData,handleUpdateHeader}) {
  const {register,handleSubmit,reset } = useForm(
    {defaultValues: { video: "" }}
  )

  // 編輯資料
  const onSubmit = data =>{
    console.log(data)
    const currentData = {
      video: data.video,
    }
    handleUpdateHeader(headerData[0].uid,currentData)
  }
  useEffect(()=>{
    reset(headerData[0])
  },[headerData])
  return (
    <div className="miniForm">
      <h3>編輯 Header 內容</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">影片位置</label>
            <input type="text" className="form-control" id="video"  {...register('video', { required: true })}/>
          </div>

          <div className="d-grid gap-2 d-md-block col-12">
            <button type="submit" className="btn btn-primary">儲存</button>
            <button type="reset" className="btn btn-light">取消</button>
          </div>
          
        </form>

    </div>
  )
}

export default ManagerHeader
