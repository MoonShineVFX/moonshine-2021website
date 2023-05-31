import React from 'react'
import { Outlet} from 'react-router-dom';


import Navbar from '../Components/Navbar'
import Navbar_centerLogo from '../Components/Navbar_centerLogo';
import MobileNavbar from '../Components/MobileNavbar';
import Footer from '../Components/Footer'

import NavData from '../Components/navbar.json'
import NavDataWork from '../Components/navbar_work.json'
import footerData from '../Components/footer.json'
import socialMediaData from '../Components/socialitemData.json'
import { RecoilRoot } from 'recoil';


function PublicPageLayout() {
  const {socialmedia} = socialMediaData
  const {navbar} =NavData
  const {navbar_work} =NavDataWork
  return (
    <React.Fragment>
      <RecoilRoot>
      <Navbar_centerLogo data={navbar} nav_Work={navbar_work} socialmedia = {socialmedia}/>
      <MobileNavbar data={navbar} />
      <Outlet />
      <Footer footerData={footerData} socialmedia={socialmedia}/>
      </RecoilRoot>
    </React.Fragment>
  )
}

export default PublicPageLayout