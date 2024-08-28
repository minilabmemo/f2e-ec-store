<template>
  <div class="container-xl mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required
            v-model="user.username">
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
            v-model="user.password" autocomplete="on">
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from '@/utils/config/path';
import { useRouter } from 'vue-router';
import fetchAct from '@/utils/methods/fetchAct';
import { ref } from 'vue';
const user = ref({
  username: null,
  password: null
});
interface loginResponse {
  success: boolean;
  uid: string;
  token: string;
  expired: string;
  message?: string;
}
const router = useRouter();
function login() {
  const url = loginApi;
  fetchAct.post<loginResponse>(url, user.value).then((response) => {
    if (response.success) {
      const { token, expired } = response;
      document.cookie = `defToken=${token}; expires=${new Date(expired)}`;

      router.push('/admin/dashboard/products');
    }
  });
}
</script>
