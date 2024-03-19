<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav mx-auto d-flex  align-items-center   justify-content-center ">
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



}
</script>


<style lang="css" scoped></style>