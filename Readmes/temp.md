review note temp

函式宣告方式建議可以統一，目前有函式陳述跟函式表達混用。

composables 的 useModal 不應可以接受 null 才對，畢竟要呼叫他必定是在 DOM 生成完畢階段，所以型別斷定上用 null 比較不建議。
defineProps 會建議宣告一個變數接著再去渲染到 template 上，這樣比較能夠明確知道來源是 props 還是哪邊來的，否則單看程式碼閱讀時，會不確定其來源要往下閱讀才能確定。