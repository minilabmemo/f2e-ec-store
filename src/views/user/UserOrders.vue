<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <table class="phone-table table table-sm align-middle d-table d-lg-none ">
    <thead>
      <tr>
        <th>訂單日期／編號</th>
        <th>付款狀況</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">

        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>
            <div> {{ $filters.date(item.create_at) }}</div>
            <a href="#" class="link-opacity-100 link-opacity-75-hover text-nowrap "
              @click.prevent="openModal(false, item)"> <i class="bi bi-search"></i>
              <small> {{ item.id }}</small> </a>

          </td>
          <td>




            <div class="d-flex justify-content-start align-items-center  gap-1 flex-wrap ">
              <div class="">$ {{ item.total }}</div>
              <div class="d-flex justify-content-start align-items-center  gap-1  flex-wrap ">

                <div class="rounded-circle" :class="{ 'bg-success ': item.is_paid, 'bg-primary': !item.is_paid }"
                  style="height: 15px;width: 15px;">
                </div>
                <span v-if="item.is_paid">
                  已付款
                </span>
                <span v-else>未付款 </span>
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
        <th>訂單編號</th>
        <th>購買時間</th>
        <th>電子郵件</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>

      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">

        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td> <a href="#" class="link-opacity-100 link-opacity-75-hover" @click.prevent="openModal(false, item)"> <i
                class="bi bi-search"></i>
              {{
    item.id
  }} </a> </td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                <small> {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}</small>

              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>


            <div class="d-flex justify-content-start align-items-center  gap-1 flex-wrap ">
              <div class="  rounded-circle " :class="{ 'bg-success ': item.is_paid, 'bg-primary': !item.is_paid }"
                style="height: 15px;width: 15px;">
              </div>
              <span v-if="item.is_paid">
                已付款
              </span>
              <span v-else>未付款 </span>

            </div>
            <button class="btn btn-outline-danger btn-sm text-nowrap " @click="confirmPay(item)"
              v-if="!item.is_paid">付款</button>

          </td>

        </tr>
      </template>
    </tbody>
  </table>


  <OrderModal :order="tempOrder" ref="orderModal"></OrderModal>
  <CheckoutConfirm :item="tempOrder" ref="CheckoutConfirm" @pay-order="payOrder"> </CheckoutConfirm>
  <Pagination :pages="pagination" @change-page-num="getOrders"></Pagination>
</template>

<script>
import CheckoutConfirm from '@/components/user/modal/CheckoutConfirm.vue';
import OrderModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';
import {userOrdersApi, userOrderPayApi} from '@/utils/const/path'

export default {
  inject: ['httpMessageState', 'emitter'],
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

    confirmPay(item) {
      this.tempOrder = {...item};
      this.orderId = item.id;
      const confirmModal = this.$refs.CheckoutConfirm;
      confirmModal.showModal();
    },
    updateUserCartQty() {
      this.emitter.emit('update-cartQty'); //觸發首頁購物車數量更新
    },
    payOrder() {
      if (this.orderId) {
        const url = `${userOrderPayApi}/${this.orderId}`;
        this.$http.post(url)
          .then((res) => {
            this.httpMessageState(res, '付款');
            const confirmModal = this.$refs.CheckoutConfirm;
            confirmModal.hideModal();
            if (res.data.success) {
              this.getOrders();
              this.httpMessageState(res, `訂單編號${this.orderId} 付款`);
              this.updateUserCartQty()
            }

          });
      }
    },
  },
  created() {
    this.getOrders();

  },
};
</script>