import axios from 'axios';
import {defineStore} from 'pinia';
import {computed, ref} from 'vue'

import statusStore from './statusStore';
import {userCartApi} from '@/utils/const/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
export const useCartStore = defineStore('cartStore', () => {
  const cart = ref();
  const status = statusStore();
  const cartTotalQty = computed(() => {
    let total = 0
    if (!cart.value) {
      return 0;
    }
    let cartValue = cart.value;

    cartValue.carts.forEach(element => {
      total = total + element.qty
    });
    return total
  });

  function getCart() {
    const url = `${userCartApi}`;
    status.isGetCartLoading = true;
    axios.get(url).then((response) => {
      status.isGetCartLoading = false;
      if (response.data.success) {
        cart.value = response.data.data;

      } else {
        dataErr(response)
      }
    }).catch((err) => {
      status.isGetCartLoading = false;
      catchErr(err)

    });
  }

  function addCart(id) {
    const url = `${userCartApi}`;
    status.cartLoadingItem = id;
    const cart = {
      product_id: id,
      qty: 1,
    };
    axios.post(url, {data: cart})
      .then((res) => {
        status.cartLoadingItem = '';
        this.getCart();
      });
  }

  function addCartByItem(cart) {
    const url = `${userCartApi}`;
    status.isLoading = true;

    axios.post(url, {data: cart}).then((response) => {
      status.isLoading = false;
      status.pushMessage({title: '加入購物車', response: response});
      this.getCart();
    });

  }

  function updateCart(item) {
    if (item.qty > item.product.num) {
      alert(`你輸入的數量大於可購買數量${item.product.num},自動更新為最大可購買數量。`)
      item.qty = item.product.num;
    }

    const url = `${userCartApi}/${item.id}`;
    status.isLoading = true;
    status.loadingItem = item.id;
    const cart = {
      product_id: item.product_id,
      qty: item.qty,
    };
    axios.put(url, {data: cart}).then((res) => {
      status.isLoading = false;
      status.loadingItem = '';
      this.getCart();
    });
  }

  function removeCartByID(id) {
    status.loadingItem = id;
    const url = `${userCartApi}/${id}`;
    status.isLoading = true;
    axios.delete(url).then((response) => {
      status.isLoading = false;
      status.pushMessage(response, '移除購物車品項');
      status.loadingItem = '';
      this.getCart();
    });
  }

  return {
    cart, status, cartTotalQty,
    getCart, addCart, addCartByItem, updateCart, removeCartByID,
  }
})

