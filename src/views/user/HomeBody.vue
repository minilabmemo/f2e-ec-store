<template>

  <div class="container-lg  d-flex flex-column align-items-center my-3 my-md-5 ">

    <HomeBanner />
    <div class="my-5"><img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid"></div>

    <HomeItems section="NEW ARRIVAL" :CAT="categories.new.key" :products="products" id="news" />

    <div class="my-5"><img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid"></div>
    <HomeItems section="JUST FOR YOU" :CAT="categories.hot.key" :products="products" id="special" />
    <div class="my-5"><img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid"></div>
    <div class="row   align-items-end ">
      <div class="col-4"><img src="@/assets/images/design/news1.png" class="img-fluid" alt="news"></div>
      <div class="col-4"><img src="@/assets/images/design/news2.png" class="img-fluid" alt="news"></div>
      <div class="col-4"><img src="@/assets/images/design/news3.png" class="img-fluid" alt="news"></div>
    </div>

    <div class="my-5"><img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid"></div>
    <h1 class="mb-5 ">COLLECTIONS</h1>
    <div class="d-flex flex-column gap-3  justify-content-center align-items-center ">
      <div class=""><img src="@/assets/images/design/c1.png" alt="style" class="img-fluid"></div>

      <div class=""><img src="@/assets/images/design/c2.png" alt="style" class="img-fluid"></div>
      <div class="d-flex justify-content-center gap-5">
        <button class="btn btn-black q-btn">
          <router-link :to="`/style`" class="nav-link">
            Styles Book<img src="@/assets/icons/next_arrow.svg" alt="Next Arrow"></router-link>
        </button>
      </div>
    </div>
    <div class="my-3"><img src="@/assets/icons/hr.svg" alt="hr" class="img-fluid"></div>






  </div>



</template>


<script setup>
import {ref} from 'vue';
import HomeBanner from '@/components/user/HomeBanner.vue';
import HomeItems from '@/components/user/HomeItems.vue';
import categoriesConfig from '@/utils/config/categories';
import {storeToRefs} from 'pinia'
const categories = ref(categoriesConfig);
import {useProductStore} from '@/stores/productStore';
const productStore = useProductStore();
const {getProducts, } = productStore;
const {products} = storeToRefs(productStore);
getProducts();



</script>



<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>
@/utils/config/categories