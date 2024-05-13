<template>
  <div class="container-lg d-flex flex-column align-items-center my-3 my-md-5">
    <HomeBanner />
    <div class="my-3 my-md-5">
      <img src="@/assets/img/icons/hr.svg" alt="hr" class="img-fluid">
    </div>

    <HomeItems section="NEW ARRIVAL" :CAT="categories.new.key" :products="products" id="news" />

    <div class="my-3 my-md-5">
      <img src="@/assets/img/icons/hr.svg" alt="hr" class="img-fluid">
    </div>
    <HomeItems section="JUST FOR YOU" :CAT="categories.hot.key" :products="products" id="special" />
    <div class="my-3 my-md-5">
      <img src="@/assets/img/icons/hr.svg" alt="hr" class="img-fluid">
    </div>

    <HomeNews />
    <div class="my-3 my-md-5">
      <img src="@/assets/img/icons/hr.svg" alt="hr" class="img-fluid">
    </div>
    <h1 class="mb-5">COLLECTIONS</h1>
    <div class="d-flex flex-column gap-3 justify-content-center align-items-center">
      <div>
        <img src="@/assets/img/design/c1.png" alt="winter clothes" class="img-fluid">
      </div>

      <div>
        <img src="@/assets/img/design/c2.png" alt="autumn clothes" class="img-fluid">
      </div>
      <div class="d-flex justify-content-center gap-5">
        <button class="btn btn-black explore-btn">
          <router-link :to="`/style`" class="nav-link">
            Styles Book<img src="@/assets/img/icons/next_arrow.svg" alt="Next Arrow"></router-link>
        </button>
      </div>
    </div>
    <div class="my-3"><img src="@/assets/img/icons/hr.svg" alt="hr" class="img-fluid"></div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import HomeBanner from '@/components/user/HomeBanner.vue'
import HomeItems from '@/components/user/HomeItems.vue'
import HomeNews from '@/components/user/HomeNews.vue'
import categoriesConfig from '@/utils/config/categories'
import {storeToRefs} from 'pinia'
const categories = ref(categoriesConfig)
import {useProductStore} from '@/stores/productStore'
const productStore = useProductStore()
const {getProducts} = productStore
const {products} = storeToRefs(productStore)
getProducts()
</script>

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>
