<template>
  <LoadingOverlay :active="status.isLoading" />
  <div class="d-flex flex-column align-items-center  justify-content-center fs-3 fw-bold "
    v-if="!saveItems || Object.keys(saveItems.data).length === 0"> 無收藏商品。
    <div class="mt-3 ">
      <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all" class="nav-link ">
          探索更多商品</router-link>
      </button>
    </div>
  </div>
  <div v-else class=" container-xl row justify-content-center ">

    <div class="col-12 col-md-7 ">
      <h4>收藏清單</h4>
      <template v-for="(item) in displayItems" :key="item.id">

        <div class="row justify-content-center border-bottom border-black p-3 g-3" data-cy=" item">
          <div class="col-12 col-md-4  d-flex align-items-center  justify-content-center ">
            <div style="max-width: 200px"> <img :src="item.imageUrl" alt="imageUrl" class="flex-image"></div>

          </div>
          <div class="col-12 col-md-8  ">

            <div class=" d-flex  flex-column  justify-content-between  align-items-start text-start ms-2">
              <div> {{ item.title }}</div>
              <div class="d-flex gap-2 justify-content-center  align-items-center ms-2">
                <span class="text-300" v-show="item.origin_price !== item.price"> <del>${{ item.origin_price
                    }}</del></span>
                <span class="text-primary  me-4 " v-show="item.price">${{ item.price }}</span>

              </div>
              <span class="text-secondary ms-2" v-if="!item.on_stock"> 此商品已下架。</span>
              <div class="d-flex gap-2 mt-2 ">
                <button type="button" class=" btn btn-outline-secondary " :disabled="!item.on_stock">
                  <router-link class="nav-link" :to="`/product/all/all/id/${item.id}`">前往商品頁</router-link>
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="removeItem(item.id)">
                  移出收藏
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="addCartCheck(item.id, 1)">
                  加入購物車
                </button>
              </div>

            </div>

          </div>

        </div>
      </template>

      <Pagination :pages="pagination" @change-page-num="filterItemsByPage" class="mt-3" />
    </div>
  </div>

</template>

<script setup>
import Pagination from '@/components/PaginationAct.vue';
import {useProductStore} from '@/stores/productStore';
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia'
import LocalStorage from '@/utils/methods/localStorage.js'
import {addCartCheck} from '@/utils/methods/addCartCheck.js'
const {status} = useProductStore();
const productStore = useProductStore();
const {products} = storeToRefs(productStore);
const {getProducts} = productStore;

const saveKey = "favorite";
let saveItems = ref({});
let displayItems = ref({});

const pagination = ref({
  total_pages: 1,
  current_page: 1,
  has_pre: true,
  has_next: true,
});
const dataPerPage = 5;

const getSaveItems = () => {
  saveItems.value.data = LocalStorage.get(saveKey) || {};
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

const removeItem = (id) => {
  let nowItems = LocalStorage.get(saveKey) || [];
  const saveItems = Object.values(nowItems).filter(value => value.id !== id);

  LocalStorage.set(saveKey, saveItems)
  getSaveItems();
};

watch(() => products, (val) => {

  if (saveItems.value) {
    for (const [key, item] of Object.entries(saveItems.value.data)) {
      saveItems.value.data[key].on_stock = false;
      val.value.forEach(element => {

        if (item.id === element.id) {
          saveItems.value.data[key].origin_price = element.origin_price;
          saveItems.value.data[key].price = element.price;
          saveItems.value.data[key].on_stock = true;

        }
      });
    }

    filterItemsByPage();
  }
}, {deep: true});
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
</style>