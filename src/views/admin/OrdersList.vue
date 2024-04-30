<template>
  <LoadingOverlay :active="status.isLoading" />
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>電子郵件</th>
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
          <td> <a :href="`mailto:${item.user.email}}`">
              <span class="d-inline-block text-truncate" style="max-width: 12.5rem;">{{
                item.user.email }}</span>
            </a></td>
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

<script setup>
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/PaginationAct.vue';
import {adminOrderApi, adminOrdersApi} from '@/utils/config/path'
import statusStore from '@/stores/statusStore';
import fetchAct from '@/utils/methods/fetchAct';
import {ref} from 'vue'
const status = statusStore();
const delModal = ref(null)
const orderModal = ref(null)
const pagination = ref({})
const tempOrder = ref({})

const orders = ref({})
const currentPageRef = ref(1)

const isNewRef = ref(false)

function getOrders(currentPage = 1) {
  currentPageRef.value = currentPage;
  const url = `${adminOrdersApi}?page=${currentPage}`;
  fetchAct.get(url).then((response) => {
    if (response.success) {
      orders.value = response.orders;
      pagination.value = response.pagination;
    }
  })
}
function openModal(isNew, item) {
  tempOrder.value = {...item};
  isNewRef.value = false;
  const orderComponent = orderModal;
  orderComponent.value.showModal();
}
function openDelOrderModal(item) {
  tempOrder.value = {...item};
  const delComponent = delModal;
  delComponent.value.showModal();
}
function updatePaid(item) {
  const api = `${adminOrderApi}/${item.id}`;
  const paid = {
    is_paid: item.is_paid,
  };
  fetchAct.put(api, {data: paid}, {msgTitle: "更新付款狀態"}).then(() => {
    getOrders(currentPageRef.value);

  });
}
function delOrder() {
  const url = `${adminOrderApi}/${tempOrder.value.id}`;
  fetchAct.delete(url, {msgTitle: "刪除訂單"}).then(() => {
    const delComponent = delModal;
    delComponent.value.hideModal();
    getOrders(currentPageRef.value);
  });
}
getOrders();

</script>