<template>
  <div>
    <ul class="nav flex-column mt-2 mb-5 ">
      <li class="nav-item  lh-1   " v-for="(cat, key, index) in categories" :key="key">
        <div class="d-flex align-items-center">
          <img src="@/assets/icons/nav.svg" alt="nav"
            v-if="`${$route.params.category}/${$route.params.subcategory}` === `${key}/all`" width="12px" height="12px">
          <router-link class="nav-link text-800 fw-bold px-2 " aria-current="page" href="#" :to="`/product/${key}/all`">
            {{ cat.name }} {{ key }} <span v-if="catNumMap[key] && catNumMap[key].num">({{ catNumMap[key].num }})</span>
          </router-link>
        </div>


        <ul class="nav flex-column px-4 " v-for="(item, subKey) in cat.sub_category" :key="subKey">
          <li class="d-flex align-items-center  ">
            <img src="@/assets/icons/nav.svg" alt="nav"
              v-if="`${$route.params.category}/${$route.params.subcategory}` === `${key}/${subKey}`" width="12px"
              height="12px">
            <router-link class="nav-link text-800  " :to="`/product/${key}/${subKey}`">
              {{ item.name }} {{ subKey }}
              <!-- <span v-if="products">({{ catNumMap[key].num }})</span> -->

            </router-link>
          </li>
        </ul>

        <hr class="my-2 w-75" v-if="index !== Object.keys(categories).length - 1">
      </li>

    </ul>
  </div>
</template>


<script>
import categories from '@/utils/const/categories'
export default {
  props: {
    products: Array
  },
  data() {
    return {
      categories: categories,
      catNumMap: {}
    }
  },
  methods: {
    sumProductsCAT(products) {
      this.catNumMap = {};
      let obj = JSON.parse(JSON.stringify(categories))
      obj.all.num = products ? this.products.length : 0;

      if (products) {
        products.forEach(item => {
          //itemByCAT = this.products.filter((item) => !item.category.toString().includes('test'));
          let cats = item.category.toString().split(',')

          cats.forEach(cat => {
            // console.log("cat", cat)
            if (!cat.includes('/')) {
              if (obj[cat]) {
                // console.log("cat", cat, "obj[cat].num", obj[cat].num)
                obj[cat].num = (obj[cat].num ? obj[cat].num : 0) + 1
              }

            }

          })

        });
      }

      // console.log("hot obj", obj.hot)
      // console.log(typeof obj, obj)
      this.catNumMap = obj;
    }
  },
  watch: {
    products: {
      handler(newVal, oldVal) {
        this.sumProductsCAT(newVal);
      },
      immediate: true // 立即執行一次
    }
  },
  // created() {
  //   console.log(Date(), "created")
  //   // this.sumProductsCAT();
  // },
  // updated() {
  //   console.log(Date(), "update")
  //   this.sumProductsCAT();
  // },

  //NOTE 我改了三種寫法，this.products 一開始是空的，過一陣子才會有值
  // 1. computed 是基於 products 會造成無限迴圈
  // 2.改用 update 時才去呼叫，雖然就正常，但是 update 情況很多，切換路由也會呼叫 update 多次呼叫
  // 3. 改用 watch products 就正常了。（只在 products 更新時執行相應的邏輯）
  // computed: {
  //   catNumMap() {
  //     let obj = this.categories
  //     obj.all.num = this.products ? this.products.length : 0;

  //     if (this.products) {
  //       this.products.forEach(item => {
  //         //itemByCAT = this.products.filter((item) => !item.category.toString().includes('test'));
  //         let cats = item.category.toString().split(',')

  //         cats.forEach(cat => {
  //           // console.log("cat", cat)
  //           if (!cat.includes('/')) {
  //             if (obj[cat]) {
  //               // console.log("cat", cat, "obj[cat].num", obj[cat].num)
  //               obj[cat].num = (obj[cat].num ? obj[cat].num : 0) + 1
  //             }

  //           }

  //         })

  //       });
  //     }

  //     console.log("hot obj", obj.hot)
  //     // console.log(typeof obj, obj)
  //     return obj
  //   }


  // }
}


</script>