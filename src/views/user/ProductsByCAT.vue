<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>

  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
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

    <SaleItem v-for="(item, index) in filterItems" :key="index" :item="item" class="col"
      :path="`${$route.params.category}/${$route.params.subcategory}`">
    </SaleItem>
    <div class="col-6 " v-if="!filterItems.length && !status.isLoading">
      <img src="@/assets/images/design/empty200.png" alt="empty200" class="img-fluid ">
    </div>

  </div>








</template>


<script>
import getAllProducts from '@/utils/mixins/getProductsAll';
import categories from '@/utils/const/categories'
import SaleItem from '@/components/user/SaleItem.vue';
export default {
  components: {SaleItem},
  data() {
    return {
      categories: categories,
      products: [],

      filterErr: "",
    }
  },
  mixins: [getAllProducts],//TODO layout & cat get twice?? 
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


      if (itemByCAT.length !== 0) {
        return itemByCAT.map(item => ({
          title: item.title,
          src: item.imageUrl,
          ...item

        }));
      }
      return itemByCAT
    }

  },
  watch: {
    sub_category_name() {
      this.getAllData()
    }
  },
}
</script>@/utils/mixins/getProductsAll