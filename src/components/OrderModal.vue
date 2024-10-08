<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="tempOrder?.user">
          <div class="row">
            <div class="col-md-4">
              <h3 class="fw-bold text-primary">用戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 6.25rem">姓名</th>
                    <td>
                      <div class="text-break">{{ tempOrder.user.name }}</div>
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      <a :href="`mailto:${tempOrder.user.email}`">
                        <div class="text-break">{{ tempOrder.user.email }}</div>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>
                      <a :href="`tel:+886-${tempOrder.user.tel.slice(1)}`">{{ tempOrder.user.tel }}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>
                      <div class="text-break">{{ tempOrder.user.address }}</div>
                    </td>
                  </tr>
                  <tr>
                    <th>收貨備註</th>
                    <td>{{ tempOrder.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3 class="fw-bold text-primary">訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 6.25rem" class="text-nowrap">訂單編號</th>
                    <td class="text-break">{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ $filters.currency(tempOrder.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3 class="fw-bold text-primary">選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th style="width: 60%">
                      <small>{{ item.product.title }}</small>
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">$ {{ $filters.currency(item.final_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer border-top border-500">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useModal } from '@/composables/useModal';
import type { Order } from '@/utils/type';
const props = defineProps<{
  order: Order;
}>();
const modal = ref(null);

const { showModal, hideModal } = useModal(modal);
defineExpose({
  showModal,
  hideModal
});
const tempOrder = ref<Order | null>(null)!;
const isPaid = ref(false);
watch(
  () => props.order,
  (newOrder) => {
    tempOrder.value = newOrder;
    isPaid.value = newOrder.is_paid;
  },
  { immediate: true }
);
</script>
