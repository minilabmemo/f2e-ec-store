<template>
  <LoadingOverlay :active="status.isLoading" />
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
            <a href="#" class=" " @click.prevent="openModal(false, item)"> <i class="bi bi-search me-2"></i>
              <small>查看訂單</small> </a>

          </td>
          <td>
            <div class=" ">${{ $filters.currency(item.total) }}</div>
          </td>
          <td>

            <div class="d-flex justify-content-start align-items-center  gap-1  ">

              <div class="d-flex  align-items-center justify-content-center    " v-if="item.is_paid">
                <div class="rounded-circle bg-success me-1 " style="height: 16px;width: 16px;"> </div>
                <div class=""> 已付款 </div>
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
          <td> <a href="#" class=" " @click.prevent="openModal(false, item)"> <i class="bi bi-search me-2"></i>
              <small>查看訂單內容</small> </a> </td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product) in item.products" :key="product.product.id">
                <small> {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}</small>

              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>

            <div v-if="item.is_paid" class="d-flex justify-content-start align-items-center  gap-1 flex-grow-1 ">
              <div class="  rounded-circle " :class="{ 'bg-success ': item.is_paid }" style="height: 16px;width: 16px;">
              </div><span>已付款</span>
            </div>

            <button class="btn btn-outline-danger btn-sm text-nowrap w-100 mt-1" @click="confirmPay(item)"
              v-if="!item.is_paid">付款</button>

          </td>

        </tr>
      </template>
    </tbody>
  </table>

  <OrderModal :order="tempOrder" ref="orderModal" />
  <CheckoutConfirm :item="tempOrder" ref="CheckoutConfirm" @pay-order="payOrder" />
  <Pagination :pages="pagination" @change-page-num="getOrders" />
</template>

<script>
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/PaginationAct.vue';

import {useOrderStore} from '@/stores/orderStore'
import {mapState, mapActions} from 'pinia'
export default {

  data() {
    return {
      isNew: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(useOrderStore, ['orders', 'status', 'pagination']),

  },
  components: {
    Pagination,
    CheckoutConfirm,
    OrderModal,
  },
  methods: {
    ...mapActions(useOrderStore, ['getOrders', 'payOrderByID']),

    openModal(isNew, item) {
      this.tempOrder = {...item};
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },

    confirmPay(item) {
      this.tempOrder = {...item};
      this.orderId = item.id;
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.showModal();
    },

    payOrder() {
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.hideModal();
      if (this.orderId) {
        this.payOrderByID(this.orderId)

      }
    },
  },
  created() {
    this.getOrders();

  },
};
</script>