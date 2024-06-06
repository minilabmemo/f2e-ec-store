<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="msg in messages" :key="msg.title" :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import Toast from '@/components/ToastCard.vue';
import statusStore from '@/stores/statusStore';
import { storeToRefs } from 'pinia';
const { messages } = storeToRefs(statusStore());
</script>
