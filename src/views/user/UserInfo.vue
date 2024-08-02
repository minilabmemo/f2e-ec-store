<template>
  <div class="container-xl">
    <div class="my-5 row justify-content-center">
      <VeeForm class="col-md-6" v-slot="{ errors }" @submit="saveMemberData(formData)">
        <h5>會員資料</h5>
        <div class="mb-3">
          <label for="email" class="form-label"><span class="text-primary fw-bold fs-3">*</span>Email</label>
          <VeeField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="formData.user.email" />
          <VeeErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label"><span class="text-primary fw-bold fs-3">*</span>收件人姓名</label>
          <VeeField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="formData.user.name" />
          <VeeErrorMessage name="姓名" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label"><span class="text-primary fw-bold fs-3">*</span>收件人電話</label>
          <VeeField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話 Ex:0912345678" :rules="isPhone" v-model="formData.user.tel" />
          <VeeErrorMessage name="電話" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="address" class="form-label"><span class="text-primary fw-bold fs-3">*</span>收件人地址</label>
          <VeeField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="formData.user.address" />
          <VeeErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">收貨備註 ({{ formData.message.length }}/{{ maxMessage }})</label>
          <VeeField as="textarea" name="收貨備註" id="message" :rules="`max:${maxMessage}`" class="form-control" cols="2"
            rows="2" v-model="formData.message" :class="{ 'is-invalid': errors['收貨備註'] }" />

          <VeeErrorMessage name="收貨備註" class="invalid-feedback" />
        </div>

        <div class="text-end">
          <button class="btn btn-primary">更新</button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { memberStorage } from '@/utils/methods/memberStorage';

const { saveMemberData, getMemberData } = memberStorage();

const memberData = getMemberData();

const formData = ref({
  user: memberData ? memberData.user : {
    name: '',
    email: '',
    tel: '',
    address: ''
  },
  message: memberData ? memberData.message : ''
});
function isPhone(value: string) {
  const phoneNumber = /^(09)[0-9]{8}$/;
  return phoneNumber.test(value) ? true : '請填寫台灣手機號碼，以 09 開頭加上 8 位數字之格式。';
}
const maxMessage = ref(50);
</script>
