<template>
  <div>
    <ManageNavbar />
    <div class="container-fluid">
      <ToastMessages />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ManageNavbar from '@/components/admin/ManageNavbar.vue';

import ToastMessages from '@/components/ToastMessages.vue';
import { useRouter } from 'vue-router';
import { loginCheckApi } from '@/utils/config/path';
import fetchAct from '@/utils/methods/fetchAct';

const token = document.cookie.replace(/(?:(?:^|.*;\s*)defToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
const router = useRouter();
const url = loginCheckApi;

fetchAct.post(url, null, { msgTitle: '登入', token: token }).then((response: any) => {
  if (!response.success) {
    router.push('/login');
  }
});
</script>
