import React ,{useEffect,useState}from 'react'
import { useForm } from "react-hook-form";

//firebase 連線
import db from '../../Config/firebase'
import { doc,getDoc  } from "firebase/firestore"

function EditCategory({handleUpdateCategory,uid}) {
  const {register,handleSubmit,reset } = useForm(
    {defaultValues: { name: "", name_cht: "" }}
  )
  const [cateData , setCateData] =  useState({});

  // 編輯資料
  const onSubmit = data =>{
    console.log(data)
    const currentData = {
      name: data.name,
      name_cht:data.name_cht,
    }
    // console.log(uid,currentData)
    handleUpdateCategory(uid,currentData)
  }
  const getADoc = async(uid)=>{
    const docRef = doc(db, "category", uid);
    const docSnap = await getDoc(docRef);
    setCateData(docSnap.data())
    // console.log(docSnap.data())
    reset(docSnap.data())
  }
  useEffect(()=>{
    getADoc(uid)

  },[uid])
  return (
    <div className="miniForm">
      <h3>編輯分類</h3>
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
            <button type="submit" className="btn btn-primary">儲存</button>
            <button type="reset" className="btn btn-light">取消</button>
          </div>
          
        </form>

    </div>
  )
}

export default EditCategory
