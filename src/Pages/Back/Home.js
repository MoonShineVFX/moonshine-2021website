import React, { useState, useEffect,Suspense } from 'react'
import { useRecoilState } from 'recoil';
import { formDisplayState,formStatusState,workState } from './atoms/fromTypes';

//components
import EditForm from './Components/EditForm';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//helper
import {getAllWorksForDashboard ,getCategory,getWorksByCategoryForDashboard, getNextWorkForDashboard,getPrevWorkForDashboard,createWork,deleteWork,updateWork} from '../../Helper/getfunction'
import {LoadingAnim} from '../../Helper/HtmlComponents'
//檔案上傳方法
import { useStorage } from "../../Helper/useStorage";
import { useForm } from 'react-hook-form';

function Home() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const {register, handleSubmit, reset, formState: { errors }} = useForm();
  const [showModal, setShowModal] = useRecoilState(formDisplayState);
  const [formStatus, setFormStatus] = useRecoilState(formStatusState);
  const [singleWork, setSingleWork] = useRecoilState(workState);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg","image/avif"];
  // 若setFile有資料會執行檔案上傳
  const { progress, url } = useStorage(file);
  const [currentFilterCategory, setCurrentFilterCategory] = useState()
  const [currentFilterCategoryId, setCurrentFilterCategoryId] = useState('2')
  const [subCategoryDisplay , setSubCategoryDisaply] = useState('all')
  const handleChange = (e)=>{
    console.log(e.target.value)
    setCurrentFilterCategoryId(e.target.value)
    filterCurrentCategory(e.target.value)
    getWorksByCategoryForDashboard(e.target.value,(res)=>{
      setWorkData(res)
    })
    setSubCategoryDisaply('all')
  }
  const filterCurrentCategory = (cid) =>{
    const filteredCategory =  categoryData.filter((value)=> {
      return value.id === cid
    })
    setCurrentFilterCategory(filteredCategory[0])
  }

  //得知子分類名稱後顯示在表格上
  const filterCurrentSubCategory = (cid,subcid) =>{
  
    if(cid === undefined) return  
    if(subcid === undefined) return  
    // console.log(cid,subcid)
    
    let filteredCategory =  categoryData.filter((value)=> {
      return value.id === cid
    })
    console.log(filteredCategory)
    let filteredSubCategory= filteredCategory[0].sub_category.filter((value)=> {
      return value.id === subcid
    })
    return <div className='font-bold'>- {filteredSubCategory[0].title}</div>
    
  }
  const SubCategory = ({name,cid,subcid,categoryData})=>{

    if(subcid === undefined) return  
    if(categoryData.length === 0) return
    // console.log(cid,subcid)
    // console.log(name+categoryData.length)
    // return name+categoryData.length
    
    let filteredCategory =  categoryData.filter((value)=> {
      return value.id === cid
    })
    let filteredSubCategory= filteredCategory[0].sub_category.filter((value)=> {
      return value.id === subcid
    })
    if(filteredSubCategory.length === 0) return '此項需補選子分類'
    return <div className='font-bold'>- {filteredSubCategory[0].title}</div>
  }
  
  const handleNext = ()=>{
    console.log('next')
    getNextWorkForDashboard(workData[workData.length-1] , function(res){
      console.log(res)
      setWorkData(res)
    })
  }
  const handlePrev=()=>{
    console.log('prev')
    getPrevWorkForDashboard(workData[workData.length-1] , function(res){
      console.log(res)
      setWorkData(res)
    })
  }
  const fetchWorkDoneFun = (customStr, res)=>{
    setShowModal(false)
    if(res === 'success'){
      getWorksByCategoryForDashboard(currentFilterCategoryId,(res)=>{
        setWorkData(res)
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
  const handleCreateWork = (data) =>{
    let currentData ={
      "id": Date.now().toString(36),
      "time_added": new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')  ,
      "title": data.title,
      "intro": data.intro,
      "video_url": data.video_url,
      "sort_num": data.sort_num ? data.sort_num : '666',
      "display":data.display ,
      "year_of_work":data.yearofwork ? data.yearofwork : '2022',
      "category":data.category ? data.category : '1',
      "sub_category":data.sub_category ? data.sub_category : '1',
      "article":data.article?data.article: false ,
      "article_text": data.article_text,
    }
    createWork(currentData,function(res){
      console.log(res)
      fetchWorkDoneFun('新增資料失敗，錯誤訊息:',res)
    })
  }

  const handleEditWork = (uid,data) =>{
    let selectedFile = data.file[0];
    // 設定圖檔重新命名
    const imgFileName = Date.now()+'.jpg'
    let currentDataWithoutImg ={
      "title": data.title,
      "intro": data.intro,
      "video_url": data.video_url,
      "sort_num": data.sort_num ,
      "display":data.display,
      "year_of_work":data.year_of_work ,
      "category":data.category ,
      "sub_category":data.sub_category ,
      "article":data.article?  data.article : false,
      "article_text": data.article_text?data.article_text : '',
    }
    // 如果有圖檔存在 執行新增資料 否則不執行
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {

          setError(null);
          if(data.sub_category ==='vfx01'){
            setFile({
              "filename":imgFileName,
              "file":selectedFile,
              "folder":'data/',
              "maxWidth": 500,
              "maxHeight":700,
              "compressFormat":"WEBP",
              "quality":95
            });
          }else{
            setFile({
              "filename":imgFileName,
              "file":selectedFile,
              "folder":'data/',
              "maxWidth":640 ,
              "maxHeight":360,
              "compressFormat":"WEBP",
              "quality":95
            });
          }
          
      } else {
          setFile(null);
          setError("Please select an image file (png or jpg)");
      }
      updateWork(uid,{...currentDataWithoutImg , "img": imgFileName },function(res){
        console.log(res)
        fetchWorkDoneFun('編輯資料失敗，錯誤訊息:',res)

      })
    } else{
      updateWork(uid,currentDataWithoutImg,function(res){
        console.log(res)
        fetchWorkDoneFun('編輯資料失敗，錯誤訊息:',res)
      })
    }

  }
  const onDelete = (uid)=>{
    confirmAlert({
      title: '確認刪除這筆資料',
      buttons: [
        {
          label: '確定',
          onClick: () =>  deleteWork(uid,function(res){
            fetchWorkDoneFun('刪除資料失敗，錯誤訊息:',res)
          })
        },
        {
          label: '取消',
        }
      ]
    });
   
  }
  useEffect(()=>{
   getCategory(  (res)=>{
      setCategoryData(res)
      setCurrentFilterCategory(res[0])
    })
    getWorksByCategoryForDashboard('2',(res)=>{
      setWorkData(res)
    })



  },[])


  return (
    <section className='w-full bg-white p-5 text-black relative'>
      <div className='w-full border-b mb-10'>
        <h1>管理作品</h1>
      </div>
      
      <button 
        className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600'
        onClick={() => {
          setShowModal(true);
          setFormStatus('ADD')
        }}
      >新增 </button>
      <div className='border p-2 mt-4'>
        <div className='flex gap-2 items-center'>
          <div className='font-bold'>篩選管理</div>
          <div className="  flex items-center gap-2">
            <div  className="   text-gray-700">分類</div>
            <select className="form-control  px-3 text-base p-2 font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " id="category" {...register("category")}
            onChange={(e)=>(handleChange(e))}
            >
              {categoryData.map((item,index)=>{
                return(
                  <option key={item.id} value={item.id}>{item.name} - {item.name_cht}</option>
                )
              })}
            </select>
          </div>
          <div className='flex gap-2 items-center'>
            <div>- 子分類</div>
            <div className='p-y px-3 bg-slate-200 hover:bg-slate-300 cursor-pointer  rounded-full'  onClick={()=>setSubCategoryDisaply('all')}>全部</div>
            {
              currentFilterCategory &&
              currentFilterCategory.sub_category ? currentFilterCategory.sub_category.map((item,index)=>{
                return(
                  <div 
                    key={item.id} className='p-y px-3 bg-slate-200 hover:bg-slate-300 cursor-pointer  rounded-full'
                    onClick={()=>setSubCategoryDisaply(item.id)}
                  >
                    {item.title} </div>
                )
              }): <div className='text-xs text-gray-400'>沒有子分類</div>
            }
          </div>

        </div>
        
      </div>
      <div id="table" className='w-full mt-5  min-h-screen' >
        <table className="table-auto   border border-slate-200 w-full rounded-md ">
          <thead>
            <tr>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品ID</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>排序</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>作品名稱</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>分類-子分類</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>前台顯示狀態</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>上傳日期</th>
              <th className='bg-zinc-100 border-b border-zinc-300 text-left'>編輯</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {
              workData ?
              workData.map((item,index)=>{
                const {uid,id, display, title, time_added,category,sort_num,sub_category} =item
                return(
                  <tr className={' hover:bg-zinc-200' + ( subCategoryDisplay === 'all' ? '  table-row ' :  subCategoryDisplay === sub_category ? ' table-row' : ' hidden' )} key={id+title}>
                    <td className='p-2 text-xs'>{id}</td>
                    <td className='p-2 text-xs'>{sort_num}</td>
                    <td className='p-2 text-sm'>{title}</td>
                    <td className='p-2 text-xs'>
                      {categoryData.map((item) => {
                        if(item.id === category)
                          return <div key={item.id}>{item.name}</div>
                      })}
                      {sub_category === '沒有子分類' ? sub_category : <SubCategory name={title} cid={category} subcid={sub_category} categoryData={categoryData} />}
                    </td>
                    <td className='p-2 text-xs'>{display === '1' ? '顯示' : '不顯示'}</td>
                    <td className='p-2 text-xs'>{time_added.toLocaleString().substr(0,10)}</td>
                    <td className='p-2 text-xs'>
                      <button 
                      className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600 '
                      onClick={() => {
                        setShowModal(true);
                        setSingleWork(item)
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
      <div className='mt-3 flex gap-2 hidden'>
        <button className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600' onClick={handlePrev}>Prev</button>
        <button className='text-xs  rounded-md bg-black text-white py-2 px-6 hover:bg-slate-600' onClick={handleNext}>Next</button>
      </div>


      {showModal && <EditForm categoryData={categoryData} handleCreateWork={handleCreateWork} handleEditWork={handleEditWork} />}
    </section>
    

  )
}

export default Home