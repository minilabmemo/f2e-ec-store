<template>
  <div>
    <Navbar />
    <div class="container-fluid ">
      <ToastMessages />
      <RouterView />
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/admin/ManageNavbar.vue';

import ToastMessages from '@/components/ToastMessages.vue';
import statusStore from '@/stores/statusStore';
import {mapActions} from 'pinia'
export default {

  components: {Navbar, ToastMessages},

  methods: {
    ...mapActions(statusStore, ['pushMessage']),
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)defToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    this.axios.defaults.headers.common['Authorization'] = token
    const url = `${import.meta.env.VITE_API}/${import.meta.env.VITE_PATH}/api/user/check`

    this.axios.post(url, this.user).then((response) => {
      this.pushMessage({title: '登入', response: response});

      if (!response.data.success) {
        this.$router.push('/login')
      }

    })
  },
}
</script>
