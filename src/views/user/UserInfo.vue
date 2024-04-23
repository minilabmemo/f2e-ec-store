<template>

  <div class="container-xl">
    <div class="my-5 row justify-content-center">
      <VeeForm.value class="col-md-6" v-slot="{ errors }" @submit="saveVeeFormData(VeeForm)">
        <div class="mb-3">
          <label for="email" class="VeeForm-label"><span class="text-primary fw-bold fs-3 ">*</span>Email</label>
          <VeeField id="email" name="email" type="email" class="VeeForm-control"
            :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
            v-model="VeeForm.user.email" />
          <VeeErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="name" class="VeeForm-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人姓名</label>
          <VeeField id="name" name="姓名" type="text" class="VeeForm-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="VeeForm.user.name" />
          <VeeErrorMessage name="姓名" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="tel" class="VeeForm-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人電話</label>
          <VeeField id="tel" name="電話" type="tel" class="VeeForm-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話 Ex:0912345678" :rules="isPhone" v-model="VeeForm.user.tel" />
          <VeeErrorMessage name="電話" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="address" class="VeeForm-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人地址</label>
          <VeeField id="address" name="地址" type="text" class="VeeForm-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="VeeForm.user.address" />
          <VeeErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="VeeForm-label">收貨備註</label>
          <textarea name="" id="message" class="VeeForm-control" cols="5" rows="5" v-model="VeeForm.message"></textarea>
        </div>

        <div class="text-end">
          <button class="btn btn-danger">更新會員資料</button>
        </div>
      </VeeForm.value>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {VeeFormDataStorage} from '@/utils/methods/VeeFormDataStorage';
const {saveVeeFormData, getVeeFormData} = VeeFormDataStorage();

const VeeFormDataFromLocalStorage = getVeeFormData();

const VeeForm = ref(VeeFormDataFromLocalStorage ? VeeFormDataFromLocalStorage : {
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
  message: '',
});

function isPhone(value) {
  const phoneNumber = /^(09)[0-9]{8}$/
  return phoneNumber.test(value) ? true : '請填寫台灣手機號碼，以 09 開頭加上 8 位數字之格式。'
}

</script>
