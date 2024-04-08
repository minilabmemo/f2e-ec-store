<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>

  <div class="d-flex flex-column gap-4  ">


    <nav aria-label="breadcrumb ">
      <ol class="breadcrumb mb-0 ">
        <li class="breadcrumb-item" v-if="$route.params.category !== 'all'"><router-link :to="`/product/all/all`"> 全部
          </router-link>
        </li>
        <li class="breadcrumb-item"><router-link :to="`/product/${$route.params.category}/all`"> {{ category_name
            }}</router-link>
        </li>
        <li v-if="sub_category_name" class="breadcrumb-item ">
          <router-link :to="`/product/${$route.params.category}/${$route.params.subcategory}`"> {{ sub_category_name
            }}</router-link>
        </li>
      </ol>
    </nav>


    <div class="row row-cols-2 row-cols-lg-3 " data-cy="products">

      <SaleItem v-for="(item, index) in showItems" :key="index" :item="item" class="col" data-cy="item"
        :path="`${$route.params.category}/${$route.params.subcategory}`">
      </SaleItem>
      <div class="col-6 " v-if="!showItems.length && !status.isLoading">
        <img src="@/assets/images/design/empty200.png" alt="empty200" class="img-fluid ">
      </div>

    </div>


    <Pagination :pages="pagination" @change-page-num="filterItemsByPage" v-if="showItems.length !== 0">
    </Pagination>

  </div>

</template>
<script setup>
import {ref, computed, watch, reactive, watchEffect} from 'vue';
import SaleItem from '@/components/user/SaleItem.vue';
import Pagination from '@/components/Pagination.vue';
import categoriesConfig from '@/utils/const/categories';
import {storeToRefs} from 'pinia'
const categories = categoriesConfig;


import {useProductStore} from '@/stores/productStore.js';
const productStore = useProductStore();
const {getProducts, } = productStore;
const {products, status} = storeToRefs(productStore);

getProducts();

const catItems = ref([]);
const showItems = ref([]);
const filterErr = ref("");
let pagination = reactive({
  total_pages: 1,
  current_page: 1,
  has_pre: true,
  has_next: true,
})
const dataPerPage = 12;
import {useRoute} from 'vue-router'

const route = useRoute()



function filterItems() {
  let itemByCAT = [];
  if (!products.value) {
    return
  }

  switch (route.params.category) {
    case 'all':
      itemByCAT = products.value.filter((item) => !item.category.toString().includes('test'));
      break;
    default:
      itemByCAT = products.value.filter((item) => item.category.toString().includes(route.params.category));
      break;
  }

  switch (route.params.subcategory) {
    case 'all':
      break;
    default:
      itemByCAT = products.value.filter((item) => item.category.toString().includes(route.params.category));
      itemByCAT = itemByCAT.filter((item) => item.category.toString().includes(route.params.subcategory));
      break;
  }

  catItems.value = itemByCAT;
  filterItemsByPage();
}



function filterItemsByPage(currentPage = 1) {
  if (!catItems.value) {
    return;
  }

  pagination.current_page = currentPage;
  pagination.total_pages = Math.ceil(Object.keys(catItems.value).length / dataPerPage);

  pagination.has_pre = true;
  pagination.has_next = true;
  if (pagination.current_page === 1) {
    pagination.has_pre = false;
  }

  if (pagination.current_page === pagination.total_pages) {
    pagination.has_next = false;
  }
  const startIndex = (pagination.current_page - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  showItems.value = catItems.value.slice(startIndex, endIndex);
}


const category_name = computed(() => categories[route.params.category] ? categories[route.params.category].name : '')
const sub_category_name = computed(() => {
  if (
    categories[route.params.category]?.sub_category &&
    categories[route.params.category].sub_category[route.params.subcategory]
  ) {

    return categories[route.params.category].sub_category[route.params.subcategory].name
  }
  return ""
})



watchEffect(() => {
  filterItems();
});



</script>
