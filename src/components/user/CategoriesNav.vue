<template>

  <ul class="navbar-nav flex-column mt-2 mb-5 ">
    <li class="nav-item  lh-1   " v-for="(cat, key, index) in categories" :key="key">
      <div class="d-flex align-items-center">
        <img src="@/assets/icons/nav.svg" alt="nav"
          v-if="`${$route.params.category}/${$route.params.subcategory}` === `${key}/all`" width="12px" height="12px">
        <router-link class="nav-link  fw-bold px-2 "
          :class="{ 'text-300': !countByCAT(key), 'text-800': countByCAT(key) }" aria-current="page" href="#"
          :to="`/product/${key}/all`">

          {{ cat.name }} {{ key }} <span>({{ countByCAT(key) }})</span>
        </router-link>
      </div>


      <ul class="navbar-nav flex-column px-4 " v-for="(item, subKey) in cat.sub_category" :key="subKey">
        <li class="d-flex align-items-center  ">
          <img src="@/assets/icons/nav.svg" alt="nav"
            v-if="`${$route.params.category}/${$route.params.subcategory}` === `${key}/${subKey}`" width="12px"
            height="12px">
          <router-link class="nav-link   " :to="`/product/${key}/${subKey}`"
            :class="{ 'text-300': !countByCAT(key, subKey), 'text-800': countByCAT(key, subKey) }">
            {{ item.name }} {{ subKey }}
            <span>
              ({{ countByCAT(key, subKey) }})
            </span>



          </router-link>
        </li>

      </ul>

      <hr class="my-2 w-75" v-if="index !== Object.keys(categories).length - 1">
    </li>
    <li class="nav-item">
      <router-link to="/style" class="nav-link">時尚穿搭 Styles Book</router-link>
    </li>
  </ul>

</template>

<script setup>
import {defineProps, ref, computed} from 'vue';
import categoriesConfig from '@/utils/const/categories';
import {useProductStore} from '@/stores/productStore';
import {storeToRefs} from 'pinia'
const productStore = useProductStore();
const {getProducts, } = productStore;
const {products} = storeToRefs(productStore);
getProducts();


defineProps({
  isCollapsed: Boolean
});

const categories = ref(categoriesConfig);
let catNumMap = computed(() => {

  let sum = sumProductsCAT(products.value);
  return sum
})


function countByCAT(cat, subCat) {
  if (!catNumMap.value) {
    return 0
  }
  let myMap = catNumMap.value
  if (cat && subCat) {
    if (myMap[cat]?.sub_category[subCat]?.num) {
      return myMap[cat].sub_category[subCat].num;
    } else {
      return 0;
    }
  }
  if (cat) {

    if (myMap[cat]?.num) {

      return myMap[cat].num;
    }
  }
  return 0;
}


function sumProductsCAT(products) {

  if (!products) {

    return;
  }

  let catNumMap = {};

  let obj = JSON.parse(JSON.stringify(categories.value));

  let realProducts = products.filter(item => !item.category.toString().includes('test'));
  obj.all.num = realProducts.length;

  if (products) {

    products.forEach(item => {

      let cats = item.category.toString().split(',').flatMap(subStr => subStr.split('|'));
      cats.forEach(cat => {
        if (!cat.includes('/')) {

          if (obj[cat]) {
            obj[cat].num = (obj[cat].num ? obj[cat].num : 0) + 1;
          }
        } else {

          let catArr = cat.split('/');
          if (catArr.length === 2) {
            let cat = catArr[0];
            if (obj[cat]) {
              obj[cat].num = (obj[cat].num ? obj[cat].num : 0) + 1;
            }
            let subCat = catArr[1];
            if (obj[cat] && obj[cat].sub_category && obj[cat].sub_category[subCat]) {
              obj[cat].sub_category[subCat].num = (obj[cat].sub_category[subCat].num ? obj[cat].sub_category[subCat].num : 0) + 1;
            }
          }
        }
      });
    });
  }
  catNumMap = obj;
  return catNumMap

}



</script>
