<script setup lang="ts">
import { RouterView } from 'vue-router'

import { onMounted } from 'vue'

onMounted(() => {
  console.log(import.meta.env.VITE_API)
})
</script>


<template>
  <RouterView />
</template>
