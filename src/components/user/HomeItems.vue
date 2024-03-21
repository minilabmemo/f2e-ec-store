<template>
  <section class="d-flex flex-column align-items-center ">
    <h1 class=" ">{{ section }}</h1>
    <div class="row">
      <DataItem v-for="(item, index) in showItems" :key="index" :item="item" class="col-4" :filter-err="filterErr">
      </DataItem>
    </div>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-black q-btn">Explore More <img src="@/assets/icons/next_arrow.svg" alt="Next Arrow">
      </button>
    </div>
  </section>

</template>


<script>
import DataItem from '@/components/user/DataItem.vue';
import coming1 from '@/assets/images/design/coming1.png';
import coming2 from '@/assets/images/design/coming2.png';
import coming3 from '@/assets/images/design/coming3.png';
import categories from '@/utils/const/categories'
export default {
  components: {DataItem},
  props: {
    section: String,
    CAT: String,
    products: Array,
  },
  data() {
    return {
      filterErr: "",
      showItems: {
        1: {
          title: `${this.CAT === categories.new.name ? "韓國熱銷 ONLINE - 新品 12/25" : ""}`, src: coming1, color: "orange",
        },
        2: {
          title: `${this.CAT === categories.new.name ? "秋冬時裝 - 最新流行色" : ""}`, src: coming2, color: "secondary",
        },
        3: {title: `${this.CAT === categories.new.name ? "針織罩衫系列 - 簡約氣質" : ""}`, src: coming3, color: "gray", },
      }
    }
  },
  watch: {
    products(n, o) {
      let previewItem = [];
      let newProducts = this.products.filter((item) => item.category === this.CAT)
      if (newProducts.length >= 3) {
        previewItem = newProducts.slice(0, 3);
      }
      console.log("products", previewItem)
      if (previewItem.length !== 0) {
        this.showItems = previewItem.map(item => ({
          title: item.title,
          src: item.imageUrl,

        }));
      } else {
        this.filterErr = "無此商品分類"
      }
    }
  }



}
</script>