# Feature Design

功能與設計細節。

## 前台

### Landing Page (首頁)

- [x] 網站前台 meta 資料設定 [ title 與 icon ]
- [ ] header 固定在上方，顯示可選擇分類頁面，點擊即導向設定頁面。
- [ ] Banner 固定圖片
- [x] New Arrival 顯示 New 分類商品，未獲取到資料則顯示 coming soon 圖示及預設商品名稱。
- [x] Just For You 隨機顯示 Hot 分類商品，未獲取到資料則顯示 coming soon 圖示。
- [x] 獲取資料中則商品名稱會顯示 Loading

### network

- [ ] 如果出現後端錯誤 ex: 404 則彈出視窗告知，確定仍可繼續瀏覽。

### 商品列表

- 上方導覽主分類可以看出目前所在頁面
- 側邊分類可以看出商品數量，點擊沒有分類的商品會出現
  - ＊註：目前後端商品分類設定因為只有分類欄位，以子分類為主，多個分類以"｜"隔開。
