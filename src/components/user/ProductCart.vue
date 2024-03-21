<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container">
    <div class="row mt-4">

      <!-- 購物車列表 -->
      <div class="col-md-12 px-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm"
                      :disabled="status.loadingItem === item.id" @click="removeCartItem(item.id)">
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <input type="number" class="form-control" min="1" :disabled="item.id === status.loadingItem"
                        @change="updateCart(item)" v-model.number="item.qty">
                      <div class="input-group-text">/ {{ item.product.unit }}</div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {userProductsApi, userCartApi, userCouponApi, userOrderApi} from '@/utils/const/path'
export default {
  inject: ['httpMessageState'],
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const url = `${userProductsApi}`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.products = response.data.products;
        console.log('products:', response);
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addCart(id) {
      const url = `${userCartApi}`;
      this.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(url, {data: cart})
        .then((res) => {
          this.status.loadingItem = '';
          console.log(res);
          this.getCart();
        });
    },
    getCart() {
      const url = `${userCartApi}`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        console.log(response);
        this.cart = response.data.data;
        this.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${userCartApi}/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.put(url, {data: cart}).then((res) => {
        console.log(res);
        this.status.loadingItem = '';
        this.getCart();
      });
    },
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${userCartApi}/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.httpMessageState(response, '移除購物車品項');
        this.status.loadingItem = '';
        this.getCart();
        this.isLoading = false;
      });
    },
    addCouponCode() {
      const url = userCouponApi;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, {data: coupon}).then((response) => {
        this.httpMessageState(response, '加入優惠券');
        this.getCart();
        this.isLoading = false;
      });
    },
    createOrder() {
      const url = userOrderApi;
      const order = this.form;
      this.$http.post(url, {data: order})
        .then((res) => {
          console.log(res);
        });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },

};
</script>