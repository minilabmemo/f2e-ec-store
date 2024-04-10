<template>
  <div class=" d-flex flex-wrap gap-5 align-items-center justify-content-center align-content-center ">

    <div v-for="(item, index) in items" :key="index" class="item  ">
      <router-link :to="`/product/all/all/id/${item.id}`"> <img class="w-full object-cover object-center"
          :src="item.imageUrl" alt="style" width="250"></router-link>


    </div>
  </div>
</template>


<script setup lang="ts">

import { computed } from 'vue';


import { storeToRefs } from 'pinia'

import { useProductStore } from '@/stores/productStore';
const productStore = useProductStore();
const { getProducts, } = productStore;
const { products } = storeToRefs(productStore);
getProducts();

const items = computed(() => {

  if (!products.value) {
    return []
  }

  let filterProducts = products.value.filter((item: { category: { toString: () => string | string[]; }; }) => item.category.toString().includes("styles"))
  let selectedProducts = filterProducts.length >= 8 ? filterProducts.slice(0, 8) : filterProducts;

  return selectedProducts
})



</script>
