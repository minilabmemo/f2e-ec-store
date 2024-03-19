<template>

  <div class="d-flex flex-column gap-3  ">


    <img :src="item.src" alt="image" class="rwd-image">



    <div>



      {{ item.title }}


    </div>

    <div class="price"></div>
  </div>
</template>


<script>
//TODO <div class="text-primary ">[後端服務出現問題，請洽客服人員] </div>
export default {
  props: {
    filterErr: String,
    item: {title: "no name"},

  },
  inject: ["status"],
  created() {
    console.log("product filterErr", this.filterErr)
  },
  update() {
    console.log("product isLoading", this.status.isLoading)

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




.rwd-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}
</style>