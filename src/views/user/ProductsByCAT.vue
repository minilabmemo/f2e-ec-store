<template>
  <LoadingOverlay :active="status.isLoading" />

  <div class="d-flex flex-column gap-4  ">

    <div class="d-flex justify-content-between ">
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

      <div class="d-flex justify-content-between gap-3 ">
        <button type="button" @click="sortByButton(0, 'default')" class="btn  btn-sm "
          :class="{ 'btn-primary': sortByID === 0, 'btn-outline-primary': sortByID !== 0 }">
          綜合排序</button>
        <button type="button" @click="sortByButton(1, 'price', 'asc')" class="btn  btn-sm "
          :class="{ 'btn-primary': sortByID === 1, 'btn-outline-primary': sortByID !== 1 }">售價由低到高</button>
        <button type="button" @click="sortByButton(2, 'price', 'desc')" class="btn  btn-sm "
          :class="{ 'btn-primary': sortByID === 2, 'btn-outline-primary': sortByID !== 2 }">售價由高到低</button>
      </div>
    </div>



    <div class="row row-cols-2 row-cols-lg-3 " data-cy="products">

      <SaleItem v-for="(item, index) in showItems" :key="index" :item="item" class="col d-flex  " data-cy="item"
        :path="`${$route.params.category}/${$route.params.subcategory}`" />

      <div class="col-6 " v-if="!showItems.length && !status.isLoading">
        <img src="@/assets/images/design/empty200.png" alt="empty200" class="img-fluid ">
      </div>

    </div>


    <Pagination :pages="pagination" @change-page-num="filterItemsByPage" v-if="showItems.length !== 0" />

  </div>

</template>
<script setup>
import {ref, computed, watchEffect, watch} from 'vue';
import SaleItem from '@/components/user/SaleItem.vue';
import Pagination from '@/components/Pagination.vue';
import categoriesConfig from '@/utils/const/categories';
import {storeToRefs} from 'pinia'
const categories = categoriesConfig;


import {useProductStore} from '@/stores/productStore';
const productStore = useProductStore();
const {getProducts, sortProductsBy} = productStore;
const {products, status} = storeToRefs(productStore);




getProducts();

const catItems = ref([]);
const showItems = ref([]);

let pagination = ref({
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
function sortByButton(sortId, field, order,) {
  sortByID = sortId
  sortProductsBy(field, order)

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


watch(() => pagination.value.current_page, (newValue, oldValue) => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});
watchEffect(() => {
  filterItems();
});



</script>
