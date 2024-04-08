<template>
  <div class="container-lg ">

    <div v-for="(item, index) in items" :key="index"
      class="item bg-cyan-100 box-border text-center m-1 p-5 break-inside-avoid">

      <img class="w-full object-cover object-center" :src="item.imageUrl" alt="style" width="200" />

    </div>
  </div>
</template>


<script setup lang="ts">

import { ref, computed } from 'vue';


import { storeToRefs } from 'pinia'

import { useProductStore } from '@/stores/productStore.js';
const productStore = useProductStore();
const { getProducts, } = productStore;
const { products } = storeToRefs(productStore);
getProducts();

const items = computed(() => {

  if (!products.value) {
    return []
  }

  let filterProducts = products.value.filter((item) => item.category.toString().includes("styles"))

  return filterProducts
})



</script>

<!-- <script> //FIXME
export default {
  data() {
    return {
      repeatedContent: Array.from({length: 20}, (_, index) => {
        const width = 200;
        const height = Math.floor(Math.random() * (500 - 100 + 1)) + 100; //100~500
        return {width, height};
      })
    };
  }
};
</script> -->
