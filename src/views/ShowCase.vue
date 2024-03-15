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


    <h3>圖片</h3>
    <div class="row ">
      <div class="col-4 bg-danger ">
        <img :src="image1" alt="image2" class="rwd-image">
      </div>
      <div class="col-4 bg-danger ">
        <img :src="image2" alt="image2" class="rwd-image">
      </div>
      <div class="col-4 bg-danger ">
        <img :src="image3" alt="image3" class="   rwd-image   ">
      </div>
    </div>

    <div class="row ">
      <div class="col-4 bg-danger ">
        <img :src="image1" alt="image2" class="rwd-image">
      </div>
      <div class="col-4 bg-danger ">
        <img :src="image2" alt="image2" class="rwd-image">
      </div>
      <div class="col-4 bg-danger ">
        <img :src="image3" alt="image3" class="   rwd-image   ">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image1: "https://storage.googleapis.com/vue-course-api.appspot.com/boot-api/1710474361663.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D%2B0lV4oEHbOvJ%2FUeYioPKE4Rsl5Q4jHre8aaH0bhCySJP%2FisD%2B0anXS%2BDdxwmGTCio1n%2BgxuZm66g0nzrlOidkkmaS1xlh8D6E%2BrNZ15kpAnmD1RsL8mlSTMei0VNcnt%2FGgY2NEx1VG1O1zOEigm6J2RihbRsSrjOkVBcMJStJVjXvP2FfFxww3Jv3hBeuYAagBD0rH4jb2Bm7xYVkk1iC1lMfWFMuuKstdIQIP2BJFHDwpi%2FW140tacZ3RKIsTXTjGjnEZCZXbjgpBQyA31X%2FpQ573jdbOa6dkBtk%2FfsTs3BwnWKaSY6wCpsQWPxWBke%2BXME3GU6o%2Fm3KUXZteCYA%3D%3D",

      image2: "https://storage.googleapis.com/vue-course-api.appspot.com/boot-api/1710474441038.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jooknx9GjeCxntJwP1caybjlAoXqFUtII4xZGiSuKZ8A9t8bYKIwjILD0xLziBge6qelhJs7y60NgnAPsrKkMxwuhOv%2FBY48aqyaRTw7uYs6s7IC%2Bbw0zhWANm8f4fEhHcM2KbEH3sm%2Bs8ZPjod%2BswCuaKtA7jJf%2F0X52mttwfDM15qXMfjKhnMUl7e%2BgbyytpmxjdEz9sre8LhwF5o0Y48PdNyktAOIEgV%2B5h%2Fqzc0xZFR%2BPE1a%2BB1f5xkm0j95AMR47WQmDKpTNaJ2mzW552JDj90Equ4BHIHndrQdIbhmTwWYbqdVpTdfyi9xkIrqFsHR0F2ZOjevPCFKDvbDqw%3D%3D",
      image3: "https://storage.googleapis.com/vue-course-api.appspot.com/boot-api/1710319721187.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ij5jOo8z%2BD3Zyt0tb6XqIfSoKNXW5ULhab3xl56wd1elnt4cXL8jmqjdugCgtNWH%2BQ7mKg6pFvizIMKaEKouFfqImPYKU93BjKQoptcV7DhNoaN0mgK2aH2PNePQTIx9uFjkKLo28bNU10VAw7LBw0eh%2FTN7vQ2fVKOkf7ftxb6Ziso4DQ2YS3SdhJ02fI4T9%2BeaHVXt7SyFxkDBEmrddOShtliw3DOtrvfIfPP47IcUpwlvLs%2Buz9DNqFhy4lTZo6xTzHxk4n8ZazlRGfRgB58IE8BJPVJr8%2FpWmh4mAvva%2BfY3BJSIXQU5MJIG9dXwrIAb0ykq5g6Elmkd5PcozQ%3D%3D"
    }
  },
}
</script>

<style scoped>
.rwd-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>