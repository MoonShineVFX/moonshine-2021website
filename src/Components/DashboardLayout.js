import React , { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';
import AdminNav from '../Components/AdminNav'

//adminpage
import Work from '../Pages/Back/Work'
import Category from "../Pages/Back/Category"
import Lab from '../Pages/Back/Lab'
//firebase
import db from '../Config/firebase'
import {onSnapshot,collection,addDoc, updateDoc, doc,deleteDoc,orderBy  } from "firebase/firestore"
import { getStorage, ref, getDownloadURL,getMetadata  } from "firebase/storage";

function DashboardLayout() {
  const [workData, setWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labinfoData, setLabinfoData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [imgPath,setImgPath] = useState('')
  const storage = getStorage();
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
  const mapWorkData =async (data)=>{
    console.log(data)
    
    const twoarr= data.map( async (element) => {
      // console.log(await getImageUrl(element.img)) 
      // console.log(...element)
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
  const getImageUrl =  async(img)=>{
      //'data/14607268903042.jpg'
      // console.log(`data/${img}`)
      const imagesRef = ref(storage, `data/${img}`);
      const imgurl =await  getDownloadURL(imagesRef)
      .catch((error) => {
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

      // console.log(imgurl)
      return imgurl

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

    //  lab
    onSnapshot(collection(db,"labinfo"),(snapshot)=>{
      setLabinfoData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
    })
    onSnapshot(collection(db,"labdata"),(snapshot)=>{
      setLabData(snapshot.docs.map(doc=> ({...doc.data(),uid:doc.id})))
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
                  <Lab  labinfoData={labinfoData} labData={labData}/>
                </Route>
              
            </Switch>
          </div>
      </div>

    </div>
  )
}

export default DashboardLayout
