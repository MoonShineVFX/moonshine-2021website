import React,{useEffect,useState} from 'react'
import './App.css';

import {fetchWork} from '../Helper/fetch'

function App() {
  
  useEffect(()=>{
    fetchWork()

},[])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
