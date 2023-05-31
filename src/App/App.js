import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './App.scss';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import PublicPageLayout from '../Layouts/PublicPageLayout'
import { AuthProvider } from "../Components/Auth";
import PublicRoutes from '../Routes/PublicRoutes'
import ProtectedRoutes from '../Routes/ProtectedRoutes'
//login
import Login from '../Components/Login'
//pages
import About from '../Pages/Front/About/About'
import DefaultWork from '../Pages/Front/DefaultWork/DefaultWork';
import Services from '../Pages/Front/Services/Services';
import Contact from '../Pages/Front/Contact/Contact'
import By_Category from '../Pages/Front/Work/By_Category';

import WatchArticle from "../Components/WatchArticle";

//Back Pages
import AdminHome from '../Pages/Back/Home.js'
import AdminCateogry from '../Pages/Back/Category'
import AdminAward from '../Pages/Back/Award'
import AdminServices from '../Pages/Back/Services'
import AdminAbout from '../Pages/Back/About'
import AminContact from '../Pages/Back/Contact'
import AdminHeader from '../Pages/Back/AdminHeader'

import FullpageScroll from "../Pages/Front/Home/FullpageScroll";

function App() {
  useEffect(() => {
    setTimeout(function() {
        AOS.init({
          
        });
    }, 100);
    // AOS.refresh()
  }, []);
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes> 
      
            <Route path="/"  element={ <PublicPageLayout/>}>
              <Route path="" element={<FullpageScroll />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<DefaultWork />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/works/:cSlug" element={<By_Category />} />
              <Route path="/watcharticle/:workid" element={<WatchArticle />} />


            </Route>
            
            <Route path="admin"  element={ <ProtectedRoutes/>}>
              <Route  path="" element={<AdminHome/>} />
              <Route  path="category" element={<AdminCateogry/>} />
              <Route  path="award" element={<AdminAward/>} />
              <Route  path="service" element={<AdminServices/>} />
              <Route  path="about" element={<AdminAbout/>} />
              <Route  path="contact" element={<AminContact/>} />
              <Route  path="headers" element={<AdminHeader/>} />
            </Route> 

            <Route path="login" element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>


            
 
          
      </Routes>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
