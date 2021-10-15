import React from 'react'
import { useForm } from "react-hook-form";
function AddCategory() {
  const {register,handleSubmit } = useForm()
  const onSubmit = data =>{
    console.log(data)
  }
  return (
    <div className="miniForm">
      <h3>新增分類</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="col mb-3 ">
            <label htmlFor="title" className="form-label">英文名稱</label>
            <input type="text" className="form-control" id="title"  {...register('title', { required: true })}/>
          </div>
          <div className="col mb-3">
            <label htmlFor="title_cht" className="form-label">中文名稱</label>
            <input type="text" className="form-control" id="title_cht"  {...register('title_cht', { required: true })}/>

          </div>
          <div className="d-grid gap-2 d-md-block col-12">
            <button type="submit" className="btn btn-primary">儲存</button>
            <button type="reset" className="btn btn-light">重設</button>
          </div>
          
        </form>

    </div>
  )
}

export default AddCategory
