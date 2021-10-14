import React , { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';
import AdminNav from '../Components/AdminNav'

//adminpage
import AddWork from '../Pages/Back/AddWork'

//firebase
import db from '../Config/firebase'
import {onSnapshot,collection,addDoc, updateDoc, doc,deleteDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL  } from "firebase/storage";

function DashboardLayout() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const storage = getStorage();
  const handleCreateWork = async(data) =>{
    const collectionRef = collection(db ,"data")
    await addDoc(collectionRef,data)
  }
  const handleDeleteWork = async(uid)=>{
    const workDoc = doc(db , 'data' , uid)
    await deleteDoc(workDoc)
  }
  const handleUpdateWork = async(uid)=>{
    
    
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
  
  const getImageUrl = (data)=>{
    //'data/14607268903042.jpg'
      const imagesRef = ref(storage, `data/14607268903042.jpg`);
      return  getDownloadURL(imagesRef).then((url)=>{return url})
      // return imgurl
      // return my 
  }
  // TODO 新增firebaee 圖片路徑 PromiseResult 問題解決
  useEffect(()=>{
    onSnapshot(collection(db,"data"),(snapshot)=>{
      setWorkData(snapshot.docs.map(doc=> ({...doc.data() ,
        uid:doc.id , 
        imgpath: getImageUrl(doc.data().img).then(
          (res)=>{
            return res;
          })
        }))
      )
    })
    // switchCategory()
    onSnapshot(collection(db,"category"),(snapshot)=>{
      setCategoryData(snapshot.docs.map(doc=> doc.data()))
    })

  },[])
  return (
    <div className="dashboard container-fluid">
      {/* 增加選單 管理作品  管理選單  管理介紹  管理分類 */}
      <div className="row">
        <AdminNav/>
          <div className="main col-md-10 ms-sm-auto col-lg-10 px-md-4 mt-4" style={{minHeight:'100vh'}}>
            <Switch>
                <Route path="/admin/works">
                  <AddWork handleCreateWork={handleCreateWork} workData={workData} categoryData={categoryData} handleDeleteWork={handleDeleteWork} handleUpdateWork={handleUpdateWork}
                  handleUpdateWorkDisplay={handleUpdateWorkDisplay}/> 
                </Route>
              
            </Switch>
          </div>
      </div>

    </div>
  )
}

export default DashboardLayout
