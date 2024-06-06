<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">清空購物車</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>確認是否將 {{ cartTotalQty }} 件商品全部移出購物車</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('remove-items')">
            清空購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModal } from '@/composables/useModal';

defineProps<{
  cartTotalQty: number;
}>();
const modal = ref(null);

const { showModal, hideModal } = useModal(modal);
defineExpose({
  showModal,
  hideModal
});
</script>
