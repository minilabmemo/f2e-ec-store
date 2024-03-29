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

- 功能細節請見：[Feature_Design](./Feature_Design.md)
- 專案建立與開發筆記：[README_create](./README_create.md)

## Start

### NODE version

```
$ node -v
v18.16.1
```

### test

#### E2E cypress

```
npm run test:e2e:dev
```
