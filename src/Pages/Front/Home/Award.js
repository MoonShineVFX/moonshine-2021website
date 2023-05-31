import React from 'react'

function Award() {
  return (
    <div id="award" className='mt-36 xs:mt-20'>
      <div className="home_header center">
        <h1>Award</h1>
      </div>
      <ul className="award_list w-3/4 mx-auto mt-20 flex justify-between xs:w-full xs:gap-3">
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
        <li>
          <img src={process.env.PUBLIC_URL + '/images/award/a01.png'} alt="" />
        </li>
      </ul>
    </div>
  )
}

export default Award