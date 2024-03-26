<template>
  <div class="d-flex justify-content-center  align-items-center">
    <div class="">
      <router-link to="/user/saves"> <img src="@/assets/icons/save.svg" alt="save" weight="24px"> </router-link>
    </div>
    <div class="">
      <img src="@/assets/icons/split.svg" alt="split">
    </div>
    <div class="d-flex justify-content-center  align-items-center">

      <router-link to="/user/cartflow" class="nav-link ">
        <div class="d-flex gap-2 justify-content-center  align-items-center ">
          <img src="@/assets/icons/cart.svg" alt="cart">
          <div class="bg-black text-white px-2 py-0  rounded-1  ">
            <span v-if="!isGetCartLoading" class=" ">{{ cartTotalQty }}</span>
            <div v-else class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </router-link>

    </div>
    <div class="">
      <img src="@/assets/icons/split.svg" alt="split">
    </div>
    <div class="">
      <div class="dropdown">
        <button class="btn      dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
          <img src="@/assets/icons/person.svg" alt="person">
        </button>
        <div class="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item text-800 " to="/user/orders">查詢訂單</router-link>
          <li> <a class="dropdown-item text-800 " href="#">會員資料</a></li>

        </div>
      </div>
    </div>
  </div>
  <!-- TODO show tooltip-->

</template>

<script>


import Dropdown from 'bootstrap/js/dist/dropdown.js';
export default {
  inject: ['httpMessageState', 'dataCart', 'isGetCartLoading'],

  mounted() {

    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl)
    })
  },

  data() {
    return {
      cartTotalQty: 0,
      cart: {}
    }
  },

  watch: {
    dataCart(newCart, oldCart) {
      this.cartTotalQty = 0;
      if (newCart.carts) {
        newCart.carts.forEach(element => {
          this.cartTotalQty = this.cartTotalQty + element.qty
        });
      }
    }
  },


}
</script>
