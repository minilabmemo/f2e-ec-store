import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { userProductsApi, userProductApi } from '@/utils/config/path';

import fetchAct from '@/utils/methods/fetchAct';
import type { Product } from '@/utils/type';

export const useProductStore = defineStore('productStore', () => {
  const products: Ref<Product[]> = ref([]);

  const defaultProductsSort = ref();
  const productsByCAT = ref();
  const defaultProduct: Product = {
    id: '',
    imageUrl: '',
    title: '',
    unit: '',
    price: 0,
    origin_price: 0,
    num: 0,
    category: '',
    subcategory: ''
  };
  const product: Ref<Product> = ref(defaultProduct);

  function getProducts() {
    const url = `${userProductsApi}`;
    fetchAct.get(url).then((data: any) => {
      products.value = data.products;
      defaultProductsSort.value = data.products;
    });
  }
  function getProductByID(id: string) {
    if (!id) {
      console.warn('getProductByID id is empty.');
      return;
    }
    const url = `${userProductApi}/${id}`;

    fetchAct.get(url).then((data: any) => {
      product.value = data.product;
    });
  }
  function filterByCategory(category: string, subcategory?: string) {
    let itemsByCAT = [];
    if (!products.value) {
      return;
    }

    switch (category) {
      case 'all':
        itemsByCAT = products.value.filter(
          (item: { category: { toString: () => string | string[] } }) =>
            !item.category.toString().includes('test')
        );

        break;
      default:
        itemsByCAT = products.value.filter(
          (item: { category: { toString: () => string | any[] } }) =>
            item.category.toString().includes(category)
        );

        break;
    }
    if (subcategory) {
      switch (subcategory) {
        case 'all':
          break;
        default:
          itemsByCAT = products.value.filter(
            (item: { category: { toString: () => string | any[] } }) =>
              item.category.toString().includes(category)
          );
          itemsByCAT = itemsByCAT.filter(
            (item: { category: { toString: () => string | string[] } }) =>
              item.category.toString().includes(subcategory)
          );
          break;
      }
    }

    productsByCAT.value = itemsByCAT;
  }
  function sortProductsBy(field: string, order?: 'asc' | 'desc') {
    if (!products.value || !Array.isArray(products.value)) {
      console.error('Products array is empty or invalid.');
      return;
    }

    if (field === 'default') {
      products.value = defaultProductsSort.value;
      return;
    }

    const sortedProducts = [...products.value];

    sortedProducts.sort((a, b) => {
      if (!a[field] || !b[field]) {
        console.error(`Field "${field}" does not exist in products.`);
        return 0;
      }

      if (order === 'asc') {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      } else {
        if (a[field] < b[field]) return 1;
        if (a[field] > b[field]) return -1;
        return 0;
      }
    });

    products.value = sortedProducts;
  }

  return {
    product,
    products,
    productsByCAT,
    getProducts,
    getProductByID,
    filterByCategory,
    sortProductsBy
  };
});
