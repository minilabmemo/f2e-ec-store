<template>

  <div class="  d-flex flex-column align-items-center ">

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



</template>

<!-- TODO cart num-->

<script>

import categories from '@/utils/const/categories'
import HomeBanner from '@/components/user/HomeBanner.vue';
import HomeItems from '@/components/user/HomeItems.vue';
import getAllProducts from '@/utils/mixins/getAllProducts';
export default {
  components: {HomeBanner, HomeItems},
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
  mixins: [getAllProducts],


}
</script>

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>@/utils/mixins/getAllProducts
