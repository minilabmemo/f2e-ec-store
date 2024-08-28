<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="phone-layout align-middle d-flex d-xs-none flex-column">
        <div>
          <template v-if="cart.carts">
            <div v-for="item in cart.carts" :key="item.id" data-cy="item" class="d-flex border-bottom border-500 py-2">
              <div class="flex-grow-1">
                <div class="d-flex gap-2">
                  <div style="width: 6.25rem; flex-basis: 6.25rem" class="flex-shrink-0">
                    <img :src="item.product.imageUrl" alt="clothes" class="flex-image">
                  </div>
                  <div class="flex-grow-1 d-flex flex-column align-items-start text-start gap-2">
                    <div>
                      <router-link :to="`/product/all/all/id/${item.product.id}`">{{
                        item.product.title
                        }}</router-link>
                    </div>
                    <div class="w-100 d-flex flex-column align-items-start text-start gap-2">
                      <div class="d-flex flex-wrap gap-1">
                        <span class="text-500" v-show="item.product.price !== item.product.origin_price">
                          <del>${{ $filters.currency(item.product.origin_price) }}</del></span>
                        <span class="text-primary">${{ $filters.currency(item.product.price) }}</span>
                        <span class="text-500">剩餘數量： {{ item.product.num }}</span>
                      </div>
                      <div class="px-1 w-100">
                        <select id="qty" class="form-select form-select-sm" v-model="item.qty"
                          :disabled="item.id === status.cartLoadingItem" @change="updateCart(item)">
                          <option :value="pn" v-for="pn in item.product.num" :key="pn">
                            {{ pn }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <small class="text-success ms-1" v-if="item.coupon"> 已套用優惠券 </small>
                  </div>
                </div>
              </div>

              <div style="width: 4rem" class="d-flex flex-shrink-0 flex-column justify-content-between">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-danger btn-sm"
                    :disabled="status.cartLoadingItem === item.id" @click="removeConfirm(item)">
                    <i class="bi bi-x"></i>
                  </button>
                </div>

                <div class="text-nowrap text-end" :class="{ ' text-success': item.coupon }">
                  ${{ $filters.currency(item.final_total) }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="d-flex fs-6 flex-column gap-2 my-3">
          <div class="d-flex justify-content-between">
            <div>總計</div>

            <div class="text-end">${{ $filters.currency(cart.total) }}</div>
          </div>
          <div v-if="cart.final_total !== cart.total" class="d-flex fs-6 justify-content-between gap-2">
            <div class="text-end text-success text-nowrap"><small>折扣價</small></div>
            <div class="text-end text-success">${{ $filters.currency(cart.final_total) }}</div>
          </div>
        </div>
      </div>

      <table class="pc-table table align-middle d-none d-xs-table">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 6.875rem">數量</th>
            <th style="width: 6.875rem" class="text-end">單價</th>
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
                <div class="d-flex gap-2">
                  <div style="width: 6.25rem; flex-basis: 6.25rem">
                    <img :src="item.product.imageUrl" alt="clothes" class="flex-image">
                  </div>
                  <div style="flex: 1" class="d-flex flex-column align-items-start text-start">
                    <div>
                      <router-link :to="`/product/all/all/id/${item.product.id}`">{{
                        item.product.title
                        }}</router-link>
                    </div>
                    <div class="ms-1">
                      <span class="text-500 me-4" v-show="item.product.price !== item.product.origin_price">
                        <del>${{ $filters.currency(item.product.origin_price) }}</del></span>
                      <span class="text-primary me-4">${{ $filters.currency(item.product.price) }}</span>
                      <div class="text-500">剩餘數量： {{ item.product.num }}</div>
                    </div>

                    <div class="text-success ms-2" v-if="item.coupon">已套用優惠券</div>
                  </div>
                </div>
              </td>
              <td>
                <select id="pc-qty" class="form-select" v-model="item.qty"
                  :disabled="item.id === status.cartLoadingItem" @change="updateCart(item)">
                  <option :value="pn" v-for="pn in item.product.num" :key="pn">{{ pn }}</option>
                </select>
              </td>
              <td class="text-end">
                <div class="text-nowrap" :class="{ ' text-success': item.coupon }">
                  ${{ $filters.currency(item.final_total) }}
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-center">{{ cartTotalQty }}件</td>
            <td class="text-end">${{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">${{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="row justify-content-end">
        <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4">
          <div class="input-group mb-3 input-group-sm">
            <input aria-label="coupon_code" type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-secondary text-white rounded-0 rounded-end" type="button" @click="addCouponCode"
                :class="{ 'btn-sm': isExtraSmallDevice }">
                套用優惠卷
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end flex-wrap gap-2">
        <div>
          <button class="btn btn-outline-primary" :class="{ 'btn-sm': isExtraSmallDevice }" type="button"
            @click="deleteAll">
            清空購物車
          </button>
        </div>
        <div class="d-flex justify-content-end gap-2 flex-wrap">
          <div>
            <button class="btn btn-outline-primary" type="button" :class="{ 'btn-sm': isExtraSmallDevice }">
              <router-link to="/product/all/all" class="nav-link"> 新增其他商品</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <RemoveCartConfirm :item="tempItem" ref="removeItemRef" @remove-item="removeCartItem(tempItem.id)" />
  <RemoveAllCartConfirm :cartTotalQty="cartTotalQty" ref="removeAllItemRef" @remove-items="removeAllCartItem()" />
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { userCouponApi } from '@/utils/config/path';
import { useCartStore } from '@/stores/cartStore';
import fetchAct from '@/utils/methods/fetchAct';
import { storeToRefs } from 'pinia';

import RemoveCartConfirm from '@/components/user/modal/RemoveCartConfirm.vue';
import RemoveAllCartConfirm from '@/components/user/modal/RemoveAllCartConfirm.vue';
import { useDeviceSize } from '@/composables/useDeviceSize';
import statusStore from '@/stores/statusStore';
import type { CartTempItem } from '@/utils/type';

const status = statusStore();
const { isExtraSmallDevice } = useDeviceSize();
const cartStore = useCartStore();
const { getCart, updateCart, removeCartByID, removeAllItems } = cartStore;
getCart(true);
const { cart, cartTotalQty } = storeToRefs(cartStore);

const props = defineProps({
  checkout: Boolean
});
const removeItemRef = ref<InstanceType<typeof RemoveCartConfirm> | null>(null);
const removeAllItemRef = ref<InstanceType<typeof RemoveAllCartConfirm> | null>(null);
const tempItem: Ref<CartTempItem> = ref({
  product: { title: '' },
  id: ''
});
const coupon_code = ref('');

const removeConfirm = (item: CartTempItem) => {
  tempItem.value = { ...item };

  const confirmModal = removeItemRef.value;
  if (confirmModal) {
    confirmModal.showModal();
  }
};

const removeCartItem = (id: string) => {
  removeCartByID(id);
  const confirmModal = removeItemRef.value;
  if (confirmModal) {
    confirmModal.hideModal();
  }
};

const deleteAll = () => {
  const confirmModal = removeAllItemRef.value;
  if (confirmModal) {
    confirmModal.showModal();
  }
};
const removeAllCartItem = () => {
  removeAllItems();
  const confirmModal = removeAllItemRef.value;
  if (confirmModal) {
    confirmModal.hideModal();
  }
};

const addCouponCode = () => {
  const url = userCouponApi;
  const coupon = {
    code: coupon_code.value
  };

  fetchAct.post(url, { data: coupon }, { msgTitle: `套用優惠卷${coupon_code.value} `, allowNotSuccess: true }).then(() => {
    getCart();
  });
};

watch(
  () => props.checkout,
  () => {
    getCart();
  }
);
</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  height: auto;
}
</style>
