
## 世界上最好維護的網站架構
React + firebase(hosting, Cloud Firestore, storage)

### Routes
* /
* /lab
* /about
* /blog
* /contact
* /admin/login
* /admin/work
* /admin/category
* /admin/lab
```
### Routes 用途
/
首頁，按照分類顯示作品

/lab
夢想研發項目

/about
關於公司介紹

/blog
Medium文張清單

/contact
公司位置 聯絡資料

/admin/login
管理後台登入

/admin/work
管理作品

/admin/category
管理分類項目

/admin/lab
管理lab頁項目
```







### img資料夾
作品 
"data/xxxx.jpg"

ICOM
"img_icon/xxxx.jpg"

LAB 
"img_lab/xxxx.jpg"


LAB
"img_lab/xxx.svg"


### 如何維護檔案

#### 1. 打開 App.js 見基礎架構
前台相關路由 : PublicPageLayout.js
後台相關路由 : DashboardLayout.js
登入: login.js

#### 2. 前台相關頁面 PublicPageLayout.js
見註解
#### 3. 後台相關頁面 DashboardLayout.js
見註解
### TODO
後台
. header footer 內容
. sort功能
