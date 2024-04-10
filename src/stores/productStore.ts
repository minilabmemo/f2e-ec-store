import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userProductsApi, userProductApi } from '@/utils/const/path'
import statusStore from './statusStore'
import { catchErr, dataErr } from '@/utils/methods/handleErr.js'
export const useProductStore = defineStore('productStore', () => {
  const products = ref()
  const status = statusStore()
  const product = ref({})
  function getProducts() {
    const url = `${userProductsApi}`
    status.isLoading = true
    axios
      .get(url)
      .then((response) => {
        status.isLoading = false
        if (response.data.success) {
          products.value = response.data.products
        } else {
          dataErr(response)
        }
      })
      .catch((err) => {
        catchErr(err)
        status.status.isLoading = false
      })
  }
  function getProductByID(id: string) {
    if (!id) {
      console.warn('getProductByID id is empty.')
      return
    }
    const api = `${userProductApi}/${id}`
    status.isLoading = true
    axios.get(api).then((response) => {
      status.isLoading = false
      if (response.data.success) {
        product.value = response.data.product
      }
    })
  }

  return { product, products, status, getProducts, getProductByID }
})
