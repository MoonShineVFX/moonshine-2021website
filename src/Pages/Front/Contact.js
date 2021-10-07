import React from 'react'
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';
function Contact({currentLang,contactData}) {
  const {contact}=contactData
  const containerStyle = {
    width: '100%',
    height: '320px',
  };
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
          googleMapsApiKey="AIzaSyCboUZ-BNysXw4H1czfg43Tp1ia0_dkRfk"
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
              icon='../img/marker.png'
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
              <p>{currentLang === 'eng' ? contact.tel_title : contact.tel_title_cht }</p>
              <p>{contact.tel_content}</p>
          </div>
          <div className="infoContent width1">
              <p>{currentLang === 'eng' ? contact.email_title : contact.email_title_cht }</p>
              <p>{contact.email_content}</p>
          </div>
          <div className="infoContent width2">
              <p>{currentLang === 'eng' ? contact.address_title : contact.address_title_cht }</p>
              <p>{currentLang === 'eng' ? contact.address_content : contact.address_content_cht }</p>
          </div>
        </div>
      </div>
      <div className="cForm">
          <div className="formContent">
            <div className="fs15">{currentLang === 'eng' ? contact.subcribe_title : contact.subcribe_title_cht }</div>
            <div className="fs13">{currentLang === 'eng' ? contact.subcribe_content : contact.subcribe_content_cht }</div>
          </div>
          <div class="formIcon"><span id="formMessages"></span></div>
          <div className="formArea">
            <div id="mc_embed_signup">
              <form
                action="https://moonshine.us19.list-manage.com/subscribe/post-json?u=d714004cfd866022b7dd8d3ff&amp;id=98cc66f81b&c=?"
                method="get"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate"
                target="_blank" novalidate>

                <div class="sr-only" aria-hidden="true">
                  <input type="text" name="b_d714004cfd866022b7dd8d3ff_98cc66f81b" tabindex="-1" value="" />
                </div>

                <div id="mc_embed_signup_scroll">
                  <div class="flex-md-wrap">
                    <div class="mc-field-group flex-md-1">
                      <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email Address" autocomplete='email' />
                    </div>
                    <div class="mc-field-group flex-md-1">
                      <input type="text" value="" name="FNAME" class="required" id="mce-FNAME" placeholder="Name" autocomplete='given-name' />
                    </div>
                    <div>
                      <input type="submit" value="Keep Me Updated" name="subscribe" id="mc-embedded-subscribe" class="submit" />
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
