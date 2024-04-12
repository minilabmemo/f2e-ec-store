<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from '@/components/ToastCard.vue';
import statusStore from '@/stores/statusStore';
import {mapState} from 'pinia';
export default {
  components: {Toast},
  computed: {
    ...mapState(statusStore, ["messages"])
  }
};
</script>