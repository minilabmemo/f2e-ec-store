<template>
  <section class="d-flex flex-column align-items-center ">
    <h1 class="mb-3 mb-md-4  ">{{ section }}</h1>

    <div class="row">

      <HomeItem v-for="(item) in showItems" :key="item.id" :item="item" class="col-4" :filter-err="filterErr" />
    </div>

    <div class="d-flex justify-content-center gap-3 mt-3">
      <button class="btn btn-black explore-btn" type="button">
        <router-link :to="`/product/${CAT}/all`" class="nav-link">
          Explore More <img src="@/assets/img/icons/next_arrow.svg" alt="Next Arrow"></router-link>
      </button>
    </div>
  </section>

</template>

<script setup>
import HomeItem from '@/components/user/HomeItem.vue';
import coming1 from '@/assets/img/design/coming1.png';
import coming2 from '@/assets/img/design/coming2.png';
import coming3 from '@/assets/img/design/coming3.png';
import categories from '@/utils/config/categories'
import {ref, watchEffect} from 'vue'
const props = defineProps({
  section: String,
  CAT: String,
  products: Array,
});
const filterErr = ref("");
const showItems = ref({
  1: {
    title: `${props.CAT === categories.new.key ? "韓國熱銷 ONLINE - 新品 " : ""}`, src: coming1, color: "orange",
  },
  2: {
    title: `${props.CAT === categories.new.key ? "秋冬時裝 - 最新流行色" : ""}`, src: coming2, color: "secondary",
  },
  3: {title: `${props.CAT === categories.new.key ? "針織罩衫系列 - 簡約氣質" : ""}`, src: coming3, color: "gray", },
});

watchEffect(() => {
  let previewItem = [];
  let filterProducts = props.products ? props.products.filter((item) => item.category.toString().includes(props.CAT)) : [];

  if (filterProducts.length >= 3) {
    previewItem = filterProducts.slice(0, 3);
  }

  if (previewItem.length !== 0) {
    showItems.value = previewItem.map(item => ({
      title: item.title,
      src: item.imageUrl,
      id: item.id,

    }));
  } else {
    filterErr.value = "無此商品分類"
  }
});

</script>