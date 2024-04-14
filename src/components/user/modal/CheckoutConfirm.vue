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
          <div> 數量 {{ productsNum }} 件，金額 {{ item.total }}</div>
          <span>請點擊確認結帳，進入結帳流程後，請勿關閉畫面。</span>
          <div> <code>*此為作業模擬結帳流程，並不會真的進入結帳。</code></div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="goOrderPage">稍後付款
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('pay-order')">確認結帳
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
    item: {total: 0},

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
  computed: {
    productsNum() {

      let cum = 0
      if (this.item && this.item.products) {
        for (const value of Object.values(this.item.products)) {
          cum = cum + value.qty
        }

      }
      return cum
    }
  },

};
</script>