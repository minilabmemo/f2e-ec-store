<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toastRef">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from 'bootstrap/js/dist/toast';
import { onMounted, ref, type Ref } from 'vue';

const { msg } = defineProps<{
  msg: {
    title: string;
    style: string;
    content: string;
  };
}>();

const toastRef: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  if (toastRef.value) {
    const toastEl = toastRef.value;
    const toast = new Toast(toastEl, {
      delay: 2000
    });
    toast.show();
  }
});
</script>
