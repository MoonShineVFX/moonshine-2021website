import React, { useState, useEffect } from 'react'
import { Route,  useHistory  } from 'react-router-dom';

import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
// style
import './App.scss';

// Front
import Home from '../Pages/Front/Home'

import {fetchWork} from '../Helper/fetch'

function App() {
  
  useEffect(()=>{
    // fetchWork()

},[])
  return (
    <React.Fragment>
      <Navbar/>
      <Header/>
      <Route path="/" exact component={Home} />
    </React.Fragment>
  );
}

export default App;
