import React from 'react'
import ImgHeader from '../../../Components/ImgHeader'
import SwiperBgImages from '../Components/SwiperBgImages'
function About() {
  const bgimages = [
    'bg_about01.png',
    'bg_about02.png',
    'bg_about03.png',
    'bg_about04.png',
    'bg_about05.png',
    'bg_about06.png',
    'bg_about07.png',
  ];
  return (
    <div>
      <SwiperBgImages imgData={bgimages}/>
      <div className="mt-16 z-10 relative">
        <div className="w-11/12 lg:w-4/5 mb-20  mx-auto " >
          <h1 className='text-2xl lg:text-3xl font-light  leading-normal ' >Creation and Illumination, attained by MOONSHINE's animation and visual effects.</h1>
          <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
          <div className="text-lg mt-5 font-light" data-aos="fade" data-aos-duration="1500">
          Moonshine Studio is an artist-centered VFX company based in Taiwan. We are an integrated collective of directors, designers, artists and technologists, collaborating on projects for the advertising, film and VR industries.
            <div className="mb-6"></div>
            Founded in 2012, Moonshine Studio has been through some challenges, and have done some cool things with our talents. We believe in the value of transparency and equity and constantly strive to deliver great work to the world.
          </div>
          <div className="mb-14 mt-36" data-aos="fade" data-aos-duration="1500">
            <div className="text-3xl font-light">
             Our Strength
            </div>
            <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
            <div className="text-lg mt-5 font-light">
            MOONSHINE is a team consisted of diverse artists: directors, project managers, animators, compositors, research developers and designers.
              <div className="mb-6"></div>
              We offer 360-degree service from concept to screen. Being an integrated company, we are able to execute a project from script writing to concept art, from story board to animatic, from shoot to post-production.
            </div>
          </div>
        </div>
      </div>
      <div className="about_content flex flex-col w-10/12 lg:w-3/4 mx-auto gap-20">
        <div className='flex flex-col md:flex-row   text-white w-full items-center' data-aos="fade-up" data-aos-duration="1500">
          <div className='lg;w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s01.png'} alt=""  />
          </div>
         
          <div className='lg:w-2/3 mt-6 lg:mt-0'>
            <div className='text-2xl font-bold'>Solid Pipeline</div> 
            <div className='text-lg text-zinc-300 mt-3 font-light'>
              From pre-production to post production, MOONSHINE has developed a mature production process.
            </div> 
          </div>
        </div>
        <div className='flex flex-col md:flex-row  text-white w-full items-center' data-aos="fade-up" data-aos-duration="1500">
          <div className='lg:w-2/3 mt-6 lg:mt-0 order-2 md:order-1'>
            <div className='text-2xl font-bold'>Assured Quality</div> 
            <div className='text-lg text-zinc-300   mt-3 font-light'>
              We strive for constantly making great visual works.
            </div> 
          </div>
          <div className='lg:w-4/6 relative order-1 md:order-2'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s02.png'} alt="" />
          </div>
          
        </div>
        <div className='flex flex-col md:flex-row  text-white w-full items-center' data-aos="fade-up" data-aos-duration="1500">
          <div className='lg:w-4/6 relative'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s03.png'} alt="" />
          </div>          
          <div className='lg:w-2/3 mt-6 lg:mt-0'>
            <div className='text-2xl font-bold'>Diversity Works</div> 
            <div className='text-lg text-zinc-300  mt-3 font-light'>
              Virtual, digital, realistic…We demonstrate different styles in all formats.
            </div> 
          </div>
        </div>
        <div className='flex flex-col md:flex-row  text-white w-full items-center' data-aos="fade-up" data-aos-duration="1500">
          <div className='lg:w-2/3 mt-6 lg:mt-0 order-2 md:order-1'>
            <div className='text-2xl font-bold'>Research Development</div> 
            <div className='text-lg text-zinc-300  mt-3 font-light'>
              With our talented R&D technologists, we have developed our own tools and effects.
            </div> 
          </div>
          <div className='lg:w-4/6 relative order-1 md:order-2'>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(90deg,#000,transparent 35%,transparent 65%,#000)`}}></div>
            <div 
              className=' absolute top-0 w-full h-full' 
              style={{background: `linear-gradient(1turn,#000,transparent 50%,transparent 65%,#000)`}}></div>
            <img src={process.env.PUBLIC_URL+'/images/about/about-s04.png'} alt=""  />
          </div>
          
        </div>

      </div>
      <div>
        <div className="w-10/12 lg:w-3/4 mt-20  mx-auto " data-aos="fade" data-aos-duration="1500">
          <h1 className=' xs:text-2xl leading-normal text-3xl md:text-3xl font-bold md:w-full py-4 leading-slug mb-10' >Locations</h1>
          <div className='h-[1px] w-[120px] bg-white mt-10' ></div>
          <div className="text-lg mt-5 font-light">
            <div className='flex flex-col lg:flex-row  gap-20'>
              <div>
                <div className=' text-xl mb-5 font-bold'>TAIPEI</div>
                <div className=' text-sm'>
                  02-2785-7037 <br />
                  info@moonshine.tw <br />
                  3F, No.481, Sec. 6, Zhongxiao E. Rd., Nangang Dist., Taipei City 115, Taiwan (R.O.C.)
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>KAOHSIUNG</div>
                <div className=' text-sm'>
                  info@moonshine.tw   <br />
                  A5CF., No. 1, Zhen'ai Rd., Yancheng Dist., Kaohsiung City 803003 , Taiwan (R.O.C.) 
                </div>
              </div>
              <div>
                <div className=' text-xl mb-5 font-bold'>MONTREAL</div>
                <div className=' text-sm'>
                  Producer@moonshine.tw<br />
                  1330 Rue Olier, apt 101, Montreal, QC H3C 1W4, Canada 
                </div>
              </div>
            </div>
            <div className="mb-6"></div>

          </div>

        </div>
      </div>


    </div>
  )
}

export default About