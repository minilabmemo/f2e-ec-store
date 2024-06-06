<template>
  <div class="modal fade" id="CheckoutConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">即將進行結帳</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>數量 {{ productsNum }} 件，金額 {{ item.total }}</div>
          <span>請點擊確認結帳，進入結帳流程後，請勿關閉畫面。</span>
          <div><code>*此為作業模擬結帳流程，並不會真的進入結帳。</code></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="goOrderPage">
            稍後付款
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('pay-order')">確認結帳</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useModal } from '@/composables/useModal';
import { useRouter } from 'vue-router';
import type { Order } from '@/utils/type';

const router = useRouter();

const props = defineProps<{
  item: Order;
}>();

const modal = ref(null);

const { showModal, hideModal } = useModal(modal);
defineExpose({
  showModal,
  hideModal
});

function goOrderPage() {
  router.push('/user/orders');
}
const productsNum = computed(() => {
  let cum = 0;
  if (props.item && props.item.products) {
    for (const value of Object.values(props.item.products)) {
      cum = cum + value.qty;
    }
  }
  return cum;
});
</script>
