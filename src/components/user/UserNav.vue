<template>

  <div class="w-100 row   justify-content-center  align-items-center">
    <div class="col-1 col-xl-2     d-flex justify-content-center  align-items-center">
      <router-link to="/user/saves" class="nav-link " data-bs-toggle="tooltip" data-bs-placement="top" title="前往收藏清單">
        <img src="@/assets/img/icons/save.svg" alt="save" class="icon-size">
      </router-link>
    </div>
    <div class="col-1   d-flex justify-content-center  align-items-center p-0 ">
      <img src="@/assets/img/icons/split.svg" alt="split" class="icon-size">
    </div>
    <div class="col-4  col-xl-4   ">

      <div class="row  justify-content-center  align-items-center">
        <router-link to="/user/cart/flow" class="col-12 nav-link " data-bs-toggle="tooltip" data-bs-placement="top"
          title="前往購物車">
          <div class="row justify-content-center  align-items-center ">
            <div class="col-4  d-flex justify-content-center  align-items-center">
              <img src="@/assets/img/icons/cart.svg" class="icon-size" alt="cart">
            </div>

            <div class="col-4 d-flex justify-content-center  align-items-center">
              <div
                class=" bg-black text-white  py-1  rounded-1 icon-size d-flex justify-content-center  align-items-center">
                <span v-if="!status.isGetCartLoading" class="icon-font-size mx-2 ">{{ cartTotalQty }}</span>
                <div v-else class="spinner-border spinner-border-sm mx-1" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

            </div>
          </div>
        </router-link>
      </div>

    </div>
    <div class="col-1   d-flex justify-content-center  align-items-center  p-0 ">
      <img src="@/assets/img/icons/split.svg" alt="split" class="icon-size">
    </div>
    <div class="col-1  col-xl-2  d-flex justify-content-center  align-items-center">
      <div class=" dropdown">
        <button class="btn  btn-sm    dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
          <img src="@/assets/img/icons/person.svg" alt="person" class="icon-size">
        </button>
        <div class="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item text-800 " to="/user/orders">查詢訂單</router-link>

          <router-link class="dropdown-item text-800 " to="/user/info">會員資料</router-link>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Dropdown from 'bootstrap/js/dist/dropdown.js';
import Tooltip from 'bootstrap/js/dist/tooltip.js';
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore.js'
const cartStore = useCartStore();
const { getCart } = cartStore;
const { status, cartTotalQty } = storeToRefs(cartStore);
getCart()

onMounted(() => {
  let dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  dropdownElementList.map(function (dropdownToggleEl) {
    return new Dropdown(dropdownToggleEl)
  })
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl)
  })
})

</script>
