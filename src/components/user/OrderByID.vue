<template>
  <div class="my-5 row justify-content-center">
    <form class="" @submit.prevent="confirmPay" v-if="order">
      <table class="table align-middle">
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

      <table class="table">
        <tbody>
          <tr>
            <th width="100">訂單編號</th>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
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
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
      <div class="text-center " v-else>
        <button class="btn btn-outline-primary " type="button"> <router-link to="/product/all/all" class="nav-link ">
            繼續購物</router-link>
        </button>
      </div>
    </form>
  </div>
  <CheckoutConfirm :item="order" ref="CheckoutConfirm" @pay-order="payOrder" v-if="order" />
</template>

<script>


import {useOrderStore} from '@/stores/orderStore'
import {mapState, mapActions} from 'pinia'
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';

export default {
  components: {CheckoutConfirm},
  props: {
    orderId: String,
  },
  computed: {
    ...mapState(useOrderStore, ['order', 'status']),

  },

  methods: {
    ...mapActions(useOrderStore, ['getOrderByID', 'payOrderByID']),

    getOrder() {
      if (this.orderId == "") {
        return
      }
      this.getOrderByID(this.orderId)
    },
    confirmPay() {
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.showModal();
    },
    payOrder() {
      this.payOrderByID(this.orderId)
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.hideModal();
    },
  },

  created() {
    this.getOrder();


  },
  watch: {
    orderId() {
      this.getOrder();
    },
  },
};
</script>