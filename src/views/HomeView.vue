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
    <div class="container  d-flex-column align-items-center ">

      <HomeBanner></HomeBanner>
      <div class="img-fluid d-flex justify-content-center my-4"><img src="@/assets/icons/hr.svg" alt="hr"></div>

      <HomeItems section="New Arrival" :CAT="categories.new.name"></HomeItems>
      <HomeItems section="Just For You" :CAT="categories.all.name"></HomeItems>
    </div>

  </div>
</template>

<!-- TODO cart num-->

<script>

import categories from '@/utils/const/categories'

import HomeNav from '@/components/Front/HomeNav.vue';
import HomeBanner from '@/components/Front/HomeBanner.vue';
import HomeItems from '@/components/Front/HomeItems.vue';
export default {
  components: {HomeNav, HomeBanner, HomeItems},
  data() {
    return {
      categories: categories,
    }
  },

}
</script>

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>
