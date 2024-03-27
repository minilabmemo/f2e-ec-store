<template>

  <nav class="navbar navbar-expand-lg position-relative" aria-label="Offcanvas navbar large">
    <div class="container-fluid ">
      <div class="container-lg d-lg-none ">
        <div class="row gy-2    justify-content-center  align-items-center  ">
          <div class="col-3 col-sm-2">
            <button class="navbar-toggler btn-sm" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="col-9 col-sm-4 justify-content-center  align-items-center">
            <HomeLogo></HomeLogo>
          </div>

          <div class="col-12 col-sm-5  justify-content-center  align-items-center">
            <UserNav></UserNav>
          </div>
        </div>

      </div>





      <div class=" offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header ">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">登入/註冊</h5>
          <button type="button" class="btn btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body   ">
          <CATNav v-if="isCollapsed"></CATNav>
          <ul class="navbar-nav  mx-auto   d-flex  align-items-center   justify-content-center" v-else>
            <li class="nav-item mx-2 " v-for="(item, key) in categories" :key="item.name">
              <router-link :to="`/product/${key}/all`" class="nav-link "
                :class="{ active: $route.params.category === key }" aria-current="page">
                <div class="d-flex flex-column  align-items-center ">
                  <div class=""> {{ item.name }}</div>
                  <img src="@/assets/icons/nav.svg" alt="nav" v-if="$route.params.category === key" width="12px"
                    height="12px">
                </div>
              </router-link>
            </li>

          </ul>
          <form class="row g-2 justify-content-center align-items-center " :class="formClasses" role="search">
            <div class="col-9"> <input class="form-control form-control-sm   " type="search" placeholder="關鍵字搜尋"
                aria-label="Search"></div>
            <div class="col-auto"> <button class="btn btn-outline-primary btn-sm" type="submit"><i
                  class="bi bi-search"></i></button></div>
          </form>

        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import categories from '@/utils/const/categories'
import Collapse from 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/offcanvas';
import HomeLogo from '@/components/user/HomeLogo.vue';
import CATNav from '@/components/user/CATNav.vue'
import UserNav from '@/components/user/UserNav.vue';

export default {
  components: {HomeLogo, CATNav, UserNav},

  data() {
    return {

      categories: categories,
      isCollapsed: false
    }
  },
  computed: {
    formClasses() {
      return {
        'position-absolute': !this.isCollapsed,
        'end-0': !this.isCollapsed,
        "top-50": !this.isCollapsed,
        "translate-middle-y": !this.isCollapsed
      };
    }
  },
  created() {
    console.log('createdHomeNav', this.products);

  },

  mounted() {

    var myOffcanvas = document.getElementById('offcanvasNavbar')
    myOffcanvas.addEventListener('hide.bs.offcanvas', () => {
      this.isCollapsed = false;
      console.log('this.isCollapsed', this.isCollapsed);
    });

    myOffcanvas.addEventListener('show.bs.offcanvas', () => {
      this.isCollapsed = true;
      console.log('this.isCollapsed', this.isCollapsed);
    });


  },
}
</script>
