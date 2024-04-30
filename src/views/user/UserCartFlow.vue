<template>
  <LoadingOverlay :active="status.isLoading" />

  <div class=" font-sm   mb-5">

    <div class="row   flex-column align-items-center  justify-content-center  " style="min-height: 50vh"
      v-if="!status.isLoading && !checkout && (!cart || cart.carts.length === 0)">
      <div class="col-12  col-lg-7 text-dark   d-flex flex-column align-items-center   ">
        <h5 class=" my-4 fs-2 ">購物頁面</h5>

        <div class="fs-4">您的購物車是空的，請先將商品放入購物車。</div>

        <button class="btn btn-outline-primary mt-3 mt-lg-4" type="button">
          <router-link to="/product/all/all" class="nav-link ">
            前往購物</router-link>
        </button>
      </div>
    </div>
    <div class="my-3 " v-else>
      <div class="row flex-column align-items-center justify-content-center ">
        <div class="col-12 my-3 ">
          <h2 class=" my-3">購物頁面</h2>
          <div class=" my-3 border-bottom bolder-500"></div>
          <ul class="nav  ">
            <li class="nav-item">
              <button class="btn border-0"
                :class="{ 'btn-secondary': activeTab === 1, 'text-white': activeTab === 1, 'btn-sm': isExtraSmallDevice }"
                type="button" role="tab" @click="setActiveTab(1)">01 購物車</button>

            </li>
            <li class="nav-item " role="presentation">
              <button class="btn border-0 " :disabled="stepRecord < 2"
                :class="{ 'btn-secondary': activeTab === 2, 'text-white': activeTab === 2, 'btn-sm': isExtraSmallDevice }"
                type="button" role="tab" @click="setActiveTab(2)">02 填寫訂單</button>

            </li>
            <li class="nav-item" role="presentation">

              <button class="btn border-0 " :disabled="stepRecord < 3"
                :class="{ 'btn-secondary': activeTab === 3, 'text-white': activeTab === 3, 'btn-sm': isExtraSmallDevice }"
                type="button" role="tab" @click="setActiveTab(3)">03 結帳</button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade " :class="{ 'show': activeTab === 1, 'active': activeTab === 1 }">
              <div class="mb-4 mb-xs-5">
                <CartFlowItems :checkout="checkout" />
              </div>
              <div class=" d-flex justify-content-center gap-2">
                <button class="btn btn-primary  text-white  " type="button" @click="goNextTab">填寫訂單資訊</button>
              </div>

            </div>
            <div class="tab-pane fade" :class="{ 'show': activeTab === 2, 'active': activeTab === 2 }">
              <CartFlowOrderLoc @go-prev="goPrevTab" @order-create="updateOrderID" />

            </div>
            <div class="tab-pane fade" :class="{ 'show': activeTab === 3, 'active': activeTab === 3 }">
              <CartFlowOrderSuccess :orderId="orderId" />
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>

import CartFlowItems from '@/components/user/CartFlowItems.vue';
import CartFlowOrderLoc from '@/components/user/CartFlowOrderLoc.vue';
import CartFlowOrderSuccess from '@/components/user/CartFlowOrderSuccess.vue';
import {useCartStore} from '@/stores/cartStore';
import {storeToRefs} from 'pinia'
import {ref} from 'vue';
import {useDeviceSize} from '@/composables/useDeviceSize.js'
import statusStore from '@/stores/statusStore';
const {isExtraSmallDevice} = useDeviceSize()
const cartStore = useCartStore();

const status = statusStore();
const {cart} = storeToRefs(cartStore);

const orderId = ref("")
const stepRecord = ref(0);
const checkout = ref(false);

let activeTab = ref(1);

function setActiveTab(index) {
  if (!checkout.value) {
    activeTab.value = index;
  }

}

function goNextTab() {
  const next = activeTab.value + 1
  stepRecord.value = next;
  setActiveTab(next);

}

function goPrevTab() {

  const prev = activeTab.value - 1
  setActiveTab(prev);

}

function updateOrderID(orderID) {

  orderId.value = orderID
  goNextTab();
  checkout.value = true;
}

</script>