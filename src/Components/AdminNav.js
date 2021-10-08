import React from 'react'
import {Link} from "react-router-dom";

function AdminNav() {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/admin/work">管理作品資料</Link></li>
        <li><Link to="/admin/category">管理作品分類</Link></li>
        <li><Link to="/admin/navitem">管理選單項目</Link></li>
        <li><Link to="/admin/about">管理簡介頁</Link></li>
        <li><Link to="/admin/lab">管理LAB頁</Link></li>
        <li><Link to="/admin/contact">管理聯絡頁</Link></li>
      </ul>
    </div>
  )
}

export default AdminNav
