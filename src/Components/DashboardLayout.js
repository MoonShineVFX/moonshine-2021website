import React , { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';
import AdminNav from '../Components/AdminNav'

//adminpage
import AddWork from '../Pages/Back/AddWork'

//firebase
import db from '../Config/firebase'
import {onSnapshot,collection,addDoc } from "firebase/firestore"
function DashboardLayout() {
  const handleAddWork = async(data) =>{
    const collectionRef = collection(db ,"test")
    await addDoc(collectionRef,data)
  } 
  useEffect(()=>{
    onSnapshot(collection(db,"test"),(snapshot)=>{
      console.log(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  return (
    <div className="dashboard container-fluid">
      {/* 增加選單 管理作品  管理選單  管理介紹  管理分類 */}
      <div className="row">
        <AdminNav/>
        <Switch>
          <div className="main col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{minHeight:'100vh'}}>
            <Route path="/admin/addwork"   >
              <AddWork handleAddWork={handleAddWork}/>
            </Route>
          </div>
        </Switch>

      </div>

    </div>
  )
}

export default DashboardLayout
