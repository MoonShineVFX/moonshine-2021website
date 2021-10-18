import React from 'react'
import { useForm } from "react-hook-form";

function AddLab({handleCreateLab}) {
  const {register,handleSubmit } = useForm()
  const onSubmit = data =>{
    console.log(data)
    const currentData = {
      "id": Date.now().toString(36),
      "name": data.name,
      "name_cht":data.name_cht,
      "time_added": new Date().toISOString(),
      "sort_num":"0",
    }
    handleCreateLab(currentData)

  }
  return (
    <div className="miniForm">
      <h3>新增LAB</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label">英文名稱</label>
          <input type="text" className="form-control" id="name"  {...register('name', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="name_cht" className="form-label">中文名稱</label>
          <input type="text" className="form-control" id="name_cht"  {...register('name_cht', { required: true })}/>

        </div>
        <div className="mb-3">
          <label htmlFor="title_1" className="form-label">介紹1 - 英文標題</label>
          <input type="text" className="form-control" id="title_1"  {...register('title_1', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="title_1_cht" className="form-label">介紹1 - 中文標題</label>
          <input type="text" className="form-control" id="title_1_cht"  {...register('title_1_cht', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description_1" className="form-label">介紹1 - 英文</label>
          <textarea type="text" className="form-control" id="description_1"  {...register('description_1', { required: true })}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description_1_cht" className="form-label">介紹1 - 中文</label>
          <textarea type="text" className="form-control" id="description_1_cht"  {...register('description_1_cht', { required: true })}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="title_1" className="form-label">介紹2 - 英文標題</label>
          <input type="text" className="form-control" id="title_1"  {...register('title_1', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="title_1_cht" className="form-label">介紹2 - 中文標題</label>
          <input type="text" className="form-control" id="title_1_cht"  {...register('title_1_cht', { required: true })}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description_1" className="form-label">介紹2 - 英文</label>
          <textarea type="text" className="form-control" id="description_1"  {...register('description_1', { required: true })}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="description_1_cht" className="form-label">介紹2 - 中文</label>
          <textarea type="text" className="form-control" id="description_1_cht"  {...register('description_1_cht', { required: true })}></textarea>
        </div>
        <div className="d-grid gap-2 d-md-block col-12">
          <button type="submit" className="btn btn-primary">新增</button>
          <button type="reset" className="btn btn-light">重設</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddLab
