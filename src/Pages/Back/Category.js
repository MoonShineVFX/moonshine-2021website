import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,adminCategoryState } from './atoms/fromTypes';
//components
import CategoryForm from './Components/CategoryForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//helper
import {getAllCategoryForDashboard, createCategory, deleteCategory, updateCategory} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'


function Category() {
  const [categoryData, setCategoryData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleCategory, setSingleCategory] = useRecoilState(adminCategoryState);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () =>  deleteCategory(uid,function(res){
            fetchCategoryDoneFun('刪除資料失敗，錯誤訊息:',res)
          })
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  const fetchCategoryDoneFun = (customStr, res)=>{
    setShowModal(false)
    if(res === 'success'){
      getAllCategoryForDashboard((res)=>{
        setCategoryData(res)
      })
    }else{
      showErrorAlert(customStr,res)
    }
  }
  const showErrorAlert = (str,res) =>{
    confirmAlert({
      title: str+ res,
      buttons: [
        {
          label: '確定',
        },
        {
          label: '取消',
        }
      ]
    });
  }
  function convertToSlug(Text) {
    return Text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
  }
  const handleCreateCategory = (data) =>{
    let currentData ={
      "id": Date.now().toString(36),
      "time_added": new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')  ,
      "name": data.name,
      "name_cht": data.name_cht,
      "slug":convertToSlug(data.name),
      "video_url": data.video_url,
      "cover_video":data.cover_video,
      "sort_num": data.sort_num ? data.sort_num : '666',
    }
    createCategory(currentData,function(res){
      console.log(res)
      fetchCategoryDoneFun('新增資料失敗，錯誤訊息:',res)
    })
  }
  const handleEditCategory = (uid,data) =>{
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.jpg'
    let currentDataWithoutImg ={
      "name": data.name,
      "name_cht": data.name_cht,
      "slug":convertToSlug(data.name),
      "cover_video":data.cover_video,
      "video_url": data.video_url,
      "sort_num": data.sort_num ? data.sort_num : '666',
    }
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
          setError(null);
          setFile({
            "filename":imgFileName,
            "file":selectedFile,
            "folder":'data/',
            "maxWidth":500,
            "maxHeight":283,
            "compressFormat":"JPEG",
            "quality":75
          });
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
      updateCategory(uid,{...currentDataWithoutImg , "img": imgFileName },function(res){
        console.log(res)
        fetchCategoryDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else{
      updateCategory(uid,currentDataWithoutImg,function(res){
        console.log(res)
        fetchCategoryDoneFun('編輯資料失敗，錯誤訊息:',res)
      })
    }
  }
  useEffect(()=>{
    getAllCategoryForDashboard((res)=>{
      setCategoryData(res)
    })


  },[])
  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理分類</h1>
      </div>
      <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
          onClick={() => {
            setShowModal(true);
            setFormStatus('ADD')
          }}

        >新增分類 </button>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類名稱(英 - 中)</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>Slug</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              categoryData ?
              categoryData.map((item,index)=>{
                const {uid,id, name, name_cht,sort_num,display,slug} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+name}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{name} - {name_cht}</td>
                    <td className='p-2 text-xs'>{slug}</td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleCategory(item)
                        setFormStatus('EDIT')
                      }}>編輯</button>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={()=> {onDelete(uid)}}>刪除</button>

                    </td>
                  </tr>
                )
              }): <LoadingAnim />
            }

          
          </tbody>
        </table>
      </div>

      {showModal && <CategoryForm  handleCreateCategory={handleCreateCategory} handleEditCategory={handleEditCategory} />}
    </section>
  )
}

export default Category