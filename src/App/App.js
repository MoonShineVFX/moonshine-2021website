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

function App() {
  const [isOpen , setIsOpen] = useState(false)
  const [workData, setWrokData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
  useEffect(()=>{
    fetchWork().then((d)=>{
      console.log(d)
      setWrokData(d.data)
    })

  },[])
  return (
    <React.Fragment>
       {
          isOpen ?  <WorkItem data={searchResults} handler={handleOpen} visible={isOpen} /> : null
        }
      <Navbar/>
      <Header/>
      <Route path="/" exact  >
        <Home workData={workData} handler={handleAddClick}/>
      </Route>
    </React.Fragment>
  );
}

export default App;
