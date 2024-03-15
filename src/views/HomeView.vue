<template>
  <div class="tenor-sans-regular">
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
      <div class="img-fluid  my-4"><img src="@/assets/icons/hr.svg" alt="hr"></div>

      <HomeItems section="New Arrival" :CAT="categories.new.category" :products="products"></HomeItems>

      <div class="img-fluid  my-4"><img src="@/assets/icons/hr.svg" alt="hr"></div>
      <HomeItems section="Just For You" :CAT="categories.hot.category" :products="products"></HomeItems>
    </div>

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
