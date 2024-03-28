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
            <td>{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td>{{ order.total }}</td>
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
    </form>
  </div>
  <CheckoutConfirm :item="order" ref="CheckoutConfirm" @pay-order="payOrder">
  </CheckoutConfirm>
</template>

<script>
import {userOrderApi, userOrderPayApi} from '@/utils/const/path'
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
export default {
  components: {CheckoutConfirm},
  props: {
    orderId: String,
  },
  inject: ['httpMessageState', 'emitter'],
  data() {
    return {
      order: {
        user: {},
      },

      isLoading: false,
    };
  },
  methods: {
    updateUserCartQty() {
      this.emitter.emit('update-cartQty'); //觸發首頁購物車數量更新
    },
    getOrder() {
      if (this.orderId == "") {
        return
      }
      const url = `${userOrderApi}/${this.orderId}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
          } else {
            dataErr(response)
          }
        }).catch((err) => {
          catchErr(err)
          this.status.isLoading = false;
        });
    },
    confirmPay() {
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.showModal();
    },
    payOrder() {
      const url = `${userOrderPayApi}/${this.orderId}`;
      this.$http.post(url)
        .then((res) => {
          this.httpMessageState(res, '付款');
          if (res.data.success) {
            this.getOrder();
            this.updateUserCartQty()
          }
          const confirmModal = this.$refs.CheckoutConfirm;
          confirmModal.hideModal();
        }).catch((err) => {
          catchErr(err)
        });
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