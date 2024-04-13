import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue'
import {userOrdersApi, userOrderPayApi, userOrderApi} from '@/utils/config/path'

import statusStore from './statusStore';
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
import {fetchData} from '@/utils/methods/fetchHandle'

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
    status.isLoading = true;
    axios.get(url)
      .then((res) => {
        status.isLoading = false;
        if (res.data.success) {

          order.value = res.data.order;
        } else {
          dataErr(res)
        }
      }).catch((err) => {
        catchErr(err)
        status.isLoading = false;
      });
  }
  function getOrders(currentPage = 1) {
    pagination.value.currentPage = currentPage;
    const url = `${userOrdersApi}?page=${currentPage}`;
    fetchData(url).then((data) => {

      orders.value = data.orders;
      pagination.value = data.pagination;
    })
  }


  function payOderByID(orderId) {
    if (!orderId) {
      console.error('params is empty or invalid.')
      return
    }
    const url = `${userOrderPayApi}/${orderId}`;
    status.isLoading = true;
    axios.post(url)
      .then((res) => {
        status.isLoading = false;
        status.pushMessage({
          title: `訂單編號${orderId} 付款`,
          response: res
        });
        if (res.data.success) {
          this.getOrders();
          this.getOrderByID(orderId);
        }

      }).catch((err) => {
        status.isLoading = false;
        catchErr(err)

      });
  }
  function createOrder(body) {
    const url = userOrderApi;
    status.orderTemp.paySuccess = false;
    status.isLoading = true;
    axios.post(url, {data: body})
      .then((res) => {
        status.isLoading = false;
        status.pushMessage({
          title: `訂單送出`,
          response: res
        });
        if (res.data.success) {
          status.orderTemp.paySuccess = true;
          status.orderTemp.orderId = res.data.orderId;
        }

      }).catch((err) => {
        status.isLoading = false;
        catchErr(err)

      });
  }
  return {
    orders, status, pagination, order,
    getOrders, payOderByID, createOrder, getOrderByID
  }
})