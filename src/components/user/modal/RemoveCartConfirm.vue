<template>
  <div class="modal fade" id="RemoveCartConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary   text-white">
          <h5 class="modal-title">
            是否移出商品

          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="item.product">確認是否將 <span class="text-primary">{{ item.product.title }}</span> 移出購物車？</div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary " @click="$emit('remove-item', item.id)">移出購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'
defineProps<{
  item: {
    product: {
      title: string;
    };
    id: string;
  };
}>();

const modal = ref(null)

const { showModal, hideModal } = useModal(modal);
defineExpose({
  showModal, hideModal
})
</script>