<template>
  <div>
    <LoadingOverlay :active="isLoading" />
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
            <span v-else class="text-muted">未起用</span>
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
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import CouponModal from '@/components/admin/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import {adminCouponsApi, adminCouponApi} from '@/utils/config/path'
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
import statusStore from '@/stores/statusStore';
import {mapActions} from 'pinia'
export default {
  components: {CouponModal, DelModal},

  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    ...mapActions(statusStore, ['pushMessage']),
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = {...item};
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = {...item};
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    getCoupons() {
      this.isLoading = true;
      const url = `${adminCouponsApi}`;
      this.$http.get(url, this.tempProduct).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.coupons = response.data.coupons;
        } else {
          dataErr(response)
        }

      }).catch((err) => {
        catchErr(err)
        this.status.isLoading = false;
      });
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const url = `${adminCouponApi}`;
        this.$http.post(url, {data: tempCoupon}).then((response) => {
          this.pushMessage({title: '新增優惠券', response: response});

          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      } else {
        const url = `${adminCouponApi}/${this.tempCoupon.id}`;
        this.$http.put(url, {data: this.tempCoupon}).then((response) => {
          this.pushMessage({title: '修改優惠券', response: response});

          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      }
    },
    delCoupon() {
      const url = `${adminCouponApi}/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.pushMessage({title: '刪除優惠券', response: response});

        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>@/utils/config/path