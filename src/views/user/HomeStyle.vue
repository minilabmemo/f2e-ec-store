<template>
  <div class="container p-5 ">
    <div class="waterfall  w-full m-auto  gap-10">
      <HomeStyleContent />
    </div>
  </div>
</template>

<script>

import HomeStyleContent from './HomeStyleContent.vue';

export default {
  components: {
    HomeStyleContent
  }
}
</script>

<style scoped>
.waterfall {
  columns: 4;
  gap: 2.5rem;
}

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
