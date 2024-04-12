<template>
  <LoadingOverlay :active="status.isLoading" />

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
            <tr v-for="item in cart.carts" :key="item.id" data-cy="item">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeConfirm(item)">
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
                        <span class=" text-300" v-show="item.product.price !== item.product.origin_price"> <del>

                            ${{
    $filters.currency(item.product.origin_price) }}</del></span>
                        <span class=" text-primary  me-1 ">${{ $filters.currency(item.product.price) }}</span>

                      </div>
                      <span class=" text-500  ">剩餘數量： {{ item.product.num }}</span>

                      <select id="qty" class="form-select" v-model="item.qty" :disabled="item.id === status.loadingItem"
                        @change="updateCart(item)">

                        <option :value="item" v-for="item in item.product.num" :key="item">{{ item }}</option>
                      </select>
                      <div>
                        <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                        ${{ $filters.currency(item.final_total) }}
                      </div>
                    </div>

                    <small class="text-success  ms-1" v-if="item.coupon">
                      已套用優惠券
                    </small>
                  </div>
                </div>

              </td>

            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td class="text-end text-success text-nowrap "><small>折扣價</small></td>
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
            <tr v-for="item in cart.carts" :key="item.id" data-cy="item">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" :disabled="status.loadingItem === item.id"
                  @click="removeConfirm(item)">
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
                      <span class=" text-300  me-4" v-show="item.product.price !== item.product.origin_price"> <del>${{
    $filters.currency(item.product.origin_price) }}</del></span>
                      <span class=" text-primary  me-4 ">${{ $filters.currency(item.product.price) }}</span>
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
  <RemoveCartConfirm :item="tempItem" ref="RemoveCartConfirm" @remove-item="removeCartItem(tempItem.id)" />
</template>

<script>
import {userCouponApi} from '@/utils/config/path'
import statusStore from '@/stores/statusStore';

import RemoveCartConfirm from '@/components/user/modal/RemoveCartConfirm.vue';
import {useCartStore} from '@/stores/cartStore';
import {useProductStore} from '@/stores/productStore';
import {mapState, mapActions} from 'pinia'
export default {
  components: {RemoveCartConfirm},
  emits: ['go-next'],
  props: {
    checkout: Boolean,
  },
  computed: {
    ...mapState(useCartStore, ['cart', 'status']),
    ...mapState(useProductStore, ['products', 'status'])
  },

  data() {
    return {

      product: {},

      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },

      coupon_code: '',
      tempItem: {},
    };
  },
  methods: {
    ...mapActions(useCartStore, ['getCart', 'addCart', "updateCart", "removeCartByID"]),
    ...mapActions(useProductStore, ['getProducts']),
    ...mapActions(statusStore, ['pushMessage']),

    removeConfirm(item) {
      this.tempItem = {...item};

      const confirmModal = this.$refs.RemoveCartConfirm;
      confirmModal.showModal();
    },

    removeCartItem(id) {
      this.removeCartByID(id);
      const confirmModal = this.$refs.RemoveCartConfirm;
      confirmModal.hideModal();
    },
    addCouponCode() {
      const url = userCouponApi;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, {data: coupon}).then((response) => {

        this.pushMessage({title: '加入優惠券', response: response});
        this.getCart();
        this.isLoading = false;
      });
    },


  },
  created() {
    this.getProducts();



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
</style>@/utils/config/path