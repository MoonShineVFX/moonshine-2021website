import React, { useState, useEffect } from 'react'
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
  const [categoryData, setCategoryData] = useState([]);
  const [categoryWorkIdData, setCategoryWorkIdData] = useState([]);
  const [filteredWorkIdData, setFilteredWorkIdData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentLang, setCurrentLang] = useState("");
  const handleAddClick = (dataId) => {
    const results  =   workData.find((d)=>{
      return d.id === dataId
    })
    setSearchResults(results)

    setIsOpen(!isOpen)
  };

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  const switchLang = (data) =>{
    // setLang(data)
    localStorage.setItem('lang' ,data)
    setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  }
  const switchCategory = (id)=>{
    var filterCategoryId = categoryWorkIdData.filter(function(item, index, array){
      return item.category_id === id;       
    });
    // setFilteredWrokIdData(filterCategoryId)
    filterWorkId(filterCategoryId)
    // console.log(filteredWorkIdData)

  }
  const filterWorkId = (data) =>{
    console.log(data)
    data.map(d=>{
      console.log(d.work_id)
      var filterWorkData =workData.filter(function(item){
        return item.id ===d.work_id;  
      })
      // 陣列過濾後處理
      setWorkData(workData => [...workData, filterWorkData]);
    })
  }
  useEffect(()=>{
    // fetchWork().then((d)=>{
    //   console.log(d)
    //   setWrokData(d.data)
    // })
    onSnapshot(collection(db,"data"),(snapshot)=>{
      setWorkData(snapshot.docs.map(doc=> doc.data()))
    })

    onSnapshot(collection(db,"category"),(snapshot)=>{
      setCategoryData(snapshot.docs.map(doc=> doc.data()))
    })
    onSnapshot(collection(db,"category_work"),(snapshot)=>{
      setCategoryWorkIdData(snapshot.docs.map(doc=> doc.data()))
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
        <Home workData={workData} categoryData={categoryData} handler={handleAddClick} currentLang={currentLang} switchCategory={switchCategory}/>
      </Route>
    </React.Fragment>
  );
}

export default App;
