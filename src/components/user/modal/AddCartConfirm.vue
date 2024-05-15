<template>
  <div class="modal fade" id="AddCartConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary   text-white">
          <h5 class="modal-title">
            是否加入相同商品

          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>你的購物車已有相同商品，是否繼續加入 {{ item.title }} - 數量 {{ item.qty }} 件</div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"
            @click="$emit('go-carts')">否，維持數量
          </button>
          <button type="button" class="btn btn-primary " @click="$emit('add-item')">是，新增商品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useModal} from '@/composables/useModal'
defineProps({
  item: Object,
});
const modal = ref(null)

const {showModal, hideModal} = useModal(modal);
defineExpose({
  showModal, hideModal
})
</script>
