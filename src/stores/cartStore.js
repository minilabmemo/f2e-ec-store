
import {defineStore} from 'pinia';
import {computed, ref} from 'vue'

import statusStore from './statusStore';
import {userCartApi} from '@/utils/config/path'

import fetchAct from '@/utils/methods/fetchAct';

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
    fetchAct.get(url)
      .then(data => {

        status.isGetCartLoading = false;
        cart.value = data.data;
      })

  }

  function addCart(id) {
    if (!id) {
      console.error('params is empty or invalid.')
      return
    }
    const url = `${userCartApi}`;
    status.cartLoadingItem = id;
    const cart = {
      product_id: id,
      qty: 1,
    };
    status.cartLoadingItem = id;
    fetchAct.post(url, {data: cart}, `品項加一`)
      .then(data => {
        console.log("addCart", data);
        status.cartLoadingItem = '';
      })

  }

  function addCartByItem(cart) {
    const url = `${userCartApi}`;

    fetchAct.post(url, {data: cart}, `加入購物車`)
      .then(data => {
        console.log("addCartByItem", data);
        this.getCart();
      })

  }

  function updateCart(item) {
    if (item.qty > item.product.num) {
      alert(`你輸入的數量大於可購買數量${item.product.num},自動更新為最大可購買數量。`)
      item.qty = item.product.num;
    }

    const url = `${userCartApi}/${item.id}`;


    const cart = {
      product_id: item.product_id,
      qty: item.qty,
    };
    status.loadingItem = item.id;
    fetchAct.put(url, {data: cart}, "")
      .then(data => {
        console.log("updateCart", data);
        status.loadingItem = '';
        this.getCart();
      })

  }

  function removeCartByID(id) {
    if (!id) {
      console.error('params is empty or invalid.')
      return
    }

    const url = `${userCartApi}/${id}`;
    status.loadingItem = id;
    fetchAct.put(url, {data: cart}, `移除購物車品項`)
      .then(data => {
        console.log("removeCartByID", data);
        status.loadingItem = '';
        this.getCart();
      })

  }

  return {
    cart, status, cartTotalQty,
    getCart, addCart, addCartByItem, updateCart, removeCartByID,
  }
})

