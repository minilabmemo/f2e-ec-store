<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav m-auto ">
          <li class="nav-item mx-2" v-for="item in categories" :key="item">
            <router-link :to="`/product/${item.category}`" class="nav-link">
              <h3>{{ item.name }} </h3>
            </router-link>
            <!--TODO active & href <a class="nav-link active" aria-current="page" href="#">Home</a> -->
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