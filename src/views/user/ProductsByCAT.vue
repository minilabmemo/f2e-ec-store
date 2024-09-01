<template>
  <LoadingOverlay :active="status.isLoading" />

  <div class="d-flex flex-column gap-3">
    <div class="row gy-3">
      <nav a class="col-12 col-xs-4 d-flex justify-content-start justify-content-xs-start" ria-label="breadcrumb ">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item" v-if="$route.params.category !== 'all'">
            <router-link :to="`/product/all/all`" class="link-offset-2"> 全部 </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link class="link-offset-2" :to="`/product/${$route.params.category}/all`"> {{ category_name
              }}</router-link>
          </li>
          <li v-if="sub_category_name" class="breadcrumb-item">
            <router-link class="link-offset-2" :to="`/product/${$route.params.category}/${$route.params.subcategory}`">
              {{ sub_category_name }}</router-link>
          </li>
        </ol>
      </nav>

      <div class="col-12 col-xs-8 d-flex justify-content-end justify-content-xs-end">
        <div class="btn-group">
          <button type="button" @click="sortByButton(0, 'default')" class="btn btn-sm"
            :class="{ 'btn-primary': sortByID === 0, 'btn-outline-primary': sortByID !== 0 }">綜合排序</button>
          <button type="button" @click="sortByButton(1, 'price', 'asc')" class="btn btn-sm"
            :class="{ 'btn-primary': sortByID === 1, 'btn-outline-primary': sortByID !== 1 }">售價由低到高</button>
          <button type="button" @click="sortByButton(2, 'price', 'desc')" class="btn btn-sm"
            :class="{ 'btn-primary': sortByID === 2, 'btn-outline-primary': sortByID !== 2 }">售價由高到低</button>
        </div>
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-3" data-cy="products">
      <SaleItem v-for="item in showItems" :key="item.id" :item="item" class="col d-flex" data-cy="product-item"
        :path="`${$route.params.category}/${$route.params.subcategory}`" />

      <div class="col-6" v-if="!showItems.length && !status.isLoading">
        <img src="@/assets/img/design/empty200.png" alt="empty200" class="img-fluid">
      </div>
    </div>

    <Pagination :pages="pagination" @change-page-num="filterItemsByPage" v-if="showItems.length !== 0" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch, type Ref } from 'vue';
import SaleItem from '@/components/user/SaleItem.vue';
import Pagination from '@/components/PaginationAct.vue';
import categoriesConfig from '@/utils/config/categories';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/productStore';
import { useRoute } from 'vue-router';
import statusStore from '@/stores/statusStore';
import type { Product } from '@/utils/type';

const categories = categoriesConfig;

const productStore = useProductStore();
const { getProducts, sortProductsBy } = productStore;
const { products } = storeToRefs(productStore);
const status = statusStore();
getProducts();

const catItems: Ref<Product[]> = ref([]);
const showItems: Ref<Product[]> = ref([]);

const pagination = ref({
  total_pages: 1,
  current_page: 1,
  has_pre: true,
  has_next: true
});
const dataPerPage = 12;

const route = useRoute();
function filterItems() {
  const categoryKey = route.params.category as string;
  const subCategoryKey = route.params.subcategory as string;
  let itemByCAT: Product[] = [];
  if (!products.value) {
    return;
  }

  switch (route.params.category) {
    case 'all':
      itemByCAT = products.value.filter((item) => !item.category.toString().includes('test'));
      break;
    default:
      itemByCAT = products.value.filter((item) => item.category.toString().includes(categoryKey));
      break;
  }

  switch (route.params.subcategory) {
    case 'all':
      break;
    default:
      itemByCAT = products.value.filter((item) => item.category.toString().includes(categoryKey));
      itemByCAT = itemByCAT.filter((item) => item.category.toString().includes(subCategoryKey));
      break;
  }

  catItems.value = itemByCAT;
  filterItemsByPage(pagination.value.current_page);
}

function filterItemsByPage(currentPage = 1) {
  if (!catItems.value) {
    return;
  }

  pagination.value.current_page = currentPage;
  pagination.value.total_pages = Math.ceil(Object.keys(catItems.value).length / dataPerPage);

  pagination.value.has_pre = true;
  pagination.value.has_next = true;
  if (pagination.value.current_page === 1) {
    pagination.value.has_pre = false;
  }

  if (pagination.value.current_page === pagination.value.total_pages) {
    pagination.value.has_next = false;
  }
  const startIndex = (pagination.value.current_page - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  showItems.value = catItems.value.slice(startIndex, endIndex);
}

let sortByID = 0;
function sortByButton(sortId: number, field: string, order?: 'asc' | 'desc') {
  sortByID = sortId;
  sortProductsBy(field, order);
}

const category_name = computed(() => {
  let category = route.params.category;
  if (Array.isArray(category)) {
    category = category[0];
  }
  return categories[category] ? categories[category].name : '';
});
const sub_category_name = computed(() => {
  let category = route.params.category;
  let subcategory = route.params.subcategory;

  if (Array.isArray(category)) {
    category = category[0];
  }
  if (Array.isArray(subcategory)) {
    subcategory = subcategory[0];
  }

  if (typeof category === 'string' && typeof subcategory === 'string') {
    return categories[category]?.sub_category?.[subcategory]?.name ?? '';
  }
  return '';
});

watch(
  () => pagination.value.current_page,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
);
watchEffect(() => {
  filterItems();
});
</script>
