<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>
  <div class="row">
    <div class="col-3">

      <CATNav :products="products"></CATNav>


    </div>
    <div class="col-9">
      <div class="bread my-2 d-flex ">
        <span>首頁</span>
        <img src="@/assets/icons/Forward.svg" alt="Forward">
        {{ category_name }}
        <div v-show="sub_category_name">
          <img src="@/assets/icons/Forward.svg" alt="Forward">
          {{ sub_category_name }}

        </div>

      </div>

      <div class="row">

        <SaleItem v-for="(item, index) in filterItems" :key="index" :item="item" class="col-4">
        </SaleItem>
        <div class="col-6 " v-if="!filterItems.length">
          <img src="@/assets/images/design/empty200.png" alt="empty200" class="img-fluid ">
        </div>

      </div>
    </div>



  </div>


</template>


<script>
import getAllProducts from '@/utils/mixins/getAllProducts';
import categories from '@/utils/const/categories'
import CATNav from '@/components/Front/CATNav.vue'
import SaleItem from '@/components/Front/SaleItem.vue';
export default {
  components: {CATNav, SaleItem},
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