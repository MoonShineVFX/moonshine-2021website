import React from 'react'

function Home() {
  const items =  [
    {id: 1, title: '給概念美術的第一堂 3D 課',desc:'針對概念美術領域之 Blender 軟體的入門課程，掌握基本 3D 觀念與應用，適合想跨入 3D 動畫製作領域的概念美術師。', image:'../images/banner.jpg'},
    {id: 2, title: '', desc:'', image:'../images/blender.png'},
    {id: 3, title: '', desc:'', image:'../images/maya.png'},

  ]
  return (
    <div className="home">
        <div className="catrgories">
          <ul>
            <li>VFX</li>
            <li>VFX</li>
            <li>VFX</li>
            <li>VFX</li>
          </ul>
        </div>
    </div>
  )
}

export default Home
