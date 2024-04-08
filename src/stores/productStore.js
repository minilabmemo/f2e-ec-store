import axios from 'axios';
import {defineStore} from 'pinia';
import {ref} from 'vue'
import {userProductsApi} from '@/utils/const/path'
import statusStore from './statusStore';

export const useProductStore = defineStore('productStore', () => {
  const products = ref();
  const status = statusStore();

  function getProducts() {
    const url = `${userProductsApi}`;
    status.isLoading = true;
    axios.get(url).then((response) => {
      products.value = response.data.products;
      console.log('get products store:', response);
      console.log('get products :', products);
      status.isLoading = false;
    });
  }

  return {products, status, getProducts}
})