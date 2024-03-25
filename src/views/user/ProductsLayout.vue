<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>
  <div class="row products-layout py-5">
    <div class="col-3">
      <CATNav :products="products"></CATNav>
    </div>
    <div class="col-9">
      <router-view></router-view>
    </div>

  </div>


</template>


<script>
import getAllProducts from '@/utils/mixins/getProductsAll';
import categories from '@/utils/const/categories'
import CATNav from '@/components/user/CATNav.vue'

export default {
  components: {CATNav},
  data() {
    return {
      categories: categories,
      products: [],
      status: {
        isLoading: false,
        error: ""
      },
      filterErr: "",
    }
  },
  mixins: [getAllProducts],
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
          console.log("all", itemByCAT)
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

      //  console.log("itemByCAT", itemByCAT)
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
</script>


<style lang="css" scoped>
.products-layout {
  mix-height: 50vh;
  overflow-y: auto;
}
</style>