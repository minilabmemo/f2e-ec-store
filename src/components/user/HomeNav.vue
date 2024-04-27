<template>

  <nav class="navbar navbar-expand-lg position-relative" aria-label="Offcanvas navbar large">
    <div class="container-fluid px-0 ">
      <div class="container-lg d-lg-none p-0 nav-bar-for-small">
        <div class="row     justify-content-between   align-items-center  g-0">
          <div class="col-2 col-sm-3 d-flex  justify-content-start ">
            <button class="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
              style="--bs-btn-padding-y: .1rem; --bs-btn-padding-x: .2rem; --bs-btn-font-size: .50rem;">
              <span class="navbar-toggler-icon" style="height: 1.2rem;width: 1.2rem;"></span>
            </button>
          </div>
          <div class="col-4 col-sm-3 d-flex justify-content-center  align-items-center ">
            <HomeLogo />
          </div>
          <div class="col-6 col-sm-6  d-flex justify-content-end  align-items-center" id="device-sm-location">
            <!-- <for teleport> -->
          </div>
        </div>

      </div>
      <div class=" offcanvas offcanvas-start " tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header ">
          <button type="button" class="btn btn-close m-0  " data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <h5 class="offcanvas-title ms-auto " id="offcanvasNavbarLabel">登入/註冊</h5>

        </div>
        <div class="offcanvas-body   ">
          <div class="row g-2 justify-content-start align-items-center " :class="searchClasses" role="search">
            <div class="col-6 col-mg-9"> <input class="form-control form-control-sm   " type="search"
                placeholder="關鍵字搜尋" aria-label="Search" v-model="keyword" @keyup.enter="search"></div>
            <div class="col-auto">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="search"><i
                  class="bi bi-search"></i></button>
            </div>
          </div>
          <CATNav v-if="isCollapsed" />
          <ul class="navbar-nav  mx-auto   d-flex  align-items-center   justify-content-center  " v-else>
            <li class="nav-item mx-1 mx-xl-2   " v-for="(item, key) in categories" :key="item.name">
              <router-link :to="`/product/${key}/all`" class="nav-link "
                :class="{ active: $route.params.category === key }" aria-current="page">
                <div class="d-flex flex-column  align-items-center ">
                  <div class=""> {{ item.name }}</div>
                  <img src="@/assets/img/icons/nav.svg" alt="nav" v-if="$route.params.category === key" width="0.75rem"
                    height="0.75rem">
                </div>
              </router-link>
            </li>
            <li class="nav-item mx-1 mx-xl-2  ">
              <router-link :to="`/style`" class="nav-link " :class="{ active: $route.path === '/style' }"
                aria-current="page">
                <div class="d-flex flex-column  align-items-center ">
                  <div class=""> Styles</div>
                  <img src="@/assets/img/icons/nav.svg" alt="nav" v-if="$route.path === '/style'" width="0.75rem"
                    height="0.75rem">
                </div>
              </router-link>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import categories from '@/utils/config/categories'
import 'bootstrap/js/dist/collapse';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import HomeLogo from '@/components/user/HomeLogo.vue';
import CATNav from '@/components/user/CategoriesNav.vue'

export default {
  components: {HomeLogo, CATNav},

  data() {
    return {
      keyword: "",
      categories: categories,
      isCollapsed: false,
      bsOffcanvas: {},
    }
  },
  methods: {
    search() {
      if (this.keyword == "") {
        alert("請輸入關鍵字")
      } else {
        this.$router.push(`/product/all/all/keyword/${this.keyword}`)
      }

    },
    handleOffcanvasHide() {
      this.isCollapsed = false;

    },
    handleOffcanvasShow() {
      this.isCollapsed = true;

    }
  },
  computed: {
    searchClasses() {
      return {
        'position-absolute': !this.isCollapsed,
        'end-0': !this.isCollapsed,
        "top-50": !this.isCollapsed,
        "translate-middle-y": !this.isCollapsed
      };
    }
  },
  mounted() {

    let myOffcanvas = document.getElementById('offcanvasNavbar')
    if (myOffcanvas) {
      this.bsOffcanvas = new Offcanvas(myOffcanvas, {
        toggle: false
      })
      myOffcanvas.addEventListener('hide.bs.offcanvas', this.handleOffcanvasHide);

      myOffcanvas.addEventListener('show.bs.offcanvas', this.handleOffcanvasShow);
    }

  },
  unmounted() {
    const myOffcanvas = document.getElementById('offcanvasNavbar');
    if (myOffcanvas) {
      myOffcanvas.removeEventListener('hide.bs.offcanvas', this.handleOffcanvasHide);
      myOffcanvas.removeEventListener('show.bs.offcanvas', this.handleOffcanvasShow);
    }
  },

  watch: {
    '$route'(to, from) {
      if (to.path !== from.path) {
        this.bsOffcanvas.hide()
      }
    }
  }
}

</script>
@/utils/config/categories