<template>
  <LoadingOverlay :active="status.isLoading"></LoadingOverlay>
  <div class="text-primary " v-if="!filterItems.length && !status.isLoading">
    <div> 你搜尋的關鍵字找不到對應商品，請試試其他關鍵字（Ex:上衣）。</div>
  </div>
  <div class="row row-cols-2 row-cols-lg-3 ">

    <SaleItem v-for="(item, index) in filterItems" :key="index" :item="item" class="col"
      :path="`${$route.params.category}/${$route.params.subcategory}`">
    </SaleItem>


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
    filterItems() {

      let itemByCAT = []
      itemByCAT = this.products.filter((item) => !item.category.toString().includes('test'));
      itemByCAT = this.products.filter((item) => item.title.toString().includes(this.$route.params.keyword));



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

}
</script>