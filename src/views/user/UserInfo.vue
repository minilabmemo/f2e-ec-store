<template>

  <div class="container-xl">
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }" @submit="saveFormData(form)">
        <div class="mb-3">
          <label for="email" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>Email</label>
          <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話 Ex:0912345678" :rules="isPhone" v-model="form.user.tel" />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="address" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address" />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">收貨備註</label>
          <textarea name="" id="message" class="form-control" cols="5" rows="5" v-model="form.message"></textarea>
        </div>

        <div class="text-end">
          <button class="btn btn-danger">更新會員資料</button>
        </div>
      </Form>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {useFormDataStorage} from '@/utils/methods/formDataStorage';
const {saveFormData, getFormData} = useFormDataStorage();


const formDataFromLocalStorage = getFormData();

const form = ref(formDataFromLocalStorage ? formDataFromLocalStorage : {
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
