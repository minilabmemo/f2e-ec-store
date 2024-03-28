<template>

  <div class="d-flex flex-column gap-3  ">
    <router-link :to="`/product/${path}/id/${item.id}`" class="nav-link   ">
      <div class="d-flex flex-column gap-3  ">
        <img :src="item.src" alt="image" class="flex-image">
        <div class="text-center ">
          <h4> {{ item.title }}</h4>
          <div class="d-flex gap-2 justify-content-center  align-items-center ">
            <span class="text-300"> <del>${{ item.origin_price }}</del></span>
            <span class="price me-4 ">${{ item.price }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>

</template>


<script>
export default {
  props: {
    filterErr: String,
    item: {title: "no name"},
    path: String,


  },



}
</script>

<style scoped>
.primary {
  color: var(--bs-primary);
}

.secondary {
  color: var(--bs-secondary);
}

.orange {
  color: var(--bs-orange-200);
}

.gray {
  color: var(--bs-gray-300);
}




.flex-image {
  object-fit: cover;
  aspect-ratio: 3/4;
  width: 100%;
  height: auto;
}
</style>