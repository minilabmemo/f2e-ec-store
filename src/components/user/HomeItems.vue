<template>
  <section class="d-flex flex-column align-items-center ">
    <h1 class="mb-3 mb-md-4  ">{{ section }}</h1>

    <div class="row">

      <DataItem v-for="(item, index) in showItems" :key="index" :item="item" class="col-4" :filter-err="filterErr" />
    </div>

    <div class="d-flex justify-content-center gap-3 mt-3">
      <button class="btn btn-black explore-btn" type="button">
        <router-link :to="`/product/${CAT}/all`" class="nav-link">
          Explore More <img src="@/assets/icons/next_arrow.svg" alt="Next Arrow"></router-link>
      </button>
    </div>
  </section>

</template>


<script>
import DataItem from '@/components/user/DataItem.vue';
import coming1 from '@/assets/images/design/coming1.png';
import coming2 from '@/assets/images/design/coming2.png';
import coming3 from '@/assets/images/design/coming3.png';
import categories from '@/utils/config/categories'
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
          title: `${this.CAT === categories.new.key ? "韓國熱銷 ONLINE - 新品 12/25" : ""}`, src: coming1, color: "orange",
        },
        2: {
          title: `${this.CAT === categories.new.key ? "秋冬時裝 - 最新流行色" : ""}`, src: coming2, color: "secondary",
        },
        3: {title: `${this.CAT === categories.new.key ? "針織罩衫系列 - 簡約氣質" : ""}`, src: coming3, color: "gray", },
      }
    }
  },
  watch: {
    products(newProducts) {
      let previewItem = [];
      let filterProducts = newProducts.filter((item) => item.category.toString().includes(this.CAT))

      if (filterProducts.length >= 3) {
        previewItem = filterProducts.slice(0, 3);
      }

      if (previewItem.length !== 0) {
        this.showItems = previewItem.map(item => ({
          title: item.title,
          src: item.imageUrl,
          id: item.id,

        }));
      } else {
        this.filterErr = "無此商品分類"
      }
    }
  }



}
</script>@/utils/config/categories