<template>
  <div class="row products-layout py-3 py-md-5 justify-content-center">
    <div class="col-lg-3 d-none d-lg-flex">
      <CategoriesNav />
    </div>
    <div class="col-12 col-lg-8">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import CategoriesNav from '@/components/user/CategoriesNav.vue'
</script>
