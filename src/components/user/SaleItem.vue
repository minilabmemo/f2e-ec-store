<template>

  <div class=" ">
    <router-link :to="`/product/${path}/id/${item.id}`" class="nav-link h-100 ">
      <div class="d-flex flex-column gap-4   align-self-center  h-100">
        <img :src="item.imageUrl" alt="image" class="flex-image">
        <div class="text-center d-flex flex-column    justify-content-between   h-100">
          <h4 style="" class=" "> {{ item.title }}</h4>
          <div class="d-flex gap-2 justify-content-center  align-items-baseline mb-3 mt-auto ">

            <span class="text-300" v-show="item.price !== item.origin_price"> <del>${{
      $filters.currency(item.origin_price)
    }}</del></span>
            <span class="price me-4 ">${{ $filters.currency(item.price) }}</span>
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