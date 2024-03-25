<template>
  <ToastMessages></ToastMessages>
  <div class="tenor-sans-regular   ">
    <header class="h-shadow mb-4 col" id="header">

      <div class="d-flex justify-content-center  mb-2 container  position-relative ">
        <div class="mx-auto  ">
          <router-link to="/">
            <div class="img-fluid " id="logo"><img src="@/assets/icons/logo_home.svg" alt="Logo"></div>
          </router-link>
        </div>


        <div class="position-absolute  end-0 bottom-0  ">
          <div class="d-flex align-items-center ">
            <router-link to="/user/saves"> <img src="@/assets/icons/save.svg" alt="save"> </router-link>
            <img src="@/assets/icons/split.svg" alt="split">
            <div class="d-flex gap-2 justify-content-center  align-items-center ">
              <router-link to="/user/cartflow" class="nav-link ">
                <div class="d-flex gap-2 justify-content-center  align-items-center ">
                  <img src="@/assets/icons/cart.svg" alt="cart">
                  <div class="bg-black text-white px-2 py-0  rounded-1  ">
                    <span v-if="!isGetCartLoading">{{ cartTotalQty }}</span>
                    <div v-else class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- TODO show tooltip-->

            <img src="@/assets/icons/split.svg" alt="split">

            <div class="dropdown">
              <button class="btn      dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                <img src="@/assets/icons/person.svg" alt="person">
              </button>
              <div class="dropdown-menu  " aria-labelledby="dropdownMenuButton">
                <router-link class="dropdown-item text-800 " to="/user/orders">查詢訂單</router-link>
                <li> <a class="dropdown-item text-800 " href="#">會員資料</a></li>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="  border-bottom   "></div>
      <HomeNav></HomeNav>
    </header>
    <div class="container " id="content">
      <RouterView />
    </div>
    <HomeFooter></HomeFooter>
  </div>
</template>



<script>

import categories from '@/utils/const/categories'
import getCart from '@/utils/mixins/getCart';
import HomeNav from '@/components/user/HomeNav.vue';
import {computed} from 'vue'
import emitter from "@/utils/methods/emitter";
import ToastMessages from '@/components/ToastMessages.vue';
import HomeFooter from '@/components/HomeFooter.vue';
import Dropdown from 'bootstrap/js/dist/dropdown.js';
export default {
  components: {HomeNav, ToastMessages, HomeFooter},
  provide() {
    return {
      emitter,
      dataCart: computed(() => this.cart)
    };
  },
  mounted() {
    emitter.on('update-cartQty', () => {
      this.getCart();
    });
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl)
    })
  },

  data() {
    return {
      categories: categories,
      cartTotalQty: 0,
      cart: {}
    }
  },
  mixins: [getCart],

  created() {
    this.getCart();
  },
  watch: {
    cart(newCart, oldCart) {
      console.log('watch newCart', newCart);
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

<style scoped>
.h-shadow {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
}

#content {
  min-height: 60vh;
}
</style>
