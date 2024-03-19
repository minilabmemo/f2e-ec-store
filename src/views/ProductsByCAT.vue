<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>
  <div class="row" v-if="!status.isLoading">
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
      console.warn("filterItem filterItem", this.products)
      let itemByCAT = []
      console.log("his.$route.params.category", this.$route.params.category)
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
          itemByCAT = this.products.filter((item) => item.category.toString().includes(this.$route.params.subcategory));
          break;
      }
      // if (this.$route.params.subcategory) {
      //   itemByCAT = this.products.filter((item) => item.category.toString().includes(this.$route.params.subcategory));
      // }
      console.log("itemByCAT", itemByCAT)
      if (itemByCAT.length !== 0) {
        return itemByCAT.map(item => ({
          title: item.title,
          src: item.imageUrl,

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
  updated() {
    // console.warn("updated", this.$)
    // this.getAllData()
  },
  // methods: {
  //   filterItem(products) {
  //     console.log("watch products", products)
  //     let itemByCAT = []
  //     console.log("his.$route.params.category", this.$route.params.category)
  //     switch (this.$route.params.category) {
  //       case 'all':
  //         itemByCAT = products.filter((item) => !item.category.toString().includes('test'));
  //         console.log("all", itemByCAT)
  //         break;
  //       default:
  //         itemByCAT = products.filter((item) => item.category.toString().includes(this.$route.params.category));
  //         break;
  //     }
  //     if (this.$route.params.subcategory) {
  //       itemByCAT = this.products.filter((item) => item.category.toString().includes(this.$route.params.subcategory));
  //     }
  //     console.log("itemByCAT", itemByCAT)
  //     if (itemByCAT.length !== 0) {
  //       this.filterItems = itemByCAT.map(item => ({
  //         title: item.title,
  //         src: item.imageUrl,

  //       }));
  //     } else {
  //       this.filterItems = []
  //       this.filterErr = "無此商品分類"
  //     }

  //   }
  // },
  // created() {
  //   console.warn("created p")
  //   let newVal = this.products;
  //   this.filterItem(newVal);
  // },
  // watch: {
  //   products: {
  //     handler(newVal, oldVal) {
  //       this.filterItem(newVal);
  //     },
  //     immediate: true // 立即執行一次
  //   },
  //   sub_category_name:{
  //     handler(newVal, oldVal) {
  //       this.filterItem(newVal);
  //     },
  //   }
  // },
  // watch: {
  //   page_category() {
  //     this.filterItem();
  //   },
  //   page_category_sub() {
  //     this.filterItem();
  //   },
  // },


}
</script>