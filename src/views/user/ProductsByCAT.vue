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


    <div class="row row-cols-2 row-cols-lg-3 ">

      <SaleItem v-for="(item, index) in showItems" :key="index" :item="item" class="col"
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


<script>
import getAllProducts from '@/utils/mixins/getProductsAll';
import categories from '@/utils/const/categories'
import SaleItem from '@/components/user/SaleItem.vue';
import Pagination from '@/components/Pagination.vue';
export default {
  components: {SaleItem, Pagination},
  data() {
    return {
      categories: categories,
      products: [], // all items
      catItems: [],//filter by category
      showItems: [],//filter  page
      filterErr: "",
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: true,
        has_next: true,
      },
      dataPerPage: 12,
    }
  },
  mixins: [getAllProducts],
  methods: {
    filterItems() {

      let itemByCAT = []

      switch (this.$route.params.category) {
        case 'all':
          itemByCAT = this.products.filter((item) => !item.category.toString().includes('test'));

          break;
        default:
          itemByCAT = this.products.filter((item) => item.category.toString().includes(this.$route.params.category));
          break;
      }
      switch (this.$route.params.subcategory) {
        case 'all':
          break;
        default:
          itemByCAT = this.products.filter((item) => item.category.toString().includes(this.$route.params.category));
          itemByCAT = itemByCAT.filter((item) => item.category.toString().includes(this.$route.params.subcategory));
          break;
      }



      this.catItems = itemByCAT
      this.filterItemsByPage()
    },

    filterItemsByPage(currentPage = 1) {
      if (!this.catItems) {
        return
      }

      this.pagination.current_page = currentPage
      this.pagination.total_pages = Math.ceil(Object.keys(this.catItems).length / this.dataPerPage);

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
      this.showItems = this.catItems.slice(startIndex, endIndex);
    },
  },
  computed: {

    category_name() {
      return categories[this.$route.params.category] ? categories[this.$route.params.category].name : ''
    },
    sub_category_name() {
      if (
        categories[this.$route.params.category]?.sub_category &&
        categories[this.$route.params.category].sub_category[this.$route.params.subcategory]
      ) {
        return categories[this.$route.params.category].sub_category[this.$route.params.subcategory].name
      }
      return ""
    },


  },
  watch: {
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.getAllData()
      }
    },
    products() {
      this.filterItems()

    }
  },
}
</script>