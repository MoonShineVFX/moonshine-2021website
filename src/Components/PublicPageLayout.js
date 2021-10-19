import React, { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';

//component
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileNavBtn from './MobileNavBtn';
import MobileNavBar from './MobileNavBar';

// style
import "../App/App.scss"

// Front
import Home from '../Pages/Front/Home'
import Lab from '../Pages/Front/Lab'
import WorkItem from './WorkItem'
import About from '../Pages/Front/About'
import Blog from '../Pages/Front/Blog'
import Contact from '../Pages/Front/Contact'

//firebase
import db from '../Config/firebase'
import {onSnapshot,collection} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";
import labData from '../Pages/Front/Lab.json'
import aboutData from '../Pages/Front/About.json'
import contactData from '../Pages/Front/Contact.json'
import footerData from './footer.json'
import headerData from './Header.json'
function PublicPageLayout() {
  const [isOpen , setIsOpen] = useState(false)
  const [isToggled, setToggled] = useState(false);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [currentLang, setCurrentLang] = useState("");
  const [navitemData, setNavitemData] = useState([]);
  const [socialitemData, setSocialitemData] = useState([]);
  const [headerItem, setHeaderItem] = useState([]);
  const storage = getStorage();
  const toggleTrueFalse = () => setToggled(!isToggled);
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
  const switchHeaderName = (id)=>{
    const result = navitemData.find(d=>{
      return d.id === id
    })
    setHeaderItem(result)
    setToggled(!isToggled)
  }
  // 切換分類
  const switchCategory = (id)=>{
    if(!id){
      setFilteredWorkData(workData)
    }else if(id === "1" ){
      setFilteredWorkData(workData)
    }
     else{
      var filter = workData.filter(function(item, index, array){
        return item.category === id;       
      });
      setFilteredWorkData(filter)
      
    }
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
    setFilteredWorkData(await Promise.all(twoarr))
  }

  //執行撈資料
  useEffect(()=>{
    // fetchWork().then((d)=>{
    //   console.log(d)
    //   setWrokData(d.data)
    // })
    onSnapshot(collection(db,"data"),(snapshot)=>{
      mapWorkData(snapshot.docs.map(doc=> doc.data()))
    })
    // switchCategory()
    onSnapshot(collection(db,"category"),(snapshot)=>{
      setCategoryData(snapshot.docs.map(doc=> doc.data()))
    })

    // setNavitemData()
    onSnapshot(collection(db,"navitem"),(snapshot)=>{
      setNavitemData(snapshot.docs.map(doc=> doc.data()))
    })
     // setCocialitem()
     onSnapshot(collection(db,"socialitem"),(snapshot)=>{
      setSocialitemData(snapshot.docs.map(doc=> doc.data()))
    })
    
    setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  },[])
  return (
    <React.Fragment>  
        {
          isOpen ?  <WorkItem data={searchResults} handler={handleOpen} visible={isOpen} /> : null
        }
      <Navbar currentLang={currentLang} switchLang={switchLang} navitemData={navitemData} socialitemData={socialitemData} switchHeaderName={switchHeaderName}/>
      <MobileNavBtn  toggleTrueFalse={toggleTrueFalse} />
      <MobileNavBar isToggled={isToggled} currentLang={currentLang} switchLang={switchLang} navitemData={navitemData} socialitemData={socialitemData} switchHeaderName={switchHeaderName}/>
      <Header currentLang={currentLang} headerItem={headerItem} headerData={headerData}/>
      <Switch>
        <Route path="/" exact  >
          <Home workData={filteredWorkData} categoryData={categoryData} handler={handleAddClick} currentLang={currentLang} switchCategory={switchCategory}/>
        </Route>
        <Route path="/lab"   >
          <Lab currentLang={currentLang} labData={labData}/>
        </Route>
        <Route path="/about"   >
          <About currentLang={currentLang} aboutData={aboutData}/>
        </Route>
        <Route path="/blog"   >
          <Blog />
        </Route>
        <Route path="/contact"   >
          <Contact currentLang={currentLang} contactData={contactData }/>
        </Route>
      </Switch>
      <Footer currentLang={currentLang}  footerData={footerData} socialitemData={socialitemData}/>
    </React.Fragment>
  )
}

export default PublicPageLayout
