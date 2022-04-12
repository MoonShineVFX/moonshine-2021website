import React from 'react'
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
function Contact({currentLang,contactData}) {
  
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
    lat: 25.051027,
    lng: 121.594860
  };
  return (
    
    <div className="cContainter">
      <div id="map" className="mt30">
        <LoadScript
          googleMapsApiKey="AIzaSyCY5JQ3g9D70gnfALdxc8z18XD7AtNw3wM"
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
                lat: 25.051027,
                lng: 121.594860
              }}
              icon={process.env.PUBLIC_URL + '/img/2022/MS_landmark.svg'}
            />
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="cInfo">
        <div className="infoIcon">
          <img src="./img/info.svg" alt="" />
        </div>
        <div className="infoArea">
          <div className="infoContent width1">
              <p>{currentLang === 'eng' ? contactData.tel_title : contactData.tel_title_cht }</p>
              <p>{contactData.tel_content}</p>
          </div>
          <div className="infoContent width1">
              <p>{currentLang === 'eng' ? contactData.email_title : contactData.email_title_cht }</p>
              <p>{contactData.email_content}</p>
          </div>
          <div className="infoContent width2">
              <p>{currentLang === 'eng' ? contactData.address_title : contactData.address_title_cht }</p>
              <p>{currentLang === 'eng' ? contactData.address_content : contactData.address_content_cht }</p>
          </div>
        </div>
      </div>
      <div className="cForm">
          <div className="formContent">
            <div className="fs15">{currentLang === 'eng' ? contactData.subcribe_title : contactData.subcribe_title_cht }</div>
            <div className="fs13">{currentLang === 'eng' ? contactData.subcribe_content : contactData.subcribe_content_cht }</div>
          </div>
          <div className="formIcon"><span id="formMessages"></span></div>
          <div className="formArea">
            <div id="mc_embed_signup">
              <form
                action="https://moonshine.us19.list-manage.com/subscribe/post-json?u=d714004cfd866022b7dd8d3ff&amp;id=98cc66f81b&c=?"
                method="get"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank" noValidate>

                <div className="sr-only" aria-hidden="true">
                  <input type="text" name="b_d714004cfd866022b7dd8d3ff_98cc66f81b" tabIndex="-1" value="" />
                </div>

                <div id="mc_embed_signup_scroll">
                  <div className="flex-md-wrap">
                    <div className="mc-field-group flex-md-1">
                      <input type="email"  name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Email Address" autoComplete='email' />
                    </div>
                    <div className="mc-field-group flex-md-1">
                      <input type="text"  name="FNAME" className="required" id="mce-FNAME" placeholder="Name" autoComplete='given-name' />
                    </div>
                    <div>
                      <input type="submit" value="Keep Me Updated" name="subscribe" id="mc-embedded-subscribe" className="submit" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
					
      </div>

    </div>
  )
}

export default Contact
