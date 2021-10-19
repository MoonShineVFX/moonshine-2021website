import React from 'react'
import {Link} from "react-router-dom";

function AdminNav() {
  return (
    <nav className="col-2 d-md-block text-white bg-dark sidebar collapse fixed-top" style={{minHeight:'100vh'}}>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column nav-pills">
          <li className="nav-item"><Link to="/admin/work" className="nav-link link-light">管理作品資料列表</Link></li>
          <li className="nav-item"><Link to="/admin/category" className="nav-link link-light">管理分類項目</Link></li>
          <li className="nav-item"><Link to="/admin/lab" className="nav-link link-light">管理LAB頁</Link></li>
          {/* <li className="nav-item "><Link to="/admin/navitem" >管理選單項目列表</Link></li> */}
          {/* <li className="nav-item"><Link to="/admin/about">管理簡介頁</Link></li> */}
          
          {/* <li className="nav-item"><Link to="/admin/contact">管理聯絡頁</Link></li> */}
        </ul>
      </div>

    </nav>
  )
}

export default AdminNav
