# f2e-ec-store

這是一個練習專案，使用 vue 3 + vite 建立，加上 bootstrap 與客製樣式設定。

## 電子商務 - 服飾網站

- 串接六角 API 進行商品購物管理

  - 後臺管理（需登入）
    - 本地端：http://localhost:5173/#/admin/dashboard/products/
    - 線上端：https://minilabmemo.github.io/f2e-ec-store/#/admin/dashboard/products/
  - 前台網站（免登入）
    - 本地端：http://localhost:5173/
    - 線上端：https://minilabmemo.github.io/f2e-ec-store/#/

- 功能細節請見：[Feature_Design](./Readmes/Feature_Design.md)
- 專案建立與開發筆記：[README_PROJECT](./Readmes/README_create.md)
- 版本與修正紀錄：[CHANGELOG](./Readmes/CHANGELOG.md)

## Start

### NODE version

```
$ nvm use v20.13.1
Now using node v20.13.1 (npm v10.5.2)
$ node -v
v20.13.1
```

### test

#### E2E cypress

```
npm run test:e2e:dev
```

### 圖片版權

本專案非商業使用，圖片為網路搜尋資源。

- 圖片版權來自 Unsplash 所有，可點選 [這裡查看圖片來源](./img_source.md)。
