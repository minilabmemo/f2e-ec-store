<template>

  <div class="fs-3 fw-bold " v-if="!this.saveItems || Object.keys(saveItems).length === 0"> 無收藏商品。</div>
  <table class="table mt-4" v-if="this.saveItems && saveItems.length !== 0">
    <thead>
      <tr class="d-flex ">
        <th style="flex:1">商品</th>
        <th style="flex:1">操作</th>
      </tr>
    </thead>
    <tbody>

      <template v-for="(item, key) in displayItems" :key="key">

        <tr class="d-flex ">
          <td style="flex:1">
            <div class="d-flex ">
              <div style="flex:1"> <img :src="item.imageUrl" alt="imageUrl" class="flex-image"></div>
              <div style="flex:1" class="col-11 d-flex  flex-column  align-items-start text-start ms-2">
                <div> {{ item.title }}</div>
                <div class="d-flex gap-2 justify-content-center  align-items-center ms-2">
                  <span class="text-300" v-if="item.origin_price"> <del>${{ item.origin_price }}</del></span>
                  <span class="text-primary  me-4 " v-if="item.price">${{ item.price }}</span>
                </div>
                <span class="text-secondary ms-2" v-if="!item.on_stock"> 此商品已下架。</span>


              </div>

            </div>
          </td>
          <td style="flex:1">
            <div class=" btn-group" role="group" aria-label="Basic example">
              <button type="button" class=" btn btn-outline-danger" :disabled="!item.on_stock">
                <router-link class="nav-link" :to="`/product/all/all/id/${item.id}`">前往商品頁</router-link>

              </button>
              <button type="button" class="btn btn-outline-danger" @click="removeItem(item.id)">
                移出收藏
              </button>
            </div>
          </td>

        </tr>
      </template>
    </tbody>
  </table>

  <Pagination :pages="pagination" @change-page-num="filterItemsByPage" v-if="this.saveItems && saveItems.length !== 0">
  </Pagination>
</template>

<script>

import Pagination from '@/components/Pagination.vue';
import getProductsAll from '@/utils/mixins/getProductsAll'

export default {
  mixins: [getProductsAll],
  watch: {
    products: {
      handler: function (val, oldVal) {

        if (this.saveItems) {
          for (const [key, item] of Object.entries(this.saveItems)) {
            this.saveItems[key].on_stock = false
            val.forEach(element => {
              if (item.id === element.id) {
                this.saveItems[key].origin_price = element.origin_price
                this.saveItems[key].price = element.price
                this.saveItems[key].on_stock = true

              }
            });
          }
          this.filterItemsByPage()
        }


      }

    },
  },

  data() {
    return {
      saveKey: "favorite",
      saveItems: {},
      displayItems: {},

      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: true,
        has_next: true,
      },
      dataPerPage: 5,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getSaveItems() {
      this.saveItems = JSON.parse(localStorage.getItem(this.saveKey))
      this.filterItemsByPage()
    },

    filterItemsByPage(currentPage = 1) {
      if (!this.saveItems) {
        return
      }

      this.pagination.current_page = currentPage
      this.pagination.total_pages = Math.ceil(Object.keys(this.saveItems).length / this.dataPerPage);
      this.pagination.has_pre = true;
      this.pagination.has_next = true;
      if (this.pagination.current_page === 1) {
        this.pagination.has_pre = false;
      }

      if (this.pagination.current_page === this.pagination.total_pages) {
        this.pagination.has_next = false;
      }
      const startIndex = (this.pagination.current_page - 1) * this.dataPerPage;
      const endIndex = startIndex + this.dataPerPage;
      this.displayItems = this.saveItems.slice(startIndex, endIndex);
    },
    removeItem(id) {
      let saveItems = [];
      let nowItems = JSON.parse(localStorage.getItem(this.saveKey))
      if (nowItems) {
        for (const value of Object.values(nowItems)) {

          if (value.id !== id) {
            saveItems = [...saveItems, value]
          }
        }
      }
      localStorage.setItem(this.saveKey, JSON.stringify(saveItems))
      this.getSaveItems()
    },
  },
  created() {
    this.getSaveItems();

  },



};
</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}
</style>