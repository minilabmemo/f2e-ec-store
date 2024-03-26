<template>

  <div class="tenor-sans-regular   ">
    <ToastMessages></ToastMessages>
    <header class="h-shadow mb-4 col" id="header">

      <div class="container-xl justify-content-center  mb-2   position-relative d-none d-lg-flex  ">
        <div class="mx-auto  ">
          <HomeLogo></HomeLogo>
        </div>


        <div class="position-absolute  end-0 bottom-0  ">
          <UserNav></UserNav>
        </div>
      </div>
      <div class="  border-bottom  d-none d-lg-flex  "></div>
      <div class="container-xl">
        <HomeNav></HomeNav>
      </div>

    </header>
    <div class="container-xl " id="content">
      <RouterView />
    </div>
    <HomeFooter></HomeFooter>
  </div>
</template>



<script>


import HomeNav from '@/components/user/HomeNav.vue';
import HomeLogo from '@/components/user/HomeLogo.vue';
import emitter from "@/utils/methods/emitter";
import ToastMessages from '@/components/ToastMessages.vue';
import HomeFooter from '@/components/HomeFooter.vue';
import UserNav from '@/components/user/UserNav.vue';
import getCart from '@/utils/mixins/getCart';
import {computed} from 'vue'
export default {
  components: {HomeNav, HomeLogo, ToastMessages, HomeFooter, UserNav},
  provide() {
    return {
      emitter,
      dataCart: computed(() => this.cart)
    };
  },

  mounted() {
    emitter.on('update-cartQty', () => {
      this.getCart();
    });

  },

  mixins: [getCart],

  created() {
    this.getCart();
  },




}
</script>

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}

#content {
  min-height: 60vh;
}
</style>
