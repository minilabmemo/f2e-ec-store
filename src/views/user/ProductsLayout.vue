<template>

  <div class="row products-layout py-3 py-md-5 ">
    <div class="col-lg-3 d-none d-lg-flex">
      <CATNav />
    </div>
    <div class="col-12 col-lg-9">
      <router-view />
    </div>

  </div>


</template>


<script>


import CATNav from '@/components/user/CategoriesNav.vue'

export default {
  components: {CATNav},

}



</script>
