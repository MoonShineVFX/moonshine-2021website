import React from 'react'
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
import ImgHeader from '../../../Components/ImgHeader'
import Header from '../../../Components/Header';
function Contact() {
  const containerStyle = {
    width: '100%',
    height: '320px',
  };
  // 地圖樣式
  const styles =[
    {
      "stylers": [
          {
              "hue": "#ff1a00"
          },
          {
              "invert_lightness": true
          },
          {
              "saturation": -100
          },
          {
              "lightness": 33
          },
          {
              "gamma": 0.5
          }
        ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#2D333C"
              }
          ]
      }
  ]
  const center = {
    lat: 25.0578151,
    lng: 121.5803296
  };
  return (
    <section id="contact">
      <Header v_url="https://vimeo.com/342892008" start_time="3"  tpa_display={false} />
      
      <div className="w-5/6 mx-auto -mt-60 z-10 relative">
        <h1 className='text-3xl font-bold mb-5' >Contact</h1>
        <div id="map" className="mt30">
          <LoadScript
            googleMapsApiKey="AIzaSyAr65BTpWDL2I0GNYcky_wMKR91zaEfUbE"
            language={'en'}
          >
            <GoogleMap

              mapContainerStyle={containerStyle}
              center={center}
              zoom={17}
              options={{
                disableDefaultUI: true,
                styles: styles,
              }}
            >
              <Marker 
                position={{
                  lat: 25.0578151,
                  lng: 121.5803296
                }}
                icon={process.env.PUBLIC_URL + '/images/MS_landmark.svg'}
              />
              { /* Child components, such as markers, info windows, etc. */ }
              <></>
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="contact_info mt-16">
          <div className="text-lg mt-5 font-light">
            <div className='flex flex-col lg:flex-row gap-20'>
              <div>
                <div className=' text-xl mb-5 font-bold'>TAIPEI</div>
                <div className=' text-sm'>
                Producer@moonshine.tw <br />
                  4F., No.188, Xingshan Rd., Neihu Dist., Taipei City 114066, Taiwan (R.O.C.) <br /><br />
                  02-2785-7037 
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>KAOHSIUNG</div>
                <div className=' text-sm'>
                Producer@moonshine.tw   <br />
                  A5CF., No. 1, Zhen'ai Rd., Yancheng Dist., Kaohsiung City 803003 , Taiwan (R.O.C.) 
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>MONTREAL</div>
                <div className=' text-sm'>
                Cynthiahou@moonshine.tw<br />
                  1330 Rue Olier, apt 101, Montreal, QC H3C 1W4, Canada 
                </div>
              </div>
            </div>
            <div className="mb-6"></div>

          </div>
         
        </div>
      </div>

    </section>

  )
}

export default Contact