import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue'
import {userOrdersApi, userOrderPayApi, userOrderApi} from '@/utils/const/path'

import statusStore from './statusStore';
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
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
    this.currentPage = currentPage;
    const url = `${userOrdersApi}?page=${currentPage}`;
    status.isLoading = true;
    axios.get(url, this.tempProduct).then((response) => {
      status.isLoading = false;
      if (response.data.success) {
        orders.value = response.data.orders;
        pagination.value = response.data.pagination;
      } else {
        dataErr(response)
      }


    }).catch((err) => {
      catchErr(err)

    });
  }
  function payOderByID(orderId) {
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

      });
  }
  function createOrder(body) {
    const url = userOrderApi;
    status.orderTemp.paySuccess = false;

    axios.post(url, {data: body})
      .then((res) => {
        status.pushMessage({
          title: `訂單送出`,
          response: res
        });
        if (res.data.success) {
          status.orderTemp.paySuccess = true;
          status.orderTemp.orderId = res.data.orderId;
        }

      });
  }
  return {
    orders, status, pagination, order,
    getOrders, payOderByID, createOrder, getOrderByID
  }
})