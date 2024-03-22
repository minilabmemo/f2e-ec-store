<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>訂單編號</th>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">

        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ item.id }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">

              <div class="d-flex justify-content-center align-items-center  gap-1 ">
                <div class="  rounded-circle " :class="{ 'bg-success ': item.is_paid, 'bg-primary': !item.is_paid }"
                  style="height: 15px;width: 15px;">
                </div>
                <span v-if="item.is_paid">

                  已付款
                </span>
                <span v-else>未付款</span>
              </div>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm" @click="confirmPay(item)" v-if="!item.is_paid">付款</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <CheckoutConfirm :item="tempOrder" ref="CheckoutConfirm" @pay-order="payOrder"> </CheckoutConfirm>
  <Pagination :pages="pagination" @change-page-num="getOrders"></Pagination>
</template>

<script>
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
import OrderModal from '@/components/orderModal.vue';
import Pagination from '@/components/Pagination.vue';
import {adminOrderApi, userOrdersApi} from '@/utils/const/path'

export default {
  inject: ['httpMessageState'],
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    CheckoutConfirm,
    OrderModal,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${userOrdersApi}?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;
        this.isLoading = false;
        console.log(response);
      });
    },
    openModal(isNew, item) {
      this.tempOrder = {...item};
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, {data: paid}).then((response) => {
        this.isLoading = false;
        this.getOrders(this.currentPage);
        this.$httpMessageState(response, '更新付款狀態');
      });
    },
    confirmPay(item) {
      this.tempOrder = {...item};
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.showModal();
    },
    payOrder() {
      const url = `${userOrderPayApi}/${this.orderId}`;
      this.$http.post(url) //TODO ???是怎麼送出 body 的啊？自動送出？？
        .then((res) => {
          if (res.data.success) {
            this.getOrder();
            this.updateUserCartQty()
          }
          const confirmModal = this.$refs.CheckoutConfirm;
          confirmModal.hideModal();
        });
    },
  },
  created() {
    this.getOrders();

  },
};
</script>