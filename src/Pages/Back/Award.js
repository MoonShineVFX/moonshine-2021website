import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,adminAwardState } from './atoms/fromTypes';
//components
import AwardForm from './Components/AwardForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import csss

//helper
import {getAwardForDashboard, createAward, deleteAward, updateAward} from '../../Helper/getfunction'
//loading
import {LoadingAnim} from '../../Helper/HtmlComponents'
//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";

function Award() {
  const [awardData, setAwardData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleAward, setSingleAward] = useRecoilState(adminAwardState);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);

  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () =>  deleteAward(uid,function(res){
            fetchDataDoneFun('刪除資料失敗，錯誤訊息:',res)
          })
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  const fetchDataDoneFun = (customStr, res)=>{
    setShowModal(false)
    if(res === 'success'){
      getAwardForDashboard((res)=>{
        setAwardData(res)
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
  const handleCreate = (data) =>{
    let currentData ={
      "id": Date.now().toString(36),
      "time_added": new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')  ,
      "title": data.title,
      "sort_num": data.sort_num ? data.sort_num : '666',
      "display":data.display 
    }
    createAward(currentData,function(res){
      console.log(res)
      fetchDataDoneFun('新增資料失敗，錯誤訊息:',res)
    })
  }
  const handleEdit = (uid,data) =>{
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.png'
    let currentDataWithoutImg ={
      "title": data.title,
      "sort_num": data.sort_num ,
      "display":data.display 
    }
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
          setError(null);
          setFile({
            "filename":imgFileName,
            "file":selectedFile,
            "folder":'img_award/',
            "maxWidth":100,
            "maxHeight":100,
            "compressFormat":"PNG",
            "quality":90
          });
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
      updateAward(uid,{...currentDataWithoutImg ,"img": imgFileName },function(res){
        console.log(res)
        fetchDataDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else{
      updateAward(uid,currentDataWithoutImg,function(res){
        console.log(res)
        fetchDataDoneFun('編輯資料失敗，錯誤訊息:',res)
      })
    }

  }



  useEffect(()=>{
    getAwardForDashboard((res)=>{
      setAwardData(res)
    })


  },[])
  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理獎項</h1>
      </div>
      <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
          onClick={() => {
            setShowModal(true);
            setFormStatus('ADD')
          }}

        >新增獎項 </button>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>獎項名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>圖片(PNG)</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              awardData ?
              awardData.map((item,index)=>{
                const {uid,id, title, imgpath,sort_num,display} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{title}</td>
                    <td className='p-2 text-xs'>{imgpath ? '是' : '否'}</td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleAward(item)
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

      {showModal && <AwardForm  handleCreate={handleCreate} handleEdit={handleEdit} />}
    </section>
  )
}

export default Award