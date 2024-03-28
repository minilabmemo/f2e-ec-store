<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>

  <div class="row mt-4" v-if="cart && cart.carts && cart.carts.length !== 0">
    <div class="col-12 ">
      <table class="phone-table table align-middle d-table d-lg-none ">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>

                <div class="d-flex  gap-2 ">
                  <div style="flex: 1;width: 100px"> <img :src="item.product.imageUrl" alt="imageUrl"
                      class="flex-image"></div>
                  <div style="flex: 2;" class=" d-flex   flex-column  align-items-start text-start gap-2">
                    <div> <router-link :to="`/product/all/all/id/${item.product.id}`">{{ item.product.title
                        }}</router-link></div>
                    <div class="d-flex   flex-column  align-items-start text-start gap-2 ">
                      <div>
                        <span class=" text-300"> <del>${{ item.product.origin_price }}</del></span>
                        <span class=" text-primary  me-4 ">${{ item.product.price }}</span>
                        <span class=" text-500  ">剩餘數量： {{ item.product.num }}</span>
                      </div>

                      <div class="input-group input-group-sm ">
                        <input type="number" class="form-control" min=1 :max="item.product.num"
                          :disabled="item.id === status.loadingItem" @change="updateCart(item)"
                          v-model.number="item.qty">
                        <div class="input-group-text">/ {{ item.product.unit }}</div>


                      </div>
                      <div>
                        <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                        ${{ $filters.currency(item.final_total) }}
                      </div>
                    </div>

                    <div class="text-success  ms-2" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </div>
                </div>

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

      <table class="pc-table table align-middle d-none d-lg-table ">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th style="width: 110px">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                <div class="d-flex gap-2 ">
                  <div style="width: 100px"> <img :src="item.product.imageUrl" alt="imageUrl" class="flex-image"></div>
                  <div class="d-flex   flex-column  align-items-start text-start ">
                    <div> <router-link :to="`/product/all/all/id/${item.product.id}`">{{ item.product.title
                        }}</router-link></div>
                    <div class="ms-2">
                      <span class=" text-300"> <del>${{ item.product.origin_price }}</del></span>
                      <span class=" text-primary  me-4 ">${{ item.product.price }}</span>
                      <div class=" text-500  ">剩餘數量： {{ item.product.num }}</div>
                    </div>

                    <div class="text-success  ms-2" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </div>

                </div>


              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control" min=1 :max="item.product.num"
                    :disabled="item.id === status.loadingItem" @change="updateCart(item)" v-model.number="item.qty">
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




      <div class=" d-flex justify-content-end mb-5 gap-2 ">
        <div class="">
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append ">
              <button class="btn btn-secondary text-white" type="button" @click="addCouponCode">
                套用優惠碼
              </button>

            </div>

          </div>

        </div>
        <div class="">
          <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all" class="nav-link ">
              新增其他商品</router-link>
          </button>
        </div>
      </div>




    </div>
    <div class="col-12 ">
      <div class="col-12 ">
        <div class=" d-flex justify-content-center">
          <button class="btn btn-danger  text-white  " type="button" @click="$emit('go-next')">確認，填寫訂單</button>
        </div>

      </div>

    </div>

  </div>

  <div v-else class="text-dark  "> 您的購物車是空的，請先將商品放入購物車。
    <div class="d-flex justify-content-end mb-5">
      <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all" class="nav-link ">
          繼續購物</router-link>
      </button>
    </div>
  </div>

</template>

<script>
import {userProductsApi, userCartApi, userCouponApi, userOrderApi} from '@/utils/const/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
export default {
  inject: ['httpMessageState', 'emitter'],
  emits: ['go-next'],
  props: {
    checkout: Boolean,
  },
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
        this.isLoading = false;
        if (response.data.success) {
          this.products = response.data.products;
        } else {
          dataErr(response)
        }

      }).catch((err) => {
        catchErr(err)
        this.status.isLoading = false;
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

          this.getCart();
        });
    },
    getCart() {
      const url = `${userCartApi}`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.cart = response.data.data;
        } else {
          dataErr(response)
        }
      }).catch((err) => {
        catchErr(err)

      });
    },
    updateUserCartQty() {
      this.emitter.emit('update-cartQty'); //觸發首頁購物車數量更新
    },
    updateCart(item) {
      if (item.qty > item.product.num) {
        alert(`你輸入的數量大於可購買數量${item.product.num},自動更新為最大可購買數量。`)
        item.qty = item.product.num;
      }

      const url = `${userCartApi}/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.$http.put(url, {data: cart}).then((res) => {

        this.status.loadingItem = '';
        this.updateUserCartQty();
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
        this.updateUserCartQty();
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
  watch: {
    checkout() {
      this.getCart();
    }
  }

};
</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}
</style>