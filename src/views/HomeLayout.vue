<template>
  <ToastMessages></ToastMessages>
  <div class="tenor-sans-regular ">
    <header class="h-shadow mb-4">

      <div class="d-flex justify-content-center  mb-2 container  ">

        <div class="mx-auto  ">
          <router-link to="/">
            <div class="img-fluid "><img src="@/assets/icons/logo_home.svg" alt="Logo"></div>
          </router-link>
        </div>


        <div class="align-self-end ">
          <div class="d-flex">
            <img src="@/assets/icons/save.svg" alt="save">
            <img src="@/assets/icons/split.svg" alt="split">
            <div class="d-flex gap-2 justify-content-center  align-items-center ">
              <router-link to="/product/cart" class="nav-link ">
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
              <div class="dropdown-menu dropdown-menu-dark " aria-labelledby="dropdownMenuButton">
                <router-link class="dropdown-item" to="/user/orders">查詢訂單</router-link>
                <li> <a class="dropdown-item" href="#">會員資料</a></li>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="  border-bottom   "></div>
      <HomeNav></HomeNav>
    </header>
    <div class="container">
      <RouterView />

    </div>
    <footer class="bg-orange-100 container-fluid p-5 text-gray-500 ">
      <div class="container">
        <div class=" row d-flex justify-content-center ">
          <div class="col-4 d-flex flex-column  gap-2 ">
            <div class="row row-cols-2 g-1 gy-3 ">
              <div class="col">公司資訊</div>
              <div class="col">售後服務</div>
              <div class="col">品牌介紹</div>
              <div class="col">常見問題</div>
            </div>


          </div>
          <div class="col-4">
            <div class="w-75 ">客服時間：上午 10:30~12:00, 下午 13:30~18:00（例假日休息）</div>
          </div>
          <div class="col-4">
            <div>星展區，時尚大道 88 號，韓星大樓 3 樓</div>
            <div>(02) 888-5678</div>
            <div>koringoffice@line.tw </div>
          </div>

        </div>
      </div>




    </footer>
  </div>
</template>



<script>

import categories from '@/utils/const/categories'
import getCart from '@/utils/mixins/getCart';
import HomeNav from '@/components/user/HomeNav.vue';
import {computed} from 'vue'
import emitter from "@/utils/methods/emitter";
import ToastMessages from '@/components/ToastMessages.vue';
import Dropdown from 'bootstrap/js/dist/Dropdown';
export default {
  components: {HomeNav, ToastMessages},
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
</style>
