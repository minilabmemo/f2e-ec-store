<template>
  <LoadingOverlay :active="isLoading" />
  <div class="pt-5">

    <div class="text-end">
      <button class="btn btn-primary " type="button" @click="openModal(true)"> 增加一個產品</button>
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
          <td class="d-flex ">
            <div style="flex:1"> <img style="width: 100px;" :src="item.imageUrl" alt="imageUrl" class="flex-image">
            </div>
            <div style="flex:2"> {{ item.title }}</div>

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

<script>
import ProductModal from "@/components/admin/EditProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import {adminProductApi} from '@/utils/config/path'
import Pagination from '@/components/PaginationAct.vue';
import {catchErr} from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore';
import {mapActions} from 'pinia'
export default {
  components: {ProductModal, DelModal, Pagination, },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,

    }
  },

  methods: {
    ...mapActions(statusStore, ['pushMessage']),
    getProducts(page = 1) {
      const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`
      this.isLoading = true;
      this.$http.get(url).then((response) => {

        this.isLoading = false;
        if (response.data.success) {

          this.products = response.data.products;
          this.pagination = response.data.pagination;
        }

      }).catch((err) => {
        catchErr(err)

      });
    },
    openModal(isNew, item) {

      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = {...item};
      }
      this.isNew = isNew;
      const productModal = this.$refs.productModal;
      productModal.showModal();
    },
    openDelModal(item) {

      this.tempProduct = {...item};
      const delModal = this.$refs.delModal;
      delModal.showModal();
    },
    updateProduct(item) {

      this.tempProduct = item;
      let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, {data: this.tempProduct}).then((response) => {

        productComponent.hideModal();

        this.pushMessage({title: '更新產品', response: response})
        this.getProducts();
      });

    },
    deleteProduct() {

      let api = `${adminProductApi}/${this.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        this.pushMessage({title: '刪除產品', response: response})
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });

    }

  },
  created() {
    this.getProducts();
  },
}

</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}
</style>@/utils/config/path