import React , { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';

import AdminNav from '../Components/AdminNav'
//firebase
import db from '../Config/firebase'
import {onSnapshot,collection,addDoc } from "firebase/firestore"
function DashboardLayout() {
  const onSubmit=()=>{

      //add資料庫
      addDoc(collection(db,"test"),{
          name: "Tokyo",
          country: "Japan"
      })
    
  }
  useEffect(()=>{
    onSnapshot(collection(db,"test"),(snapshot)=>{
      console.log(snapshot.docs.map(doc=> doc.data()))
    })
  },[])
  return (
    <div className="dashboard">
      {/* 增加選單 管理作品  管理選單  管理介紹  管理分類 */}
      <AdminNav/>

      <button onClick={()=>{onSubmit()}}>
        set
      </button>
    </div>
  )
}

export default DashboardLayout
