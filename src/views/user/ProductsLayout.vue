<template>

  <div class="row products-layout py-5">
    <div class="col-3 d-none d-sm-bloc">
      <CATNav></CATNav>
    </div>
    <div class="col-9">
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
