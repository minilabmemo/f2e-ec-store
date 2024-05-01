
import {defineStore} from 'pinia';
import {computed, ref} from 'vue'

import statusStore from './statusStore';
import {userCartApi, userCartsApi} from '@/utils/config/path'

import fetchAct from '@/utils/methods/fetchAct';

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref({carts: []});
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

  function getCart(isGlobeLoad) {
    const url = `${userCartApi}`;
    if (isGlobeLoad) {
      fetchAct.get(url)
        .then(res => {
          cart.value = res.data;
        })
    } else {
      fetchAct.get(url, {loadStates: ['isGetLoading']})
        .then(res => {
          cart.value = res.data;
        })
    }

  }

  function addCartByItem(cart) {
    const url = `${userCartApi}`;

    fetchAct.post(url, {data: cart}, {msgTitle: `加入購物車`, loadStates: ['isAddLoading']})
      .then(data => {
        if (data.data & data.data.product_id !== cart.product_id) {
          console.warn("後端回應資訊有誤 product_id=", data.data.product_id)
        }
        this.getCart();

      })

  }

  function updateCart(item) {
    if (item.qty > item.product.num) {
      alert(`你輸入的數量大於可購買數量${item.product.num},自動更新為最大可購買數量。`)
      item.qty = item.product.num;
    }
    const url = `${userCartApi}/${item.id}`;

    const putCart = {
      product_id: item.product_id,
      qty: item.qty,
    };
    status.cartLoadingItem = item.id;
    fetchAct.put(url, {data: putCart}, {loadStates: ['isUpdateLoading']})
      .then(() => {
        status.cartLoadingItem = '';
        this.getCart();
      })

  }

  function removeCartByID(id) {
    if (!id) {
      console.error('params is empty or invalid.')
      return
    }

    const url = `${userCartApi}/${id}`;
    status.cartLoadingItem = id;
    fetchAct.delete(url, {msgTitle: `移除購物車品項`})
      .then(() => {
        status.cartLoadingItem = '';
        this.getCart();
      })

  }
  function removeAllItems() {
    const url = `${userCartsApi}`;
    fetchAct.delete(url, {msgTitle: `移除全部購物車品項`})
      .then(() => {
        this.getCart();
      })

  }
  return {
    cart, status, cartTotalQty,
    getCart, addCartByItem, updateCart, removeCartByID, removeAllItems
  }
})

