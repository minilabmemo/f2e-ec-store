<template>
  <LoadingOverlay :active="status.isLoading" />
  <div class="text-primary" v-if="!filterItems.length && !status.isLoading">
    <div>你搜尋的關鍵字找不到對應商品，請試試其他關鍵字（Ex:上衣）。</div>
  </div>
  <div class="row row-cols-2 row-cols-lg-3">
    <SaleItem v-for="item in filterItems" :key="item.id" :item="item" class="col"
      :path="`${$route.params.category}/${$route.params.subcategory}`" />
  </div>
</template>

<script setup>
import {computed} from 'vue'
import SaleItem from '@/components/user/SaleItem.vue'

import {useProductStore} from '@/stores/productStore'
const productStore = useProductStore()
import {storeToRefs} from 'pinia'
const {getProducts} = productStore
const {products, status} = storeToRefs(productStore)
getProducts()

import {useRoute} from 'vue-router'

const route = useRoute()
const filterItems = computed(() => {
  let itemsBYSearch = []
  let items = products.value ? products.value : []
  itemsBYSearch = items.filter((item) => !item.category.toString().includes('test'))
  itemsBYSearch = items.filter((item) => item.title.toString().includes(route.params.keyword))

  if (itemsBYSearch.length !== 0) {
    return itemsBYSearch.map((item) => ({
      title: item.title,
      src: item.imageUrl,
      ...item
    }))
  }
  return itemsBYSearch
})
</script>
