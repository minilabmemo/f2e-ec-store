<template>
  <div class="container-xl mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
            v-model="user.username" />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
            v-model="user.password" />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login() {

      const url = `${import.meta.env.VITE_API}/${import.meta.env.VITE_PATH}/admin/signin`
      console.log("login", url)
      this.axios.post(url, this.user).then((response) => {
        if (response.data.success) {
          const {token, expired} = response.data;
          document.cookie = `defToken=${token}; expires=${new Date(expired)}`;
          console.log(response.data)
          this.$router.push('/admin/dashboard/products')
        }

      })

    }
  },
}
</script>