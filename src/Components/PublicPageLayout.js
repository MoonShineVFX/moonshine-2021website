import React, { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';

// component 頁面常用元件
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileNavBtn from './MobileNavBtn';
import MobileNavBar from './MobileNavBar';

// style SCSS
import "../App/App.scss"

// Front 前台頁面
import Home from '../Pages/Front/Home'       
import Lab from '../Pages/Front/Lab'         
import WorkItem from './WorkItem' 
import About from '../Pages/Front/About'
import Blog from '../Pages/Front/Blog'
import Contact from '../Pages/Front/Contact'

// firebase 資料庫連線
import db from '../Config/firebase'
import {collection, query,  getDocs,orderBy} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";

// 本地json資料 
import footerData from './footer.json'
import headerData from './Header.json'
function PublicPageLayout() {
  const [isOpen , setIsOpen] = useState(false)
  const [isToggled, setToggled] = useState(false);
  const [workData, setWorkData] = useState([]);
  const [filteredWorkData, setFilteredWorkData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [labInfoData, setLabInfoData] = useState([]);
  const [aboutStatsData, setAboutStatsData] = useState([]);
  const [aboutInfoData, setAboutInfoData] = useState([]);
  const [aboutStrengthData, setAboutStrengthData] = useState([]);
  const [contactData, setContactData] = useState([]);
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
  // 開啟作品modal
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  // 切換語系
  const switchLang = (data) =>{
    // setLang(data)
    localStorage.setItem('lang' ,data)
    setCurrentLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'eng')
  }

  // 切換 Headr 頁面名稱
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
  // 處理作品的圖片路徑
  const mapWorkData =async (data)=>{
    const twoarr= data.map( async (element) => {
      const imagesRef = ref(storage, `data/${element.img}`);
      const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
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
  // 處理LAB的圖片路徑
  const mapLabData = async(data)=>{
    const twoarr= data.map( async (element) => {
      const imagesRef = ref(storage, `img_lab/${element.image}`);
      const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            console.log('')
        }
      })
      return {...element , imgpath :newimgurl}
     
    })
    setLabData(await Promise.all(twoarr))
  }

  //執行撈資料
  useEffect(()=>{
    /**
     * 到 firebase 撈作品資料表
     * 資料先傳到 mapWorkData 處理過圖片路徑再回傳 setWorkData 給網頁用
     * **/ 
    const getWorks = async ()=>{
      const q = query(collection(db, "data"),orderBy('time_added' , 'desc'))
      const data = await getDocs(q);
      mapWorkData(data.docs.map(doc=> doc.data()))
    }
    getWorks()

    /**
     * 到 firebase 撈分類資料表
     * 不用處理圖片路徑的 直接 set
     * **/ 
    const getCategory = async ()=>{
      const q = query(collection(db, "category"))
      const data = await getDocs(q);
      setCategoryData(data.docs.map(doc=> doc.data()))
    }
    getCategory()

    /**
     * 到 firebase 撈選單資料表
     * **/ 
    // setNavitemData()
    const getNavitem = async()=>{
      const q = query(collection(db, "navitem"))
      const data = await getDocs(q);
      setNavitemData(data.docs.map(doc=> doc.data()))
    }
    const getSocialitem = async()=>{
      const q = query(collection(db, "socialitem"))
      const data = await getDocs(q);
      setSocialitemData(data.docs.map(doc=> doc.data()))
    }
    getNavitem()
    getSocialitem()

    /**
     * 到 firebase 撈 Lab 資料表
     * 先傳到 mapLabData 處理過圖片路徑再回傳 setLabData 給網頁用
     * **/ 
    const getLabdata = async()=>{
      const q = query(collection(db, "labdata"))
      const data = await getDocs(q);
      mapLabData(data.docs.map(doc=> doc.data()))
    }
    const getLabinfo = async()=>{
      const q = query(collection(db, "labinfo"))
      const data = await getDocs(q);
      setLabInfoData(data.docs.map(doc=> doc.data()))
    }
    getLabdata()
    getLabinfo()

    /**
     * 到 firebase 撈關於公司介紹資料表
     * **/ 
    // setAbout
    const getAboutstats = async()=>{
      const q = query(collection(db, "aboutstats"))
      const data = await getDocs(q);
      setAboutStatsData(data.docs.map(doc=> doc.data()))
    }
    const getAboutinfo = async()=>{
      const q = query(collection(db, "aboutinfo"))
      const data = await getDocs(q);
      setAboutInfoData(data.docs.map(doc=> doc.data()))
    }
    const getAboutstrength = async()=>{
      const q = query(collection(db, "aboutstrength"))
      const data = await getDocs(q);
      setAboutStrengthData(data.docs.map(doc=> doc.data()))
    }
    const getContact = async()=>{
      const q = query(collection(db, "contact"))
      const data = await getDocs(q);
      setContactData(data.docs.map(doc=> doc.data())[0])
    }
    getAboutstats()
    getAboutinfo()
    getAboutstrength()
    getContact()

    /**
     *  如果 localStorage 沒有預設就顯示英文
     * **/
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
          <Lab currentLang={currentLang} labData={labData} labInfoData={labInfoData[0]}/>
        </Route>
        <Route path="/about"   >
          <About currentLang={currentLang} aboutStatsData={aboutStatsData} aboutInfoData={aboutInfoData[0]} aboutStrengthData={aboutStrengthData}/>
        </Route>
        <Route path="/blog"   >
          <Blog />
        </Route>
        <Route path="/contact"   >
          <Contact currentLang={currentLang} contactData={contactData}/>
        </Route>
      </Switch>
      <Footer currentLang={currentLang}  footerData={footerData} socialitemData={socialitemData}/>
    </React.Fragment>
  )
}

export default PublicPageLayout
