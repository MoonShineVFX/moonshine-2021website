import React from 'react'
import {Link} from "react-router-dom";

function AdminNav() {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item"><Link to="/admin/work">管理作品資料列表</Link></li>
          <li className="nav-item"><Link to="/admin/addwork">新增作品資料</Link></li>
          <li className="nav-item"><Link to="/admin/category">管理作品分類列表</Link></li>
          <li className="nav-item"><Link to="/admin/category">新增作品分類</Link></li>
          <li className="nav-item"><Link to="/admin/navitem">管理選單項目列表</Link></li>
          <li className="nav-item"><Link to="/admin/navitem">新增選單項目</Link></li>
          <li className="nav-item"><Link to="/admin/about">管理簡介頁</Link></li>
          <li className="nav-item"><Link to="/admin/lab">管理LAB頁</Link></li>
          <li className="nav-item"><Link to="/admin/lab">新增LAB內容</Link></li>
          <li className="nav-item"><Link to="/admin/contact">管理聯絡頁</Link></li>
        </ul>
      </div>

    </nav>
  )
}

export default AdminNav
