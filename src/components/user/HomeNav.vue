<template>

  <nav class="navbar navbar-expand-lg" aria-label="Offcanvas navbar large">
    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">登入/註冊</h5>
          <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container position-relative ">

          <ul class="navbar-nav  mx-auto   d-flex  align-items-center   justify-content-center">
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
            <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="ture">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> -->
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
import CATNav from '@/components/user/CATNav.vue'
//import getAllProducts from '@/utils/mixins/getProductsAll';
export default {

  data() {
    return {
      //   products: [],
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
  // mixins: [getAllProducts],
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
    console.log('this.isCollapsed', this.isCollapsed);
    // var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
    // var collapseList = collapseElementList.map(function (collapseEl) {
    //   return new Collapse(collapseEl, {
    //     toggle: false
    //   })
    // })
  },
}
</script>
