<template>
  <div class="container p-5 d-flex flex-column align-items-center ">
    <h3 class="text-center ">STYLING BOOK</h3>
    <div class="text-center text-500 mb-5 "> 時尚顧問穿搭牆，提供給您滿滿穿搭靈感。</div>

    <HomeStyleContent />

  </div>
</template>

<script>

import HomeStyleContent from '@/components/user/HomeStyleContent.vue';

export default {
  components: {
    HomeStyleContent
  }
}
</script>

<style scoped>
.bg-cyan-100 {
  background-color: #f0f5f5;
}

.box-border {
  box-sizing: border-box;
}

.text-center {
  text-align: center;
}

.m-1 {
  margin: 0.25rem;
}

.p-5 {
  padding: 1.25rem;
}

.break-inside-avoid {
  break-inside: avoid;
}

.item {
  display: inline-block;
}

.w-full {
  width: 100%;
}

.object-cover {
  object-fit: cover;
}

.object-center {
  object-position: center;
}
</style>
