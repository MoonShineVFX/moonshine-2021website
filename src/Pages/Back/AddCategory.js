import React from 'react'
import { useForm } from "react-hook-form";
function AddCategory({handleCreateCategory}) {
  const {register,handleSubmit } = useForm()

  // 新增資料
  const onSubmit = data =>{
    console.log(data)

    // 表單資料成為 JSON 資料
    const currentData = {
      "id": Date.now().toString(36),
      "name": data.name,
      "name_cht":data.name_cht,
      "time_added": new Date().toISOString(),
      "sort_num":"0",
    }
    handleCreateCategory(currentData)

  }
  return (
    <div className="miniForm">
      <h3>新增分類</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">英文名稱</label>
          <input type="text" className="form-control" id="name"  {...register('name', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name_cht" className="form-label">中文名稱</label>
          <input type="text" className="form-control" id="name_cht"  {...register('name_cht', { required: true })}/>

        </div>
        <div className="d-grid gap-2 d-md-block col-12">
          <button type="submit" className="btn btn-primary">新增</button>
          <button type="reset" className="btn btn-light">重設</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddCategory
