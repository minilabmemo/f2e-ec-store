<template>
  <LoadingOverlay :active="status.isLoading" />
  <div class="pt-5">
    <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal(true)">增加一個產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">數量</th>
          <th width="120">原價</th>
          <th width="120">*售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td class="d-flex">
            <div style="flex: 1"><img style="width: 6.25rem" :src="item.imageUrl" alt="clothes" class="flex-image">
            </div>
            <div style="flex: 2">{{ item.title }}</div>
          </td>
          <td class="text-right">
            {{ $filters.currency(item.num) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @change-page-num="getProducts" />
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DelModal ref="delModal" :item="tempProduct" @del-item="deleteProduct" />
</template>

<script setup lang="ts">
import ProductModal from '@/components/admin/EditProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import { adminProductApi, adminProductsApi } from '@/utils/config/path';
import Pagination from '@/components/PaginationAct.vue';
import { ref, type Ref } from 'vue';
import fetchAct from '@/utils/methods/fetchAct';
import statusStore from '@/stores/statusStore';
import type { Product, PaginationT } from '@/utils/type';

const status = statusStore();

const delModal = ref<InstanceType<typeof DelModal> | null>(null);

const productModal = ref<InstanceType<typeof ProductModal> | null>(null);

const products: Ref<Product[]> = ref([]);
const pagination = ref({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false
});

let defaultValue = {
  id: '',
  imageUrl: '',
  imagesUrl: [],
  title: '',
  unit: '',
  price: 0,
  origin_price: 0,
  num: 0,
  category: '',
  subcategory: '',
  is_enabled: 0,
  content: '',
  description: '',
};
const tempProduct: Ref<Product> = ref(defaultValue);
const isNewRef = ref(false);
const currentPageRef = ref(1);
interface getProductsResponse {
  success: boolean;
  products: Product[];
  pagination: PaginationT;
  message?: string;
}
function getProducts(currentPage = 1) {
  currentPageRef.value = currentPage;
  const url = `${adminProductsApi}?page=${currentPage}`;
  fetchAct.get<getProductsResponse>(url).then((response) => {
    if (response.success) {
      products.value = response.products;
      pagination.value = response.pagination;
    }
  });
}
function openModal(isNew: boolean, item?: Product) {
  if (isNew) {
    tempProduct.value = defaultValue;
  } else if (item) {
    tempProduct.value = { ...item };
  }
  isNewRef.value = isNew;
  const productModalVal = productModal.value;
  if (productModalVal) {
    productModalVal.showModal();
  }
}
function openDelModal(item: Product) {
  tempProduct.value = { ...item };
  const delModalVal = delModal.value;
  if (delModalVal) {
    delModalVal.showModal();
  }
}
function updateProduct(item: Product) {
  tempProduct.value = item;
  let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`;
  let httpMethod = 'post';
  if (!isNewRef.value) {
    api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`;
    httpMethod = 'put';
  }
  const productComponent = productModal.value;
  fetchAct[httpMethod](api, { data: tempProduct.value }, { msgTitle: '更新產品' }).then(() => {
    if (productComponent) {
      productComponent.hideModal();
    }
    getProducts(currentPageRef.value);
  });
}
function deleteProduct() {
  let api = `${adminProductApi}/${tempProduct.value.id}`;
  fetchAct.delete(api, { msgTitle: '刪除產品' }).then(() => {
    const delComponent = delModal.value;
    if (delComponent) {
      delComponent.hideModal();
    }
    getProducts(currentPageRef.value);
  });
}

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
