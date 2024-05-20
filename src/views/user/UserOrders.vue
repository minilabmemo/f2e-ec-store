<template>
  <div class="py-3">
    <LoadingOverlay :active="status.isLoading" />
    <h5>歷史訂單</h5>
    <table class="phone-table table table-sm align-middle d-table d-lg-none ">
      <thead>
        <tr>
          <th>訂單資訊</th>
          <th>總金額</th>
          <th>付款狀況</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item) in orders" :key="item.id">

          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>
              <div> {{ $filters.date(item.create_at) }}</div>
              <a href="#" @click.prevent="openModal(item)"> <i class="bi bi-search me-2"></i>
                <small>查看訂單</small> </a>

            </td>
            <td>
              <div>${{ $filters.currency(item.total) }}</div>
            </td>
            <td>

              <div class="d-flex justify-content-start align-items-center  gap-1  ">

                <div class="d-flex  align-items-center justify-content-center    " v-if="item.is_paid">
                  <div class="rounded-circle bg-success me-1 " style="height: 1rem;width: 1rem;"> </div>
                  <div> 已付款 </div>
                </div>

                <div class="d-flex flex-column w-100" v-else>
                  <button class="btn btn-outline-danger btn-sm text-nowrap " @click="confirmPay(item)"
                    v-if="!item.is_paid">付款</button>
                </div>

              </div>

            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <table class="pc-table table align-middle d-none d-lg-table ">
      <thead>
        <tr>
          <th>訂單資訊</th>
          <th>購買時間</th>
          <th>電子郵件</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>付款狀況</th>

        </tr>
      </thead>
      <tbody>
        <template v-for="(item) in orders" :key="item.id">

          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td> <a href="#" @click.prevent="openModal(item)"> <i class="bi bi-search me-2"></i>
                <small>查看訂單內容</small> </a> </td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user" class="d-inline-block text-truncate"
                style="max-width: 12.5rem;"></span>

            </td>
            <td>
              <ul class="list-unstyled ">
                <template v-for="(product, key, index) in item.products" :key="product.product.id">
                  <li v-if="index < 3">
                    <small> {{ product.product.title }} |{{ index }}數量：{{ product.qty }}
                      {{ product.product.unit }}</small>

                  </li>

                </template>

                <li v-if="Object.keys(item.products).length > 3">

                  <a href="#" @click.prevent="openModal(item)" class="nav-link ">
                    <small> ...More</small> </a>
                </li>
              </ul>
            </td>
            <td class=" text-right">{{ $filters.currency(item.total) }}
            </td>
            <td>

              <div v-if="item.is_paid" class="d-flex justify-content-start align-items-center  gap-1 flex-grow-1 ">
                <div class="  rounded-circle " :class="{ 'bg-success ': item.is_paid }"
                  style="height: 1rem;width: 1rem;">
                </div><span>已付款</span>
              </div>

              <button class="btn btn-outline-danger btn-sm text-nowrap w-100 mt-1" @click="confirmPay(item)"
                v-if="!item.is_paid">付款</button>

            </td>

          </tr>
        </template>
      </tbody>
    </table>

    <OrderModal :order="orderForModal" ref="orderModal" />
    <CheckoutConfirm :item="orderForModal" ref="checkoutConfirm" @pay-order="payOrder" />
    <PaginationAct :pages="pagination" @change-page-num="getOrders" />
  </div>
</template>

<script setup lang="ts">
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
import OrderModal from '@/components/OrderModal.vue';
import PaginationAct from '@/components/PaginationAct.vue';
import { useOrderStore } from '@/stores/orderStore'
import { computed, ref, type Ref } from 'vue'
import { storeToRefs } from 'pinia';
import statusStore from '@/stores/statusStore'
import type { Order } from '@/utils/type';

const tempOrder: Ref<Partial<Order>> = ref({})
const orderForModal = computed(() => tempOrder.value as Order);

const orderStore = useOrderStore()
const { orders, pagination } = storeToRefs(orderStore);
const { getOrders, payOrderByID } = orderStore;
getOrders()

const orderModal = ref<InstanceType<typeof OrderModal> | null>(null);
const checkoutConfirm = ref<InstanceType<typeof CheckoutConfirm> | null>(null);

const status = statusStore()
function openModal(item: Order) {
  tempOrder.value = { ...item };

  const orderComponent = orderModal.value;
  if (orderComponent) {
    orderComponent.showModal();
  }
}
let orderId = "";
function confirmPay(item: Order) {
  tempOrder.value = { ...item };
  orderId = item.id;
  const confirmModal = checkoutConfirm.value;
  if (confirmModal) {
    confirmModal.showModal();

  }
}

function payOrder() {
  const confirmModal = checkoutConfirm.value;
  if (confirmModal) {
    confirmModal.hideModal();

  }
  if (orderId) {
    payOrderByID(orderId)
  }
}
</script>
