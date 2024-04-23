
import {defineStore} from 'pinia';
import {ref} from 'vue'
import {userOrdersApi, userOrderPayApi, userOrderApi} from '@/utils/config/path'
import statusStore from './statusStore';
import fetchAct from '@/utils/methods/fetchAct';

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref();
  const order = ref();

  const pagination = ref({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false,
  });
  const status = statusStore();
  function getOrderByID(orderId) {
    if (!orderId) {
      console.error('params is empty or invalid.')
      return
    }
    const url = `${userOrderApi}/${orderId}`;
    fetchAct.get(url)
      .then(data => {
        order.value = data.order;
      })
  }
  function getOrders(currentPage = 1) {
    pagination.value.currentPage = currentPage;
    const url = `${userOrdersApi}?page=${currentPage}`;
    fetchAct.get(url)
      .then(data => {
        orders.value = data.orders;
        pagination.value = data.pagination;
      })
  }

  function payOrderByID(orderId) {
    if (!orderId) {
      console.error(' pay order params is empty or invalid.')
      return
    }
    const url = `${userOrderPayApi}/${orderId}`;
    fetchAct.post(url, null, `訂單編號${orderId} 付款`)
      .then(() => {
        this.getOrders();
        this.getOrderByID(orderId);
      })

  }
  function createOrder(body) {

    if (!body.user) {
      console.error(' order.user params is empty or invalid.')
      return
    }
    const {name, email, tel, address} = body.user;
    if (!name || !email || !tel || !address) {
      console.error(' order.user params is empty or invalid.')
      return;
    }

    const url = userOrderApi;
    status.orderTemp.paySuccess = false;
    fetchAct.post(url, {data: body}, `訂單送出`)
      .then(data => {

        status.orderTemp.paySuccess = true;
        status.orderTemp.orderId = data.orderId;
      })
  }
  return {
    orders, status, pagination, order,
    getOrders, payOrderByID, createOrder, getOrderByID
  }
})