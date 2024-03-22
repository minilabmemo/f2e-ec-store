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
        <th>編輯</th>
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
              <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @change-page-num="getOrders"></Pagination>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
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
    DelModal,
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
    openDelOrderModal(item) {
      this.tempOrder = {...item};
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },

    delOrder() {
      const url = `${adminOrderApi}/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        console.log(response);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getOrders(this.currentPage);
      });
    },
  },
  created() {
    this.getOrders();

  },
};
</script>