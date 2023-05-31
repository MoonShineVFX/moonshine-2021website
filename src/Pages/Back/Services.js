import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,adminServiceState } from './atoms/fromTypes';

//components
import ServiceForm from './Components/ServiceForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//helper
import {getServiceForDashboard,createService, deleteService, updateService} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'
//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";
function Services() {
  const [serviceData, setServiceData] = useState([]);

  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleData, setSingleData] = useRecoilState(adminServiceState);

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
          onClick: () =>  deleteService(uid,function(res){
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
      getServiceForDashboard((res)=>{
        setServiceData(res)
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
      "title_cht": data.title_cht,
      "sort_num": data.sort_num ? data.sort_num : '666',
      "display":data.display ,
      "intro": data.intro,
      "intro_cht": data.intro_cht,
      "params_name": data.params_name,
      "link": data.link,
      "article":"0"

    }
    createService(currentData,function(res){
      console.log(res)
      fetchDataDoneFun('新增資料失敗，錯誤訊息:',res)
    })
  }
  const handleEdit = (uid,data) =>{
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.png'
    let currentData = {
      "title": data.title,
      "title_cht": data.title_cht,
      "sort_num": data.sort_num ,
      "display":data.display ,
      "intro": data.intro,
      "intro_cht": data.intro_cht,
      "params_name": data.params_name,
      "link": data.link,
      "article" : data.articleCheckbox === true ? "1" :"0"
    }
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
          setError(null);
          setFile({
            "filename":imgFileName,
            "file":selectedFile,
            "folder":'img_service/',
            "maxWidth":1920,
            "maxHeight":1080,
            "compressFormat":"JPEG",
            "quality":80
          });
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
      updateService(uid,{...currentData ,"img": imgFileName },function(res){
        console.log(res)
        fetchDataDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else if(data.articleCheckbox === true){
      let children={
          "article_title" : data.article_title,
          "article_subtitle" : data.article_subtitle,
          "article_intro" : data.article_intro ,
      }
      updateService(uid,{...currentData ,"children":{"article_title" : data.article_title,"article_subtitle" : data.article_subtitle,"article_intro" : data.article_intro} },function(res){
        console.log(res)
        fetchDataDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else {
      updateService(uid,currentData,function(res){
        console.log(res)
        fetchDataDoneFun('編輯資料失敗，錯誤訊息:',res)
      })
    }

    
  }
  useEffect(()=>{
    getServiceForDashboard((res)=>{
      setServiceData(res)
    })


  },[])
  console.log(serviceData)


  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理服務項目</h1>
      </div>
      <button 
          className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
          onClick={() => {
            setShowModal(true);
            setFormStatus('ADD')
          }}

        >新增服務項目 </button>
      <div id="table" className='w-full mt-5' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>名稱(英 - 中)</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>形式</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>顯示</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              serviceData ?
              serviceData.map((item,index)=>{
                const {uid,id, title, intro,sort_num,params_name,imgpath,display,article,title_cht} =item
                return(
                  <tr className=' hover:bg-zinc-200' key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-xs'>{title} - {title_cht}</td>
                    <td className='p-2 text-xs'>{article === '1' ? '站內介紹' : '導出外部連結'}</td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>

   
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleData(item)
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

      {showModal && <ServiceForm  handleCreate={handleCreate} handleEdit={handleEdit} />}
    </section>
  )
}

export default Services