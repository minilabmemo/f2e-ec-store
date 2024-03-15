<template>
  <div class="tenor-sans-regular ">
    <header class="h-shadow mb-4">

      <div class="d-flex justify-content-center  mb-2 container  ">
        <div class="mx-auto img-fluid "><img src="@/assets/icons/logo_home.svg" alt="Logo"></div>
        <div class="align-self-end ">
          <div class="d-flex">
            <img src="@/assets/icons/save.svg" alt="save">
            <img src="@/assets/icons/split.svg" alt="split">
            <div class="d-flex gap-2 ">
              <img src="@/assets/icons/cart.svg" alt="cart">
              <span class="bg-black text-white px-1 py-0 align-middle  ">0</span>
            </div>
            <img src="@/assets/icons/split.svg" alt="split">
            <img src="@/assets/icons/person.svg" alt="person">

          </div>
        </div>
      </div>
      <div class="  border-bottom   "></div>
      <HomeNav></HomeNav>
    </header>
    <div class="container  d-flex flex-column align-items-center ">

      <HomeBanner></HomeBanner>
      <div class="img-fluid  my-5"><img src="@/assets/icons/hr.svg" alt="hr"></div>

      <HomeItems section="NEW ARRIVAL" :CAT="categories.new.category" :products="products"></HomeItems>

      <div class="img-fluid  my-5"><img src="@/assets/icons/hr.svg" alt="hr"></div>
      <HomeItems section="JUST FOR YOU" :CAT="categories.hot.category" :products="products"></HomeItems>
      <div class="img-fluid  my-5"><img src="@/assets/icons/hr.svg" alt="hr"></div>
      <div class="row g-5 ">
        <div class="col-4"><img src="@/assets/images/design/d1.png" alt="discount"></div>
        <div class="col-4"><img src="@/assets/images/design/d2.png" alt="discount"></div>
        <div class="col-4"><img src="@/assets/images/design/d3.png" alt="discount"></div>
      </div>
      <div class="img-fluid  my-5"><img src="@/assets/icons/hr.svg" alt="hr"></div>
      <h1 class="mb-5 ">COLLECTIONS</h1>
      <div class="d-flex flex-column gap-3  ">
        <div class=" "><img src="@/assets/images/design/c1.png" alt="style" class="img-fluid"></div>
        <div class=""><img src="@/assets/images/design/c2.png" alt="style" class="img-fluid"></div>
      </div>
      <div class="img-fluid  my-5"><img src="@/assets/icons/hr.svg" alt="hr"></div>

      <div class="d-flex gap-5  ">

        <div class="  my-5"><img src="@/assets/icons/facebook.svg" alt="facebook"></div>
        <div class="my-5"><img src="@/assets/icons/Instagram.svg" alt="Instagram"></div>
        <div class="my-5"><img src="@/assets/icons/YouTube.svg" alt="YouTube"></div>
        <div class="my-5"><img src="@/assets/icons/line.svg" alt="line"></div>
      </div>


    </div>

    <footer class="bg-orange-100 container-fluid p-5 text-gray-500 ">
      <div class="container">
        <div class=" row d-flex justify-content-center ">
          <div class="col-4 d-flex flex-column  gap-2 ">
            <div class="row row-cols-2 g-1 gy-3 ">
              <div class="col">公司資訊</div>
              <div class="col">售後服務</div>
              <div class="col">品牌介紹</div>
              <div class="col">常見問題</div>
            </div>


          </div>
          <div class="col-4">
            <div class="w-75 ">客服時間：上午 10:30~12:00, 下午 13:30~18:00（例假日休息）</div>
          </div>
          <div class="col-4">
            <div>星展區，時尚大道 88 號，韓星大樓 3 樓</div>
            <div>(02) 888-5678</div>
            <div>koringoffice@line.tw </div>
          </div>

        </div>
      </div>




    </footer>
  </div>
</template>

<!-- TODO cart num-->

<script>

import categories from '@/utils/const/categories'

import HomeNav from '@/components/Front/HomeNav.vue';
import HomeBanner from '@/components/Front/HomeBanner.vue';
import HomeItems from '@/components/Front/HomeItems.vue';
import {userProductsApi} from '@/utils/const/path'
export default {
  components: {HomeNav, HomeBanner, HomeItems},
  data() {
    return {
      categories: categories,
      products: [],
      status: {
        isLoading: false,
        error: ""
      }

    }
  },
  provide() {
    return {
      status: this.status
    };
  },

  created() {

    const url = userProductsApi;
    this.status.isLoading = true;
    this.axios.get(url).then((response) => {
      this.status.isLoading = false;
      if (response.data.success) {
        this.products = response.data.products
        console.log("products data done", this.isLoading)

      } else {
        this.status.error = "取得資料失敗，請稍後再重新載入。";
        console.log("err:", response.data)
      }
    }).catch((err) => {
      this.status.isLoading = false;
      this.status.error = "取得資料錯誤，請稍後再重新載入。"; //TODO 錯誤集中
      console.log("err:", err)

    });
  },

}
</script>

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>
