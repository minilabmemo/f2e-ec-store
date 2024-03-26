<template>

  <div class="row products-layout py-5">
    <div class="col-lg-3 d-none d-lg-flex">
      <CATNav></CATNav>
    </div>
    <div class="col-12 col-lg-9">
      <router-view></router-view>
    </div>

  </div>


</template>


<script>


import CATNav from '@/components/user/CATNav.vue'

export default {
  components: {CATNav},

}
</script>
