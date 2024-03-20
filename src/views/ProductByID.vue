<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="">
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
    <div class="row">
      <div class="col-4">
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </div>
      <div class="col-8">
        <article class="row g-2 d-flex gap-2 justify-content-center  align-items-baseline py-3 ">
          <h3 class="col-12">{{ product.title }}</h3>

          <div class="col-10">
            <div class="d-flex gap-2 justify-content-center  align-items-baseline   ">
              <div class="col-6">
                <span class="price " v-if="!product.origin_price"> 價格 ${{ product.origin_price }}</span>
                <span class="text-300" v-if="product.origin_price"> <del>原價 ${{ product.origin_price }}</del></span>
                <span class="price  " v-if="product.price"> 優惠價 ${{ product.price }}</span>
              </div>
              <div class="col-6">
                <span class=" text-500 " v-if="product.num"> 商品數量 {{ product.num }} 件</span>
              </div>
            </div>
            <hr>
            <div class="row fw-bold ">
              <div class="col-4">尺寸</div>
              <div class="col-4">顏色</div>
              <div class="col-4">數量</div>
            </div>
            <div class="row mb-3">
              <div class="col-4">Free</div>
              <div class="col-4">單一顏色</div>
              <div class="col-4">
                <div class="mb-3 col-4 ">
                  <input type="number" class="form-control form-control-sm" id="number" placeholder="1"
                    v-model="itemQty" min="1" :max="product.num">
                </div>

              </div>
            </div>
            <div class="row gap-3 ">
              <button type="button" class="col-3 btn btn-outline-danger" @click="addOrGoToCart(product.id, itemQty)">
                立即結帳
              </button>
              <button type="button" class="col-3 btn btn-outline-danger" @click="addToCart(product.id, itemQty)">
                加到購物車
              </button>
              <button type="button" class="col-3 btn btn-outline-dark " @click="addToCart(product.id, itemQty)">
                加入收藏
              </button>
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
      <div v-for="item in product.imagesUrl" :key="item">
        <img :src="item" alt="" class="img-fluid  col-6">
      </div>
      <div v-if="product.content">
        <div v-html="product.content.replace(/\n/g, '<br>')"></div>
      </div>


      <img :src="product.imageUrl" alt="" class="img-fluid  col-6">
    </div>
  </div>
  <AddCartConfirm :item="tempOrder" ref="AddCartConfirm" @del-item="delOrder"></AddCartConfirm>
</template>

<script>
import {userProductApi, userCartApi} from '@/utils/const/path'
import categories from '@/utils/const/categories'
import AddCartConfirm from '@/components/Front/modal/AddCartConfirm.vue';
export default {
  inject: ['httpMessageState', 'dataCart'],
  components: {AddCartConfirm},
  data() {
    return {
      product: {},
      id: '',
      categories: categories,
      itemQty: 1,
      recordCart: {}
    };
  },
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
  },

  methods: {
    getProduct() {
      const api = `${userProductApi}/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {

        this.isLoading = false;
        if (response.data.success) {
          this.product = response.data.product;
        }
      });
    },


    addOrGoToCart(id, qty = 1) {
      let confirmAddCart = false;
      if (this.dataCart.carts) {
        this.dataCart.carts.forEach(element => {
          if (element.product_id === this.id) {

            confirmAddCart = true;
          }
        });

      }
      if (confirmAddCart) {
        console.error('已有相同物品。');
      }
    },

    addToCart(id, qty = 1) {
      const url = `${userCartApi}`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(url, {data: cart}).then((response) => {
        this.isLoading = false;
        this.httpMessageState(response, '加入購物車');
        this.$router.push('/user/cart');
      });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();

  },

};
</script>