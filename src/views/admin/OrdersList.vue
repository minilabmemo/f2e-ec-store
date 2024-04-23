<template>
  <LoadingOverlay :active="isLoading" />
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item) in orders" :key="item.id">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product) in item.products" :key="product.product.id">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid"
                @change="updatePaid(item)">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
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
  <OrderModal :order="tempOrder" ref="orderModal" />
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
  <Pagination :pages="pagination" @change-page-num="getOrders" />
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/PaginationAct.vue';
import {adminOrderApi, adminOrdersApi} from '@/utils/config/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore';
import {mapActions} from 'pinia'
export default {

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
    ...mapActions(statusStore, ['pushMessage']),
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${adminOrdersApi}?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
        } else {
          dataErr(response)
        }

      }).catch((err) => {
        catchErr(err)

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
    updatePaid(item) {
      this.isLoading = true;
      const api = `${adminOrderApi}/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, {data: paid}).then((response) => {
        this.isLoading = false;
        this.getOrders(this.currentPage);
        this.pushMessage({title: '更新付款狀態', response: response});

      });
    },
    delOrder() {
      const url = `${adminOrderApi}/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.pushMessage({title: '刪除訂單', response: response});
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
</script>@/utils/config/path