import React , { useState, useEffect }from 'react'
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';

import Header from '../../../Components/Header'
import Newest from '../Home/Newest'
import Service from '../Home/Services'
import Home_about from '../Home/Home_about'
import Award from './Award'
import Modal from '../../../Components/NetflixSlider/Modal'; 



//data
import newestData from './Newest.json'
import serviceData from './Services.json'

//firebase helper
import { getNewestWorks} from '../../../Helper/getfunction'



function Home() {
  const {newest} = newestData
  const {service} = serviceData
  const [newestWorkData, setNewestWorkData] = useState([]);
  const showModal = useRecoilValue(modalState);
  useEffect(()=>{
    getNewestWorks((res)=>{
      setNewestWorkData(res)
    })
  },[])

  return (
    <section id="home">
      <Header v_url='https://vimeo.com/734274794' />
      <div className="home_container">
        <Newest data={newestWorkData}/> 
        <Service data={service}/>
        <Home_about />
        <Award />
      </div>
      {showModal && <Modal />}
      

      
    </section>
  )
}

export default Home