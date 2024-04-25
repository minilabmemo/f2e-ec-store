<template>

  <div class="row mt-4  ">
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
                <button type="button" class="btn btn-outline-danger btn-sm"
                  :disabled="status.cartLoadingItem === item.id" @click="removeConfirm(item)">
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
                        <span class=" text-500" v-show="item.product.price !== item.product.origin_price">
                          <del>${{ $filters.currency(item.product.origin_price) }}</del></span>
                        <span class=" text-primary  me-1 ">${{ $filters.currency(item.product.price) }}</span>

                      </div>
                      <span class=" text-500  ">剩餘數量： {{ item.product.num }}</span>

                      <select id="qty" class="form-select" v-model="item.qty"
                        :disabled="item.id === status.cartCartLoadingItem" @change="updateCart(item)">

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

            <td class="text-end">${{ $filters.currency(cart.total) }}</td>
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
            <th>
            </th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th style="width: 110px">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id" data-cy="item">
              <td>

                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeConfirm(item)">
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
                      <span class=" text-500  me-4" v-show="item.product.price !== item.product.origin_price"> <del>${{
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
                <select id="qty" class="form-select" v-model="item.qty" :disabled="item.id === status.CartLoadingItem"
                  @change="updateCart(item)">

                  <option :value="item" v-for="item in item.product.num" :key="item">{{ item }}</option>
                </select>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                ${{ $filters.currency(item.final_total) }}
              </td>
            </tr>

          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-center ">{{ cartTotalQty }}件</td>
            <td class="text-end">${{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">${{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="">
        <div class="input-group mb-3 input-group-sm">
          <input aria-label="coupon_code" type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append ">
            <button class="btn btn-secondary text-white" type="button" @click="addCouponCode">
              套用優惠碼
            </button>

          </div>

        </div>

      </div>
      <div class="d-flex justify-content-end flex-wrap gap-2 ">
        <div class="">
          <button class="btn btn-outline-primary" type="button" @click="deleteAll">清空購物車</button>
        </div>
        <div class=" d-flex justify-content-end mb-5 gap-2 flex-wrap">

          <div class="">
            <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all"
                class="nav-link ">
                新增其他商品</router-link>
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>

  <RemoveCartConfirm :item="tempItem" ref="RemoveItemRef" @remove-item="removeCartItem(tempItem.id)" />
  <RemoveAllCartConfirm :cartTotalQty="cartTotalQty" ref="RemoveAllItemRef" @remove-items="removeAllCartItem()" />
</template>

<script setup>
import {ref, watch, defineProps} from 'vue';
import {userCouponApi} from '@/utils/config/path';
import {useCartStore} from '@/stores/cartStore';
import fetchAct from '@/utils/methods/fetchAct';
import {storeToRefs} from 'pinia';

import RemoveCartConfirm from '@/components/user/modal/RemoveCartConfirm.vue';
import RemoveAllCartConfirm from '@/components/user/modal/RemoveAllCartConfirm.vue';
const {getCart, updateCart, removeCartByID, removeAllItems} = useCartStore();
const {cart, cartTotalQty, status} = storeToRefs(useCartStore());

const props = defineProps({
  checkout: Boolean,
});
const RemoveItemRef = ref(null);
const RemoveAllItemRef = ref(null);
const tempItem = ref({});
const coupon_code = ref('');

const removeConfirm = (item) => {
  tempItem.value = {...item};
  const confirmModal = RemoveItemRef.value
  confirmModal.showModal();
};

const removeCartItem = (id) => {

  removeCartByID(id);
  const confirmModal = RemoveItemRef.value;
  confirmModal.hideModal();
};

const deleteAll = () => {
  const confirmModal = RemoveAllItemRef.value
  confirmModal.showModal();

};
const removeAllCartItem = () => {

  removeAllItems();
  const confirmModal = RemoveAllItemRef.value;
  confirmModal.hideModal();
};
const addCouponCode = () => {
  const url = userCouponApi;
  const coupon = {
    code: coupon_code.value,
  };

  fetchAct.post(url, {data: coupon}).then(() => {
    getCart();

  });
};

watch(() => props.checkout, () => {
  getCart();
  items = ref(cart.value.carts);
});

</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}
</style>