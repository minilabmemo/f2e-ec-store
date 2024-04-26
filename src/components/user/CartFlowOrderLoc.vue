<template>
  <LoadingOverlay :active="status.isLoading" />
  <VeeForm class="" v-slot="{ errors }" @submit="sendOrder">
    <div class=" my-4">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <h3 class="mb-3">訂單內容</h3>
          <table class="table align-middle">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td style="width:60%">{{ item.product.title }}</td>
                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                <td>${{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>總計</td>
                <td>{{ cartTotalQty }}件</td>
                <td>${{ $filters.currency(cart.total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="col-12 col-md-6  d-flex  justify-content-center flex-column ">
          <h3 class="mb-3">收件資訊</h3>

          <div class="d-flex flex-wrap ">
            <input type="checkbox" id="importDataCheckbox" @change="importDataCheckbox()" class="me-2">
            <label for="importDataCheckbox"> 從會員資料中匯入</label>
            <div>（<router-link class=" " to="/user/info">點此更新會員資料</router-link>）</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>Email</label>
            <VeeField id="email" name="email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['email'], 'form-control-sm': isExtraSmallDevice }" placeholder="請輸入 Email"
              rules="email|required" v-model="form.user.email" />
            <VeeErrorMessage name="email" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="name" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人姓名</label>
            <VeeField id="name" name="姓名" type="text" class="form-control "
              :class="{ 'is-invalid': errors['姓名'], 'form-control-sm': isExtraSmallDevice }" placeholder="請輸入姓名"
              rules="required" v-model="form.user.name" />
            <VeeErrorMessage name="姓名" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人電話</label>
            <VeeField id="tel" name="電話" type="tel" class="form-control"
              :class="{ 'is-invalid': errors['電話'], 'form-control-sm': isExtraSmallDevice }"
              placeholder="請輸入電話 Ex:0912345678" :rules="isPhone" v-model="form.user.tel" />
            <VeeErrorMessage name="電話" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人地址</label>
            <VeeField id="address" name="地址" type="text" class="form-control"
              :class="{ 'is-invalid': errors['地址'], 'form-control-sm': isExtraSmallDevice }" placeholder="請輸入地址"
              rules="required" v-model="form.user.address" />
            <VeeErrorMessage name="地址" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">收貨備註</label>
            <textarea name="" id="message" class="form-control" cols="3" rows="3" v-model="form.message" rules="max:5"
              placeholder="請輸入收貨備註" :class="{ 'form-control-sm': isExtraSmallDevice }"></textarea>
          </div>

        </div>
        <div class="col-12 d-flex flex-wrap justify-content-center ">
          <div> <button type="button" class="btn btn-outline-primary  me-2"
              @click.prevent="emit('go-prev')">回上一步</button>
          </div>
          <div><button type="submit" class="btn btn-primary  ">送出訂單</button></div>

        </div>
      </div>

    </div>
  </VeeForm>
</template>

<script setup>
import {ref, watch} from 'vue';
import {storeToRefs} from 'pinia'
import {useOrderStore} from '@/stores/orderStore'
import {useCartStore} from '@/stores/cartStore';
import {useDeviceSize} from '@/composables/useDeviceSize.js'

const {isExtraSmallDevice} = useDeviceSize()

const cartStore = useCartStore();
const {cart, cartTotalQty} = storeToRefs(cartStore);
const {getCart} = useCartStore();

const orderStore = useOrderStore();
const {createOrder, } = orderStore;
const {status} = storeToRefs(orderStore);

import {memberStorage} from '@/utils/methods/memberStorage.js';
const {getMemberData} = memberStorage();

function importDataCheckbox() {

  const memberData = getMemberData();
  if (!memberData) {
    alert('您沒有保存的會員資料，請先更新會員資料。');
    document.getElementById('importDataCheckbox').checked = false;
  } else {
    form.value = memberData;
  }

}

const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
  message: '',
});
function sendOrder() {

  if (!cart.value.carts) {
    alert("您的購物車沒有商品，請先新增商品進購物車。")
    return
  }

  const body = form.value;
  createOrder(body)
}
function isPhone(value) {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '請填寫台灣手機號碼，以 09 開頭加上 8 位數字之格式。'
}
const emit = defineEmits(['order-create', 'go-prev'])

watch(
  () => orderStore.status.orderTemp,
  (newVal) => {
    if (newVal.paySuccess) {
      emit('order-create', newVal.orderId);

    }
    getCart();
  }, {deep: true})

</script>
@/composables/useDeviceSize.js