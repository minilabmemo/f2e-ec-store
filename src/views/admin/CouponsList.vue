<template>
  <div>
    <LoadingOverlay :active="status.isLoading" />
    <div class="text-end mt-4">
      <button type="button" class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script setup>

import CouponModal from '@/components/admin/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import {adminCouponsApi, adminCouponApi} from '@/utils/config/path'
import {ref} from 'vue'
import fetchAct from '@/utils/methods/fetchAct';
import statusStore from '@/stores/statusStore';
const status = statusStore();
const delModal = ref(null)
const couponModal = ref(null)
const coupons = ref({})
const tempCoupon = ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
})
const isNewRef = ref(false)

function openCouponModal(isNew, item) {
  isNewRef.value = isNew;
  if (isNew) {
    tempCoupon.value = {
      due_date: new Date().getTime() / 1000,
    };
  } else {
    tempCoupon.value = {...item};
  }
  couponModal.value.showModal();
}
function openDelCouponModal(item) {
  tempCoupon.value = {...item};
  const delComponent = delModal;
  delComponent.value.showModal();
}
function getCoupons() {
  const url = `${adminCouponsApi}`;
  fetchAct.get(url).then((response) => {
    if (response.success) {
      coupons.value = response.coupons;
    }
  })
}
function updateCoupon(tempCoupon) {
  if (isNewRef.value) {
    const url = `${adminCouponApi}`;
    fetchAct.post(url, {data: tempCoupon}, "新增優惠券").then(() => {

      getCoupons();
      couponModal.value.hideModal();
    });
  } else {
    const url = `${adminCouponApi}/${tempCoupon.id}`;
    fetchAct.put(url, {data: tempCoupon}, "修改優惠券").then(() => {

      getCoupons();
      couponModal.value.hideModal();
    });
  }
}
function delCoupon() {
  const url = `${adminCouponApi}/${tempCoupon.value.id}`;
  fetchAct.delete(url, "刪除優惠券").then(() => {
    const delComponent = delModal;
    delComponent.value.hideModal();
    getCoupons();
  });
}

getCoupons();

</script>