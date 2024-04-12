import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userProductsApi, userProductApi } from '@/utils/config/path'
import statusStore from './statusStore'
import { catchErr, dataErr } from '@/utils/methods/handleErr.js'
export const useProductStore = defineStore('productStore', () => {
  const products = ref()
  const defaultProductsSort = ref()
  const productsByCAT = ref()
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
          defaultProductsSort.value = response.data.products
        } else {
          dataErr(response)
        }
      })
      .catch((err) => {
        catchErr(err)
        status.isLoading = false
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
  function filterByCategory(category: string, subcategory: string) {
    let itemsByCAT = []
    if (!products.value) {
      return
    }

    switch (category) {
      case 'all':
        itemsByCAT = products.value.filter(
          (item: { category: { toString: () => string | string[] } }) =>
            !item.category.toString().includes('test')
        )

        break
      default:
        itemsByCAT = products.value.filter(
          (item: { category: { toString: () => string | any[] } }) =>
            item.category.toString().includes(category)
        )

        break
    }
    if (subcategory) {
      switch (subcategory) {
        case 'all':
          break
        default:
          itemsByCAT = products.value.filter(
            (item: { category: { toString: () => string | any[] } }) =>
              item.category.toString().includes(category)
          )
          itemsByCAT = itemsByCAT.filter(
            (item: { category: { toString: () => string | string[] } }) =>
              item.category.toString().includes(subcategory)
          )
          break
      }
    }

    productsByCAT.value = itemsByCAT
  }
  function sortProductsBy(field: string, order: 'asc' | 'desc') {
    if (!products.value || !Array.isArray(products.value)) {
      console.error('Products array is empty or invalid.')
      return
    }

    if (field === 'default') {
      products.value = defaultProductsSort.value
      return
    }

    const sortedProducts = [...products.value]

    sortedProducts.sort((a, b) => {
      if (!a[field] || !b[field]) {
        console.error(`Field "${field}" does not exist in products.`)
        return 0
      }

      if (order === 'asc') {
        if (a[field] < b[field]) return -1
        if (a[field] > b[field]) return 1
        return 0
      } else {
        if (a[field] < b[field]) return 1
        if (a[field] > b[field]) return -1
        return 0
      }
    })

    products.value = sortedProducts
  }

  return {
    product,
    products,
    status,
    productsByCAT,
    getProducts,
    getProductByID,
    filterByCategory,
    sortProductsBy
  }
})
