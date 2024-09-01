<template>
  <nav class="navbar navbar-expand-lg position-relative" aria-label="Offcanvas navbar large">
    <div class="container-fluid px-0">
      <div class="container-lg d-lg-none p-0 nav-bar-for-small">
        <div class="row justify-content-between align-items-center g-0">
          <div class="col-2 col-sm-3 d-flex justify-content-start">
            <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar" aria-label="Toggle navigation" style="
                --bs-btn-padding-y: 0.1rem;
                --bs-btn-padding-x: 0.2rem;
                --bs-btn-font-size: 0.5rem;
              ">
              <span class="navbar-toggler-icon" style="height: 1.2rem; width: 1.2rem"></span>
            </button>
          </div>
          <div class="col-4 col-sm-3 d-flex justify-content-center align-items-center">
            <HomeLogo />
          </div>
          <div class="col-6 col-sm-6 d-flex justify-content-end align-items-center" id="device-sm-location">
            <!-- <for teleport> -->
          </div>
        </div>
      </div>
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <button type="button" class="btn btn-close m-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <h5 class="offcanvas-title ms-auto" id="offcanvasNavbarLabel">登入/註冊</h5>
        </div>
        <div class="offcanvas-body">
          <div class="row g-2 justify-content-start align-items-center" :class="searchClasses" role="search">
            <div class="col-9">
              <input class="form-control form-control-sm" type="search" placeholder="關鍵字搜尋" aria-label="Search"
                v-model="keyword" @keyup.enter="search">
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="search">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <CATNav v-if="isCollapsed" />
          <ul class="navbar-nav mx-auto d-flex align-items-center justify-content-center" v-else>
            <li class="nav-item mx-1 mx-xl-2" v-for="(item, key) in categories" :key="item.name">
              <router-link :to="`/product/${key}/all`" class="nav-link"
                :class="{ active: $route.params.category === key }" aria-current="page">
                <div class="d-flex flex-column align-items-center">
                  <div>{{ item.name }}</div>
                  <img src="@/assets/img/icons/nav.svg" alt="nav" v-if="$route.params.category === key" width="0.75rem"
                    height="0.75rem">
                </div>
              </router-link>
            </li>
            <li class="nav-item mx-1 mx-xl-2">
              <router-link :to="`/style`" class="nav-link" :class="{ active: $route.path === '/style' }"
                aria-current="page">
                <div class="d-flex flex-column align-items-center">
                  <div>Styles</div>
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

<script setup lang="ts">
import categories from '@/utils/config/categories';
import 'bootstrap/js/dist/collapse';
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import HomeLogo from '@/components/user/HomeLogo.vue';
import CATNav from '@/components/user/CategoriesNav.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const keyword = ref('');
const isCollapsed = ref(false);
const bsOffcanvas = ref<Offcanvas | null>(null);
watch(
  () => route.path,
  () => {
    bsOffcanvas.value?.hide();
  }
);

const search = () => {
  if (keyword.value === '') {
    alert('請輸入關鍵字');
  } else {
    router.push(`/product/all/all/keyword/${keyword.value}`);
  }
};

const handleOffcanvasHide = () => {
  isCollapsed.value = false;
};

const handleOffcanvasShow = () => {
  isCollapsed.value = true;
};

const searchClasses = computed(() => ({
  'position-absolute': !isCollapsed.value,
  'end-0': !isCollapsed.value,
  'top-50': !isCollapsed.value,
  'translate-middle-y': !isCollapsed.value
}));

onMounted(() => {
  const myOffcanvas = document.getElementById('offcanvasNavbar');
  if (myOffcanvas) {
    bsOffcanvas.value = new Offcanvas(myOffcanvas);
    myOffcanvas.addEventListener('hide.bs.offcanvas', handleOffcanvasHide);
    myOffcanvas.addEventListener('show.bs.offcanvas', handleOffcanvasShow);
  }
});

onUnmounted(() => {
  const myOffcanvas = document.getElementById('offcanvasNavbar');
  if (myOffcanvas) {
    myOffcanvas.removeEventListener('hide.bs.offcanvas', handleOffcanvasHide);
    myOffcanvas.removeEventListener('show.bs.offcanvas', handleOffcanvasShow);
  }
});
</script>
