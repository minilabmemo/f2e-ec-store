<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">範例作品</a>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/dashboard/products" class="nav-link">產品</router-link>
          <router-link to="/admin/dashboard/orders" class="nav-link">訂單</router-link>
          <router-link to="/admin/dashboard/coupons" class="nav-link">優惠券</router-link>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { logoutApi } from '@/utils/config/path';
import fetchAct from '@/utils/methods/fetchAct';
import { useRouter } from 'vue-router';
import type { CommonResponse } from '@/utils/type';

const router = useRouter();
function logout() {
  const url = logoutApi;
  fetchAct.post<CommonResponse>(url, null).then((res) => {
    if (res.success) {
      router.push('/login');
    }
  });
}
</script>
