<template>
  <div>
    <router-link :to="`/product/${path}/id/${item.id}`" class="nav-link h-100">
      <div class="d-flex flex-column gap-2 gap-md-4 align-self-center h-100 product-item">
        <div>
          <div class="img-container">
            <img :src="item.imageUrl" alt="clothes" class="flex-image">
          </div>
        </div>

        <div class="text-center d-flex flex-column justify-content-between h-100">
          <h4 style="">{{ item.title }}</h4>
          <div class="d-flex gap-2 justify-content-center align-items-baseline mb-3 mt-auto">
            <span class="text-500" v-show="item.price !== item.origin_price">
              <del>${{ $filters.currency(item.origin_price) }}</del></span>
            <span class="price me-4">${{ $filters.currency(item.price) }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/utils/type';

const { path, item } = defineProps<{
  path: string;
  item: Product;
}>();

</script>

<style scoped>
.img-container {
  overflow: hidden;
}

.product-item:hover {
  opacity: 0.8;
}

.product-item:hover img {
  transform: scale(1.1);
}

.flex-image {
  object-fit: cover;
  aspect-ratio: 3/4;
  width: 100%;
  height: auto;
}
</style>
