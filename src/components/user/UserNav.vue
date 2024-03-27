<template>
  <div class="row   w-100 justify-content-center  align-items-center">
    <div class="col-1 col-md-2     d-flex justify-content-center  align-items-center">
      <router-link to="/user/saves" class="nav-link "> <img src="@/assets/icons/save.svg" alt="save" width="24px"
          height="24px">
      </router-link>
    </div>
    <div class="col-1   d-flex justify-content-center  align-items-center">
      <img src="@/assets/icons/split.svg" alt="split" width="24px" height="24px">
    </div>
    <div class="col-3  col-md-2   ">

      <div class="row  justify-content-center  align-items-center">
        <router-link to="/user/cartflow" class="col-12 nav-link ">
          <div class="row justify-content-center  align-items-center ">
            <div class="col-3 col-md-4  d-flex justify-content-center  align-items-center"> <img
                src="@/assets/icons/cart.svg" alt="cart" width="24px" height="24px"></div>

            <div class="col-3 col-md-4 d-flex justify-content-center  align-items-center">
              <div class=" bg-black text-white  px-2 py-0  rounded-1 " width="24px" height="24px">
                <span v-if="!isGetCartLoading" class=" ">{{ cartTotalQty }}</span>
                <div v-else class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

            </div>
          </div>
        </router-link>
      </div>



    </div>
    <div class="col-1   d-flex justify-content-center  align-items-center">
      <img src="@/assets/icons/split.svg" alt="split" width="24px" height="24px">
    </div>
    <div class="col-1  col-md-2  d-flex justify-content-center  align-items-center">


      <div class=" dropdown">
        <button class="btn  btn-sm    dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
          <img src="@/assets/icons/person.svg" alt="person" width="24px" height="24px">
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
