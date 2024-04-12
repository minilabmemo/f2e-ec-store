<template>

  <div class="tenor-sans-regular   ">
    <ToastMessages />
    <header class="h-shadow mb-4 col" id="header">

      <div class="container-xl justify-content-center  mb-2  align-items-end   d-none d-lg-flex position-relative  ">

        <div class="mx-auto  ">
          <HomeLogo />
        </div>
        <div class="position-absolute bottom-0 end-0  " id="device-lg-location">
          <!-- <for teleport> -->
        </div>
      </div>



      <div class="  border-bottom  d-none d-lg-flex  "></div>
      <div class="container-xl">
        <HomeNav />
      </div>

    </header>
    <div class="container-xl " id="content">

      <RouterView />
    </div>
    <HomeFooter />
  </div>

  <Teleport :to="userNavLoc">
    <UserNav />
  </Teleport>
</template>


<script setup lang="ts">
import HomeNav from '@/components/user/HomeNav.vue';
import HomeLogo from '@/components/user/HomeLogo.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import HomeFooter from '@/components/HomeFooter.vue';
import UserNav from '@/components/user/UserNav.vue';
import { useWindowSize } from '@vueuse/core'
import { ref, watchEffect } from 'vue';

const { width } = useWindowSize()
const isLargeDevice = ref(false);
const userNavLoc = ref("#device-lg-location");

watchEffect(() => {
  let newWidth = width.value
  if (newWidth >= 992) {
    isLargeDevice.value = true;
    userNavLoc.value = "#device-lg-location"
  } else {
    isLargeDevice.value = false;
    userNavLoc.value = "#device-sm-location"

  }
});
</script>


<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}

#content {
  min-height: 60vh;
}
</style>
