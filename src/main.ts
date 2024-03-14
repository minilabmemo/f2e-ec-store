//import './assets/main.css'
import './assets/all.scss'
import './assets/custom.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import LoadingOverlay from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { currency,date } from '@/utils/methods/filters';
import httpMessageState from '@/utils/methods/pushMessageState';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';

import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency,
};
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

configure({
  generateMessage: localize({ zh_TW: zhTW }), 
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW');

app.provide('httpMessageState', httpMessageState)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingOverlay',LoadingOverlay)
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app')
