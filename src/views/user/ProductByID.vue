<template>
  <LoadingOverlay :active="status.isLoading" />
  <div v-if="!status.isLoading && !product" class="text-primary "> 該商品已下架。</div>
  <div class="" v-if="!status.isLoading">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="`/product/${$route.params.category}/all`"> {{ category_name
            }}</router-link>
        </li>
        <li v-if="sub_category_name" class="breadcrumb-item ">
          <router-link :to="`/product/${$route.params.category}/${$route.params.subcategory}`"> {{ sub_category_name
            }}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row  justify-content-center  align-items-start">
      <div class="col-12 col-sm-4  d-flex justify-content-center  align-items-center">
        <div style="max-width:300px"> <img :src="product.imageUrl" alt="" class="flex-image mb-3"></div>

      </div>
      <div class="col-11 col-sm-6  d-flex justify-content-center  align-items-center">
        <article class="row  justify-content-center  align-items-baseline py-3 ">
          <h3 class="col-12">{{ product.title }}</h3>

          <div class="col-12 ">
            <div class="row justify-content-center  align-items-baseline   ">
              <div class="col-8">
                <span class="price " v-if="!product.origin_price"> 價格 ${{ $filters.currency(product.origin_price)
                  }}</span>
                <span class="price" v-show="product.price === product.origin_price"> 特惠價 ${{
    $filters.currency(product.origin_price) }}</span>
                <span class="text-300" v-show="product.price !== product.origin_price"> <del>原價 ${{
    $filters.currency(product.origin_price) }}</del></span>
                <span class="price  " v-show="product.price !== product.origin_price"> 優惠價 ${{
    $filters.currency(product.price) }}</span>
              </div>
              <div class="col-4">
                <span class=" text-500 " v-if="product.num"> 商品數量 {{ product.num }} 件</span>
              </div>
            </div>
            <hr>
            <div class="row fw-bold justify-content-center ">
              <div class="col-4">尺寸</div>
              <div class="col-4">顏色</div>
              <div class="col-4">數量</div>
            </div>
            <div class="row mb-3 justify-content-center ">
              <div class="col-4">Free</div>
              <div class="col-4">單一色</div>
              <div class="col-4">
                <select id="qty" class="form-select" v-model="itemQty">
                  <option :value="item" v-for="item in product.num" :key="item">{{ item }}</option>
                </select>

              </div>
            </div>
            <div class="row  justify-content-center align-items-stretch ">
              <div class="col-4   ">
                <button type="button" class="h-100 w-100 btn btn-outline-danger  "
                  @click="checkQty(product.id, itemQty)">
                  立即結帳
                </button>
              </div>
              <div class="col-4  "> <button type="button" class="h-100 w-100  btn btn-outline-danger "
                  @click="addCartCheck(product.id, itemQty, false)" :class="{ disabled: status.isCartLoading }">
                  加到購物車
                </button></div>
              <div class="col-4  ">
                <SaveButton class="h-100 w-100 " :item="saveButtonItem" />
              </div>

            </div>

          </div>
        </article>
      </div>


    </div>

    <div class="row d-flex g-3 justify-content-center my-3 text-center">
      <hr>
      <h2 class=" fw-bold ">Product Detail</h2>
      <div v-if="product.description">
        <div v-html="product.description.replace(/\n/g, '<br>')"></div>
      </div>
      <div v-for="  item   in   product.imagesUrl  " :key="item">
        <img :src="item" alt="" class="img-fluid  col-6">
      </div>
      <div v-if="product.content">
        <div v-html="product.content.replace(/\n/g, '<br>')"></div>
      </div>


      <img :src="product.imageUrl" alt="" class="img-fluid  col-6">


    </div>


    <div class="row flex-column  justify-content-center  align-items-center">
      <div class="my-5 col-9">
        <img src="@/assets/images/design/shopping_note.png" alt="split" class="img-fluid  ">
      </div>

      <div v-if="product && product.category && product.category.includes('dress')" class="my-5 col-6">
        <img src="@/assets/images/design/size_dress.png" alt="split" class="img-fluid ">
      </div>
      <div v-if="product && product.category
    && (product.category.includes('upper') || product.category.includes('coat'))" class="my-5 col-6">
        <img src="@/assets/images/design/size_upper.png" alt="split" class="img-fluid  ">
      </div>
      <div v-if="product && product.category && product.category.includes('pants')" class="my-5 col-6">
        <img src="@/assets/images/design/size_pants.png" alt="split" class="img-fluid  ">
      </div>
      <div v-if="product && product.category && product.category.includes('skirt')" class="my-5 col-6">
        <img src="@/assets/images/design/size_skirt.png" alt="split" class="img-fluid  ">
      </div>
    </div>


    <div class="row py-5" v-if="recommendItems.length > 0">

      <div class="col-12">
        <h4>您可能也喜歡</h4>
        <div class="row overflow-x-auto  flex-nowrap align-items-stretch  ">
          <SaleItem v-for="(item, index) in recommendItems" :key="index" :item="item" class="col-5 col-xs-4 col-md-3 "
            data-cy="item" :path="`${$route.params.category}/${$route.params.subcategory}`" />
        </div>

      </div>

    </div>


  </div>
  <AddCartConfirm v-if="product" :item="{ title: product.title, qty: itemQty }" ref="AddCartConfirm"
    @add-item="addCartCheck(product.id, itemQty, true)" @go-carts="goToCart" />

  <button @click="scrollToTop" class="btn bg-primary   rounded-circle  "
    :class="{ 'scroll-to-top-button': true, 'show': showScrollToTopButton }">
    <i class="bi bi-arrow-bar-up text-white "></i>

  </button>
</template>

<script>

import categories from '@/utils/const/categories'
import AddCartConfirm from '@/components/user/modal/AddCartConfirm.vue';
import SaveButton from '@/components/user/SaveButton.vue'
import {useCartStore} from '@/stores/cartStore';
import {useProductStore} from '@/stores/productStore';
import {mapState, mapActions} from 'pinia'
import SaleItem from '@/components/user/SaleItem.vue';
export default {

  components: {AddCartConfirm, SaveButton, SaleItem},

  data() {
    return {

      id: '',
      categories: categories,
      itemQty: 1,
      saveButtonItem: {},
      showScrollToTopButton: false,
    };
  },
  computed: {
    ...mapState(useCartStore, ['cart', 'status']),
    ...mapState(useProductStore, ['product', 'products', 'status', 'productsByCAT']),
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
    recommendItems() {
      let items = [];
      let removeID = this.id;
      if (this.productsByCAT) {
        items = this.productsByCAT.filter((item) => item.id != removeID)
      }
      if (items.length === 0) {
        items = this.products.slice(0, 3)
      }


      return items
    },
  },
  watch: {
    product: {
      handler: function (val) {
        this.saveButtonItem = {
          title: val.title,
          id: val.id,
          imageUrl: val.imageUrl,
          on_stock: true
        };
      }

    },
    products: {
      handler: function () {
        this.filterByCategory(this.$route.params.category)
      }
    },
    $route(to, from) {
      if (to.path !== from.path) {
        this.id = this.$route.params.productId;
        this.getProductByID(this.id);
        this.getProducts()
      }
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addCartByItem']),

    ...mapActions(useProductStore, ['getProductByID', 'getProducts', 'filterByCategory']),


    goToCart() {
      this.$router.push('/user/cartflow');
    },

    checkQty(id, qty = 1) {
      let confirmAddCart = false;
      if (this.cart.carts) {
        this.cart.carts.forEach(element => {
          if (element.product_id === this.id) {
            confirmAddCart = true;
          }
        });

      }
      if (confirmAddCart) {
        const confirmModal = this.$refs.AddCartConfirm;
        confirmModal.showModal();
      } else {
        this.addCartCheck(id, qty, true);
      }
    },


    addCartCheck(id, qty = 1, redirect = false) {
      let isMaxNum = false;
      let cartValue = this.cart;


      cartValue.carts.forEach(element => {
        if (element.product_id === this.id) {
          if (element.qty >= element.product.num) {
            alert(`無法加入購物車，購物車數量${element.qty}已達最大可購買量 ${element.product.num}件商品。`)
            isMaxNum = true
            return
          }

          if (qty + element.qty > element.product.num) {
            alert(`無法加入購物車，購物車數量已有${element.qty}件，只可再購買 ${element.product.num - element.qty}件商品。`)
            isMaxNum = true
          }
        }
      });
      if (isMaxNum) {
        return
      }


      const cart = {
        product_id: id,
        qty,
      };

      this.addCartByItem(cart);
      if (redirect) {
        this.goToCart();
      }
    },
    handleScroll() {
      this.showScrollToTopButton = window.pageYOffset > window.innerHeight / 2;
    },
    scrollToTop() {
      window.scrollTo({top: 0, behavior: "smooth"});
    },

  },
  created() {
    this.id = this.$route.params.productId;
    this.getProductByID(this.id);
    this.getProducts()
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

};
</script>


<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}

.scroll-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.3s ease-in-out;
  border: none;

}


.scroll-to-top-button.show {
  opacity: 1;
  transform: translateY(0px);
}
</style>