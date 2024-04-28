<template>
  <div class="my-2 my-md-5 row justify-content-center" v-if="order">

    <div v-if="order.is_paid" class="text-success d-flex flex-column justify-content-center align-items-center mb-5">
      <div class="fs-1"> <i class="bi bi-check-circle "></i></div>

      <span> 付款完成</span>

    </div>

    <div v-else class="text-primary d-flex flex-column justify-content-center align-items-center mb-5">
      <div class="fs-1"> <i class="bi bi-cart-check"></i></div>
      <span> 已收到訂單，<b>付款完成</b>後會為您立即出貨。</span>

    </div>
    <h4 class="mt-3">訂單資訊</h4>
    <form class="row" @submit.prevent="confirmPay">
      <div class="col-12 col-md-7">
        <table class="table align-middle ">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td style="width:60%">{{ item.product.title }}</td>
              <td>{{ item.qty }}/{{ item.product.unit }}</td>
              <td>{{ $filters.currency(item.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end">總計</td>
              <td>{{ $filters.currency(order.total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-12 col-md-5">
        <table class="table">
          <tbody>
            <tr>
              <th width="100">訂單編號</th>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <th width="100">Email</th>
              <td> <span class="text-break ">{{ order.user.email }}</span></td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>收貨備註</th>
              <td>{{ order.message }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger ">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center" v-if="order.is_paid === false">
        <button class="btn btn-primary">進行付款</button>
      </div>
      <div class="text-center " v-else>
        <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all" class="nav-link ">
            繼續購物</router-link>
        </button>
      </div>
    </form>
  </div>
  <CheckoutConfirm :item="order" ref="checkoutConfirm" @pay-order="payOrder" v-if="order" />
</template>

<script setup>

import {useOrderStore} from '@/stores/orderStore'
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
const props = defineProps({
  orderId: String,
});
import {storeToRefs} from 'pinia';
import {watch, ref} from 'vue';
const orderStore = useOrderStore()
const {order} = storeToRefs(orderStore);
const {getOrderByID, payOrderByID} = orderStore;
const checkoutConfirm = ref(null)

function getOrder() {
  if (props.orderId === "") {
    return
  }
  getOrderByID(props.orderId)
}
getOrder()

watch(() => props.orderId,
  () => {
    getOrder()
  }
);
function confirmPay() {
  const confirmModal = checkoutConfirm.value;
  confirmModal.showModal();
}
function payOrder() {
  payOrderByID(orderId)
  const confirmModal = checkoutConfirm.value;
  confirmModal.hideModal();
}

</script>