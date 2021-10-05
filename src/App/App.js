import React, { useState, useEffect,useReducer } from 'react'
import { Route,  useHistory  } from 'react-router-dom';

import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
// style
import './App.scss';

// Front
import Home from '../Pages/Front/Home'
import WorkItem from '../Components/WorkItem'
import {fetchWork} from '../Helper/fetch'

//firebase
import db from '../Config/firebase'
import {onSnapshot,collection} from "firebase/firestore"

function App() {
  const [isOpen , setIsOpen] = useState(false)
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [category, setCategory] = useState("0");
  const [categoryData, setCategoryData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [currentLang, setCurrentLang] = useState("");
  
  // 開啟單作品
  const handleAddClick = (dataId) => {
    const results  =   workData.find((d)=>{
      return d.id === dataId
    })
    setSearchResults(results)
    setIsOpen(!isOpen)
  };
  //開啟作品modal
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  //切換語系
  const switchLang = (data) =>{
    // setLang(data)
    localStorage.setItem('lang' ,data)
    setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  }
  // 切換分類
  const switchCategory = (id)=>{
    console.log(id)
    if(id === "1" ||id ===undefined){
      setFilteredWorkData(workData)
    }else{
      var filter = workData.filter(function(item, index, array){
        return item.category === id;       
      });
      setFilteredWorkData(filter)
    }


    // setFilteredWrokIdData(filterCategoryId)
    // filterWorkId(filterCategoryId)
    // console.log(filteredWorkIdData)


  }
  // 分類過濾id
  const filterWorkId = (data) =>{
    console.log(data)
    data.map(d => {
      console.log(d.work_id)
      var filterWorkData =[...workData].find(function(item){
        return item.id === d.work_id;  
      })
      console.log(filterWorkData)
      // 陣列過濾後處理
      // setWorkData(workData => [...workData, filterWorkData]);
    })
  }

  //執行撈資料
  useEffect(()=>{
    // fetchWork().then((d)=>{
    //   console.log(d)
    //   setWrokData(d.data)
    // })
    onSnapshot(collection(db,"data"),(snapshot)=>{
      setWorkData(snapshot.docs.map(doc=> doc.data()))
    })
    switchCategory()
    onSnapshot(collection(db,"category"),(snapshot)=>{
      setCategoryData(snapshot.docs.map(doc=> doc.data()))
    })
    setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  },[])
  return (
    <React.Fragment>
       {
          isOpen ?  <WorkItem data={searchResults} handler={handleOpen} visible={isOpen} /> : null
        }
      <Navbar currentLang={currentLang} switchLang={switchLang}/>
      <Header />
      <Route path="/" exact  >
        <Home workData={filteredWorkData} categoryData={categoryData} handler={handleAddClick} currentLang={currentLang} switchCategory={switchCategory}/>
      </Route>
    </React.Fragment>
  );
}

export default App;
