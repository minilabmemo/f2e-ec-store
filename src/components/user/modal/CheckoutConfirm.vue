<template>
  <div class="modal fade" id="CheckoutConfirm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary   text-white">
          <h5 class="modal-title">
            即將進行結帳

          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div> 數量 {{ 0 }} 件，金額 {{ item.total }}</div>
          <span>進入結帳流程，請勿關閉畫面。</span>
          <code>*此為作業模擬流程，並不會真的結帳。</code>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="goOrderPage">稍後付款
          </button>
          <button type="button" class="btn btn-primary text-white" @click="$emit('pay-order')">結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import modalMixin from "@/utils/mixins/modalMixin"
export default {
  props: {
    item: {},
  },
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
  methods: {
    goOrderPage() {
      this.$router.push('/user/orders')
    }
  },
};
</script>