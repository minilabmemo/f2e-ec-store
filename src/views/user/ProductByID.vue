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
    <div class="row  justify-content-center  align-items-start">
      <div class="col-12 col-sm-4  d-flex justify-content-center  align-items-center">
        <div style="max-width:300px"> <img :src="product.imageUrl" alt="" class="flex-image mb-3"></div>

      </div>
      <div class="col-11 col-sm-6  d-flex justify-content-center  align-items-center">
        <article class="row  justify-content-center  align-items-baseline py-3 ">
          <h3 class="col-12">{{ product.title }}</h3>

          <div class="col-12 ">
            <div class="row justify-content-center  align-items-baseline   ">
              <div class="col-7">
                <span class="price " v-if="!product.origin_price"> 價格 ${{ product.origin_price }}</span>
                <span class="text-300" v-if="product.origin_price"> <del>原價 ${{ product.origin_price }}</del></span>
                <span class="price  " v-if="product.price"> 優惠價 ${{ product.price }}</span>
              </div>
              <div class="col-5">
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

                <input type="number" class=" form-control form-control-sm" id="number" placeholder="1" v-model="itemQty"
                  min="1" :max="product.num" @change="checkMax(product, itemQty)">


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
                  @click="addToCart(product.id, itemQty, false)" :class="{ disabled: isCartLoading }">
                  加到購物車
                </button></div>
              <div class="col-4  ">
                <SaveButton class="h-100 w-100 " :item="{
    title: product.title, id: product.id, imageUrl: product.imageUrl, on_stock: true
  }" v-if="product.id">
                </SaveButton>
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
  </div>
  <AddCartConfirm :item="{ title: product.title, qty: itemQty }" ref="AddCartConfirm"
    @add-item="addToCart(product.id, itemQty, true)" @go-carts="goToCart"></AddCartConfirm>
</template>

<script>
import {userProductApi, userCartApi} from '@/utils/const/path'
import categories from '@/utils/const/categories'
import AddCartConfirm from '@/components/user/modal/AddCartConfirm.vue';
import SaveButton from '@/components/user/SaveButton.vue'
export default {
  inject: ['httpMessageState', 'dataCart', 'emitter'],
  components: {AddCartConfirm, SaveButton},
  data() {
    return {
      product: {},
      id: '',
      categories: categories,
      itemQty: 1,
      isCartLoading: false,
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

    goToCart() {
      this.$router.push('/user/cartflow');
    },
    checkQty(id, qty = 1) {
      let confirmAddCart = false;
      if (this.dataCart.carts) {
        this.dataCart.carts.forEach(element => {
          if (element.product_id === this.id) {
            confirmAddCart = true;
          }
        });

      }
      if (confirmAddCart) {
        const confirmModal = this.$refs.AddCartConfirm;
        confirmModal.showModal();
      } else {
        this.addToCart(id, qty, true);
      }
    },
    updateUserCartQty() {
      this.emitter.emit('update-cartQty'); //觸發首頁購物車數量更新
    },
    checkMax(item, itemQty) {
      if (itemQty > item.num) {
        alert(`你輸入的數量大於可購買數量${item.num},自動更新為最大可購買數量。`)
        this.itemQty = item.num;
      }
    },
    addToCart(id, qty = 1, redirect = false) {

      const url = `${userCartApi}`;
      const cart = {
        product_id: id,
        qty,
      };

      this.isLoading = true;
      this.isCartLoading = true;
      this.$http.post(url, {data: cart}).then((response) => {
        this.isLoading = false;
        this.isCartLoading = false;
        this.httpMessageState(response, '加入購物車');
        if (redirect) {
          this.goToCart();
        }
        this.updateUserCartQty();


      });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();

  },

};
</script>


<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>