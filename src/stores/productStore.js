import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue'
import {userProductsApi} from '@/utils/const/path'
import statusStore from './statusStore';
import {catchErr, dataErr} from '@/utils/methods/handleErr.js'
export const useProductStore = defineStore('productStore', () => {
  const products = ref();
  const status = statusStore();

  function getProducts() {
    const url = `${userProductsApi}`;
    status.isLoading = true;
    axios.get(url).then((response) => {
      status.isLoading = false;
      if (response.data.success) {
        products.value = response.data.products;
      } else {
        dataErr(response)
      }

    }).catch((err) => {
      catchErr(err)
      status.status.isLoading = false;
    });
  }
  return {products, status, getProducts}
})