<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav mx-auto d-flex  align-items-center   justify-content-center ">
          <li class="nav-item mx-2 " v-for="item in categories" :key="item.name">
            <router-link :to="`/product/${item.category}`" class="nav-link "
              :class="{ active: page_category === item.category }" aria-current="page">
              <div class="d-flex flex-column  align-items-center ">
                <div class=""> {{ item.name }}</div>
                <img src="@/assets/icons/nav.svg" alt="nav" v-if="page_category === item.category" width="12px"
                  height="12px">
              </div>
            </router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>



</template>

<script>
import categories from '@/utils/const/categories'

export default {

  data() {
    return {
      categories: categories,

    }
  },
  computed: {
    page_category() {
      return this.$route.params.category
    }
  }


}
</script>


<style lang="css" scoped></style>