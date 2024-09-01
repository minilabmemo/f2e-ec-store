<template>
  <div class="w-100 row justify-content-center align-items-center">
    <div class="col-4 col-xl-4 d-flex justify-content-center align-items-center">
      <router-link to="/user/saves" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="前往收藏清單">
        <img src="@/assets/img/icons/save.svg" alt="save" class="icon-size">
      </router-link>
    </div>

    <div class="col-4 col-xl-4">
      <div class="row justify-content-center align-items-center">
        <router-link to="/user/cart/flow" class="col-12 nav-link" data-bs-toggle="tooltip" data-bs-placement="top"
          title="前往購物車">
          <div class="row justify-content-center align-items-center position-relative">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <img src="@/assets/img/icons/cart.svg" class="icon-size" alt="cart">
            </div>

            <div class="cart-number d-flex justify-content-center align-items-center" v-if="cartTotalQty !== 0">
              <div
                class="bg-800 text-white py-0 rounded-1 cart-number-icon-size d-flex justify-content-center align-items-center">
                <span v-if="!status.isAddLoading" class="cart-number-font-size">{{
                  cartTotalQty
                }}</span>
                <div v-else class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="col-4 col-xl-4 d-flex justify-content-center align-items-center">
      <div class="dropdown">
        <button class="btn btn-sm border-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
          <img src="@/assets/img/icons/person.svg" alt="person" class="icon-size">
        </button>
        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item" to="/user/orders">查詢訂單</router-link>

          <router-link class="dropdown-item" to="/user/info">會員資料</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Dropdown from 'bootstrap/js/dist/dropdown.js';
import Tooltip from 'bootstrap/js/dist/tooltip.js';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cartStore.js';
import statusStore from '@/stores/statusStore';

const cartStore = useCartStore();
const { getCart } = cartStore;
const { cartTotalQty } = storeToRefs(cartStore);
const status = statusStore();

getCart(true);

onMounted(() => {
  let dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdownElementList.map(function (dropdownToggleEl) {
    return new Dropdown(dropdownToggleEl);
  });
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
  });
});
</script>

<style scoped>
.cart-number {
  position: absolute;
  top: -50%;
  right: -0.875rem;
}

.cart-number-font-size {
  font-size: clamp(0.875rem, 0.85rem + 0.125vw, 1rem);
}

.cart-number-icon-size {
  width: clamp(1rem, 0.975rem + 0.125vw, 1.125rem);
  height: clamp(1rem, 0.975rem + 0.125vw, 1.125rem);
}

.nav-link:hover {
  opacity: 0.8;
}

.spinner-border-sm {
  --bs-spinner-width: 0.6rem;
  --bs-spinner-height: 0.6rem;
  --bs-spinner-border-width: 0.15rem;
}
</style>
