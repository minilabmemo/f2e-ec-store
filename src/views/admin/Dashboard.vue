<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid ">
      <ToastMessages></ToastMessages>
      <RouterView />
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/admin/Navbar.vue';
import emitter from "@/utils/methods/emitter";
import ToastMessages from '@/components/ToastMessages.vue';
export default {
  inject: ['httpMessageState'],
  components: {Navbar, ToastMessages},
  provide() {
    return {emitter};
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)defToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    this.axios.defaults.headers.common['Authorization'] = token
    const url = `${import.meta.env.VITE_API}/${import.meta.env.VITE_PATH}/api/user/check`

    this.axios.post(url, this.user).then((response) => {
      this.httpMessageState(response, '登入');
      if (!response.data.success) {
        this.$router.push('/login')
      }

    })
  },
}
</script>
