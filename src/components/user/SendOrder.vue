<template>

  <div class="container">
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>Email</label>
          <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" :rules="{
        required: true, numeric: true,
      }" v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="5" rows="5" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import {userOrderApi} from '@/utils/const/path'
export default {
  inject: ['httpMessageState', 'emitter'],

  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },

    };
  },
  methods: {
    createOrder() {
      const url = userOrderApi;
      const order = this.form;
      this.$http.post(url, {data: order})
        .then((res) => {
          this.$emit('order-create', res.data.orderId);
          this.$emit('go-next');
          this.emitter.emit('update-cartQty'); //觸發首頁購物車數量更新
        });
    },
  },

};
</script>@