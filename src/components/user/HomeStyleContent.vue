<template>
  <div class=" row row-cols-2  row-cols-md-4 gy-4 align-items-center  ">

    <div v-for="(item, index) in items" :key="index" class="col  ">
      <router-link :to="`/product/all/all/id/${item.id}`">
        <img class="flex-image" :src="item.imageUrl" alt="clothes"></router-link>

    </div>

  </div>

</template>

<script setup lang="ts">

import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const { getProducts } = productStore;
const { products } = storeToRefs(productStore);
getProducts();

const items = computed(() => {
  if (!products.value) {
    return [];
  }

  const filterProducts = products.value.filter((item: { category: { toString: () => string | string[]; }; }) => item.category.toString().includes('styles'));
  const selectedProducts = filterProducts.length >= 8 ? filterProducts.slice(0, 8) : filterProducts;

  return selectedProducts;
});

</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>
