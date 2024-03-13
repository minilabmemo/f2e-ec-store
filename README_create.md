# create vite

根據以下指令建立：
$ npm create vite@latest
Need to install the following packages:
create-vite@5.2.1
Ok to proceed? (y) y
✔ Project name: … f2e-ec-store
✔ Select a framework: › Vue
✔ Select a variant: › Customize with create-vue ↗
Need to install the following packages:
create-vue@3.9.2
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ 是否使用 TypeScript 語法？ … 否 / 是
✔ 是否啟用 JSX 支援？ … 否 / 是
✔ 是否引入 Vue Router 進行單頁應用開發？ … 否 / 是
✔ 是否引入 Pinia 用於狀態管理？ … 否 / 是
✔ 是否引入 Vitest 用於單元測試 … 否 / 是
✔ 是否要引入一款端對端（End to End）測試工具？ › Cypress
✔ 是否引入 ESLint 用於程式碼品質檢測？ … 否 / 是
✔ 是否引入 Prettier 用於程式碼格式化？ … 否 / 是

正在建置專案

專案建置完成，可執行以下命令：

cd f2e-ec-store
npm install
npm run format
npm run dev

## 以下是預設的 README.md：案：

# f2e-ec-store

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
