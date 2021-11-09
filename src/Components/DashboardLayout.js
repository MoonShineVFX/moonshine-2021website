import React , { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';

// component 常用元件
import AdminNav from '../Components/AdminNav'

//adminpage 管理頁面
import Work from '../Pages/Back/Work'
import Category from "../Pages/Back/Category"
import Lab from '../Pages/Back/Lab'
import ManagerHeader from '../Pages/Back/ManagerHeader';

//firebase 連線設定
import db from '../Config/firebase'
import {onSnapshot,collection,addDoc, updateDoc, doc,deleteDoc  } from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";

function DashboardLayout() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const storage = getStorage();

  //LAB CURD 方法
  const handleCreateLab = async(data)=>{
    const collectionRef = collection(db ,"labdata")
    await addDoc(collectionRef,data)
  }
  const handleDeleteLab = async(uid)=>{
    const labDoc = doc(db , 'labdata' , uid)
    await deleteDoc(labDoc)
  }
  const handleUpdateLab = async(uid,currentData)=>{
    const labDoc = doc(db , 'labdata' , uid)
    await updateDoc( labDoc ,currentData)

  }
  //CATEGORY CURD
  const handleCreateCategory = async(data)=>{
    const collectionRef = collection(db ,"category")
    await addDoc(collectionRef,data)
  }
  const handleDeleteCategory = async(uid)=>{
    const categoryDoc = doc(db , 'category' , uid)
    await deleteDoc(categoryDoc)
  }
  const handleUpdateCategory = async(uid,currentData)=>{
    const categoryDoc = doc(db , 'category' , uid)
    await updateDoc( categoryDoc ,currentData)

  }
  //WORK CURD
  const handleCreateWork = async(data) =>{
    const collectionRef = collection(db ,"data")
    await addDoc(collectionRef,data)
  }
  const handleDeleteWork = async(uid)=>{
    const workDoc = doc(db , 'data' , uid)
    await deleteDoc(workDoc)
  }
  const handleUpdateWork = async(uid,currentData)=>{
    const workDoc = doc(db , 'data' , uid)
    await updateDoc( workDoc ,currentData)
  }
  const handleUpdateWorkDisplay = async(uid,display)=>{
    const workDoc = doc(db , 'data' , uid)
    var newField = {display:"0"}
    if(display==="1"){
      newField.display="0"
    }else{
      newField.display="1"
    }
    await updateDoc( workDoc ,newField)

  }
  const handleUpdateWorkCatrgory = async (id,uid)=>{
    const workDoc = doc(db , 'data' , uid)
    var newField = {category:id}
    await updateDoc( workDoc ,newField)
  }
  //Header Update
  const handleUpdateHeader = async (uid, currentData)=>{
    const headerDoc = doc(db , 'header' , uid)
    await updateDoc( headerDoc ,currentData)
  }

  //處理作品檔案的圖片路徑
  const mapWorkData =async (data)=>{

    const twoarr= data.map( async (element) => {
      const imagesRef = ref(storage, `data/${element.img}`);
      const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          default:
            console.log('')
        }
      })
      return {...element , imgpath :newimgurl}
     
    })
    setWorkData(await Promise.all(twoarr))
  }
  //處理LAB的圖片路徑
  const mapLabData =async (data)=>{

    const twoarr= data.map( async (element) => {
      const imagesRef = ref(storage, `img_lab/${element.image}`);
      const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
      
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          default:
            console.log('')
        }
      })
      return {...element , imgpath :newimgurl}
     
    })
    setLabData(await Promise.all(twoarr))
  }
  


  useEffect(()=>{
    // const dataRef = collection(db, "data");

    // work
    onSnapshot(collection(db,"data"),(snapshot)=>{
      mapWorkData(snapshot.docs.map(doc=> ({
        ...doc.data() ,
        uid:doc.id 
        }))
      )
    })
    
    // category
    onSnapshot(collection(db,"category"),(snapshot)=>{
      setCategoryData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    })

    //  labinfo
    // onSnapshot(collection(db,"labinfo"),(snapshot)=>{
    //   setLabinfoData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    // })
    onSnapshot(collection(db,"labdata"),(snapshot)=>{
      mapLabData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    })

    //header
    onSnapshot(collection(db,"header"),(snapshot)=>{
      setHeaderData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    })

  },[])
  return (
    <div className="dashboard container-fluid">
      {/* 增加選單 管理作品  管理選單  管理介紹  管理分類 */}
      <div className="row">
        <AdminNav/>
          <div className="main col-10 ms-sm-auto col-lg-10 px-md-4 mt-4" style={{minHeight:'100vh'}}>
            <Switch>
                <Route path="/admin/work">
                  <Work handleCreateWork={handleCreateWork} workData={workData} categoryData={categoryData} handleDeleteWork={handleDeleteWork} handleUpdateWork={handleUpdateWork}
                  handleUpdateWorkDisplay={handleUpdateWorkDisplay} handleUpdateWorkCatrgory={handleUpdateWorkCatrgory}/> 
                </Route>
                <Route path="/admin/category">
                  <Category  categoryData={categoryData} handleCreateCategory={handleCreateCategory} handleDeleteCategory={handleDeleteCategory} handleUpdateCategory={handleUpdateCategory}/>
                </Route>
                <Route path="/admin/lab">
                  <Lab   labData={labData} handleCreateLab={handleCreateLab} handleDeleteLab={handleDeleteLab} handleUpdateLab={handleUpdateLab}/>
                </Route>
                <Route path="/admin/managerheader">
                  <ManagerHeader headerData={headerData} handleUpdateHeader={handleUpdateHeader}/>
                </Route>
              
            </Switch>
          </div>
      </div>

    </div>
  )
}

export default DashboardLayout
