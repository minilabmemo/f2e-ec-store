<template>
  <div class="container-fluid ">
    <h1>This is an ShowCaseView page</h1>
    <div>note:</div>
    <ul>
      <li><code>custom.css在all.scss後面引用，不可以寫進all.scss裡，否則會蓋不掉</code></li>
      <li><code>以下紀錄不同尺寸會有的大小，但大小呈現需要縮放去改變</code></li>
      <li><code>網頁1920px /手機 375px</code></li>
      <li>字體
        <ul>
          <li><code>class="font-monospace"   code預設字體不用改</code></li>
          <li><code class="tenor-sans-regular">class="tenor-sans-regular"</code></li>
        </ul>

      </li>
      <li><code>BS縮放式使用rem+vm設定，但這樣大小不容易符合預期，所以custom加了media-qry,控制斷點定義</code></li>
    </ul>

    <table class="table">
      <tr>
        <td>樣式 </td>
        <td>樣式套用效果 [縮放以查看效果]</td>
      </tr>
      <tr>
        <td>
          <div class="font-monospace">h1 title</div>
          <div>at: section</div>
          <div>lg:64p/sm:40px</div>

        </td>
        <td>
          <h1 class="tenor-sans-regular">New Arrival </h1>
        </td>
      </tr>
      <tr>
        <td>
          <div class="font-monospace">h3 subtitle</div>
          <div>at: category</div>
          <div>lg:24p/sm:16px</div>

        </td>
        <td>
          <h3 class="tenor-sans-regular">分類 </h3>
        </td>
      </tr>
      <tr class="tenor-sans-regular">
        <td>
          <div>h4 subtitle</div>
          <div>at: 商品標題</div>
          <div>lg:24p/sm:14px</div>

        </td>
        <td>
          <h4>商品標題 </h4>
        </td>
      </tr>
      <tr class="tenor-sans-regular">
        <td>
          <div>price</div>
          <div>at: 價格</div>
          <div>lg:32p/sm:14px</div>

        </td>
        <td>
          <div class="price ">$320 </div>
        </td>
      </tr>
      <tr class="tenor-sans-regular">
        <td>
          <div>按鈕</div>
          <div>at: 按鈕</div>
          <div>lg:24p/sm:16px</div>

        </td>
        <td>
          <button class="btn btn-black q-btn">Explore More <img src="@/assets/icons/next_arrow.svg" alt="Next Arrow">
          </button>


        </td>
      </tr>
    </table>



  </div>
</template>
