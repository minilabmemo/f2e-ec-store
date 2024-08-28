<template>
  <div class="d-flex flex-column align-items-center justify-content-center"
    v-if="!saveItems || Object.keys(saveItems.data).length === 0">
    <span class="fs-3 fw-bold" style="width: 9.375rem"> 無收藏商品。</span>

    <div class="mt-3" style="width: 9.375rem">
      <button class="btn btn-outline-primary" type="button">
        <router-link to="/product/all/all" class="nav-link"> 探索更多商品</router-link>
      </button>
    </div>
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-12 col-md-8">
      <h5>收藏清單</h5>
      <template v-for="item in displayItems" :key="item.id">
        <div class="row justify-content-center p-3 g-3" data-cy="item">
          <div class="col-5 col-xs-3 d-flex align-items-center justify-content-center">
            <router-link class="nav-link" :to="`/product/all/all/id/${item.id}`"
              :class="{ 'link-disabled ': !item.on_stock }">
              <div style="max-width: 10rem">
                <img :src="item.imageUrl" alt="clothes" class="flex-image">
              </div>
            </router-link>
          </div>
          <div class="col-7 col-xs-8 d-flex flex-column justify-content-between">
            <div class="d-flex flex-column justify-content-between align-items-start text-start">
              <div>
                <router-link :to="`/product/all/all/id/${item.id}`" :class="{ 'link-disabled ': !item.on_stock }">
                  <h4 class="text-primary">{{ item.title }}</h4>
                </router-link>
              </div>
              <span class="text-500" v-show="item.on_stock">剩餘數量： {{ item.num }}</span>
              <div class="d-flex gap-2 justify-content-center align-items-center my-1">
                <span class="text-500" v-show="item.origin_price !== item.price">
                  <del>${{ item.origin_price }}</del></span>
                <span class="text-primary me-4" v-show="item.price">${{ item.price }}</span>
              </div>
              <span class="text-secondary ms-2" v-if="!item.on_stock"> 此商品已下架。</span>
            </div>
            <div class="d-flex justify-content-start gap-2 gap-md-3">
              <button type="button" class="btn btn-outline-secondary text-nowrap"
                :class="{ 'btn-sm': isExtraSmallDevice }" @click="removeItem(item.id)">移出收藏</button>
              <button type="button" class="btn btn-primary text-nowrap" @click="addCartCheck(item.id, 1)"
                :class="{ disabled: !item.on_stock, 'btn-sm': isExtraSmallDevice }">加入購物車</button>
            </div>
          </div>

          <div class="border-bottom border-500"></div>
        </div>
      </template>

      <Pagination :pages="pagination" @change-page-num="filterItemsByPage" class="mt-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/PaginationAct.vue';
import { useProductStore } from '@/stores/productStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import LocalStorage from '@/utils/methods/localStorage';
import { addCartCheck } from '@/utils/methods/addCartCheck';
import { useDeviceSize } from '@/composables/useDeviceSize';
import type { PaginationT, SaveProduct, Product } from '@/utils/type';

const { isExtraSmallDevice } = useDeviceSize();

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { getProducts } = productStore;

const saveKey = 'favorite';
let saveItems = ref<{ data: Record<string, Product> }>({ data: {} });
let displayItems = ref<Product[]>([]);

const pagination = ref<PaginationT>({
  total_pages: 1,
  current_page: 1,
  has_pre: true,
  has_next: true
});
const dataPerPage = 5;

const getSaveItems = () => {
  const saveProducts: SaveProduct[] = LocalStorage.get(saveKey) || [];

  //  SaveProduct 類型轉為 Product
  const productsMap: Record<string, Product> = {};
  saveProducts.forEach((item) => {
    const product: Product = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      imagesUrl: [],
      num: 0,
      origin_price: 0,
      price: 0,
      on_stock: false,
      unit: "",
      category: "",
      subcategory: "",
      is_enabled: 0,
      content: '',
      description: '',
    };
    productsMap[item.id] = product;
  });

  saveItems.value.data = productsMap;
  filterItemsByPage();
};

const filterItemsByPage = (currentPage = 1) => {
  if (!saveItems.value) return;

  pagination.value.current_page = currentPage;
  pagination.value.total_pages = Math.ceil(Object.keys(saveItems).length / dataPerPage);
  pagination.value.has_pre = pagination.value.current_page !== 1;
  pagination.value.has_next = pagination.value.current_page !== pagination.value.total_pages;

  const startIndex = (pagination.value.current_page - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  displayItems.value = Object.values(saveItems.value.data).slice(startIndex, endIndex);
};

const removeItem = (id: string) => {
  let nowItems: SaveProduct[] = LocalStorage.get(saveKey) || [];
  const updatedItems = nowItems.filter(item => item.id !== id);
  LocalStorage.set(saveKey, updatedItems);
  getSaveItems();
  getProducts();
};

watch(
  () => products,
  (val) => {
    if (saveItems.value) {
      for (const [key, item] of Object.entries(saveItems.value.data)) {
        saveItems.value.data[key].on_stock = false;
        val.value.forEach((element) => {
          if (item.id === element.id) {
            saveItems.value.data[key].num = element.num;
            saveItems.value.data[key].origin_price = element.origin_price;
            saveItems.value.data[key].price = element.price;
            saveItems.value.data[key].on_stock = true;
          }
        });
      }

      filterItemsByPage();
    }
  },
  { deep: true }
);
getSaveItems();
getProducts();
</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}

.link-disabled {
  pointer-events: none;
  text-decoration: none;
}
</style>
