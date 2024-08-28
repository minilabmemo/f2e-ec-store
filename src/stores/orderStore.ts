import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userOrdersApi, userOrderPayApi, userOrderApi } from '@/utils/config/path';
import statusStore from './statusStore';
import fetchAct from '@/utils/methods/fetchAct';
import type { OrderUser, Order } from '@/utils/type';

interface Pagination {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
}

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref();
  const order = ref();

  const pagination = ref<Pagination>({
    total_pages: 0,
    current_page: 1,
    has_pre: false,
    has_next: false
  });
  const status = statusStore();

  interface getOrderResponse {
    success: boolean;
    order: Order;
    message?: string;
  }

  function getOrderByID(orderId: string) {
    if (!orderId) {
      console.error('params is empty or invalid.');
      return;
    }
    const url = `${userOrderApi}/${orderId}`;
    fetchAct.get<getOrderResponse>(url).then((data) => {
      order.value = data.order;
    });
  }

  interface getOrdersResponse {
    success: boolean;
    orders: Order[];
    pagination: Pagination;
    message?: string;
  }

  function getOrders(currentPage = 1) {
    pagination.value.current_page = currentPage;
    const url = `${userOrdersApi}?page=${currentPage}`;
    fetchAct.get<getOrdersResponse>(url).then((data) => {
      orders.value = data.orders;
      pagination.value = data.pagination;
    });
  }

  function payOrderByID(orderId: string) {
    if (!orderId) {
      console.error(' pay order params is empty or invalid.');
      return;
    }
    const url = `${userOrderPayApi}/${orderId}`;
    fetchAct.post(url, null, { msgTitle: `訂單編號${orderId} 付款` }).then(() => {
      getOrders();
      getOrderByID(orderId);
    });
  }

  interface createOrderResponse {
    success: boolean;
    orderId: string;
    message?: string;
  }
  function createOrder(body: { user: OrderUser }) {
    if (!body.user) {
      console.error(' order.user params is empty or invalid.');
      return;
    }
    const { name, email, tel, address } = body.user;
    if (!name || !email || !tel || !address) {
      console.error(' order.user params is empty or invalid.');
      return;
    }

    const url = userOrderApi;
    status.orderTemp.paySuccess = false;
    fetchAct.post<createOrderResponse>(url, { data: body }, { msgTitle: `訂單送出` }).then((data) => {
      status.orderTemp.paySuccess = true;
      status.orderTemp.orderId = data.orderId;
    });
  }
  return {
    orders,
    pagination,
    order,
    getOrders,
    payOrderByID,
    createOrder,
    getOrderByID
  };
});
