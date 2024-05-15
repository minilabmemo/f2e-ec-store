<template>
  <LoadingOverlay :active="status.isLoading" />
  <div v-if="!status.isLoading && !product" class="text-primary">該商品已下架。</div>
  <div v-if="!status.isLoading">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb flex-nowrap ">
        <li class="breadcrumb-item text-nowrap " v-if="$route.params.category !== 'all'">
          <router-link :to="`/product/all/all`" class="link-offset-2"> 全部 </router-link>
        </li>
        <li class="breadcrumb-item text-nowrap ">
          <router-link class="link-offset-2" :to="`/product/${route.params.category}/all`">
            {{ category_name }}</router-link>
        </li>
        <li v-if="sub_category_name" class="breadcrumb-item text-nowrap ">
          <router-link class="link-offset-2" :to="`/product/${route.params.category}/${route.params.subcategory}`">
            {{ sub_category_name }}</router-link>
        </li>
        <li class="breadcrumb-item ellipsis">
          <router-link class="link-offset-2"
            :to="`/product/${route.params.category}/${route.params.subcategory}/id/${route.params.productId}`">
            {{ product.title }}</router-link>
        </li>
      </ol>
    </nav>
    <div class="row justify-content-start align-items-start flex-wrap">
      <div class="col-12 col-md-4 px-sm-2 d-flex justify-content-center align-items-center">
        <div style="max-width: 300px">
          <img :src="product.imageUrl" alt="clothes" class="flex-image mb-3">
        </div>
      </div>
      <div class="col-12 col-md-7 px-md-2 px-sm-4 d-flex justify-content-center align-items-center">
        <article class="row justify-content-center align-items-baseline py-3">
          <h3 class="col-12">{{ product.title }}</h3>

          <div class="col-12">
            <div class="row justify-content-start align-items-baseline">
              <div class="col-12 col-md-8 col-lg-auto">
                <span class="price" v-if="!product.origin_price">
                  價格 ${{ $filters.currency(product.origin_price) }}</span>
                <span class="price" v-show="product.price === product.origin_price">
                  特惠價 ${{ $filters.currency(product.origin_price) }}</span>
                <span class="text-500" v-show="product.price !== product.origin_price">
                  <del>原價 ${{ $filters.currency(product.origin_price) }}</del></span>
                <span class="price" v-show="product.price !== product.origin_price">
                  優惠價 ${{ $filters.currency(product.price) }}</span>
              </div>
              <div class="col-12 col-md-4">
                <span class="text-500" v-if="product.num"> 商品數量 {{ product.num }} 件</span>
              </div>
            </div>
            <hr>
            <div class="row fw-bold justify-content-center mb-1">
              <div class="col-4">尺寸</div>
              <div class="col-4">顏色</div>
              <div class="col-4">數量</div>
            </div>
            <div class="row mb-3 justify-content-center align-items-center">
              <div class="col-4">Free</div>
              <div class="col-4">單一色</div>
              <div class="col-4">
                <select id="qty" class="form-select" v-model="itemQty">
                  <option :value="item" v-for="item in product.num" :key="item">{{ item }}</option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-stretch gap-2">
              <div class="flex-grow-1">
                <SaveButton class="btn" style="min-width: 6.125rem; width: 100%"
                  :class="{ 'btn-sm': isExtraSmallDevice }" :item="saveButtonItem" />
              </div>
              <div class="flex-grow-1">
                <button type="button" class="btn btn-primary" :class="{ 'btn-sm': isExtraSmallDevice }"
                  style="min-width: 5.625rem; width: 100%" @click="checkAndAddCart(product.id, itemQty)">
                  <div class="d-flex flex-wrap justify-content-center">
                    <span> 立即結帳</span>
                  </div>
                </button>
              </div>
              <div class="flex-grow-1 position-relative">
                <button type="button" class="btn btn-primary" style="min-width: 5.625rem; width: 100%"
                  @click="addCart(product.id, itemQty, false)"
                  :class="{ disabled: status.isAddLoading, 'btn-sm': isExtraSmallDevice }">
                  加入購物車
                </button>
                <transition name="fade">
                  <div v-if="status.isAddLoading" class="animation fw-bolder">+{{ itemQty }}</div>
                </transition>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="row d-flex g-3 justify-content-center my-3 text-center">
      <hr>
      <h2 class="fw-bold">Product Detail</h2>
      <div v-if="product.description">
        <div v-html="product.description.replace(/\n/g, '<br>')"></div>
      </div>
      <div v-for="item in product.imagesUrl" :key="item">
        <img :src="item" alt="clothes" class="img-fluid col-6">
      </div>
      <div v-if="product.content">
        <div v-html="product.content.replace(/\n/g, '<br>')"></div>
      </div>

      <img :src="product.imageUrl" alt="clothes" class="img-fluid col-6">
    </div>

    <div class="row flex-column justify-content-center align-items-center">
      <div class="my-2 my-md-5 col-11">
        <img src="@/assets/img/design/shopping_note.png" alt="shopping_note" class="img-fluid">
      </div>

      <div v-if="product && product.category && product.category.includes('dress')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_dress.png" alt="size_dress" class="img-fluid">
      </div>
      <div v-if="
        product &&
        product.category &&
        (product.category.includes('upper') || product.category.includes('coat'))
      " class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_upper.png" alt="size_upper" class="img-fluid">
      </div>
      <div v-if="product && product.category && product.category.includes('pants')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_pants.png" alt="size_pants" class="img-fluid">
      </div>
      <div v-if="product && product.category && product.category.includes('skirt')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_skirt.png" alt="size_skirt" class="img-fluid">
      </div>
    </div>

    <div class="row py-5" v-if="recommendItems.length > 0">
      <div class="col-12">
        <h4>您可能也喜歡</h4>
        <div class="row overflow-x-auto flex-nowrap align-items-stretch">
          <SaleItem v-for="item in recommendItems" :key="item.id" :item="item" class="col-5 col-xs-4 col-md-3"
            data-cy="item" :path="`${route.params.category}/${route.params.subcategory}`" />
        </div>
      </div>
    </div>
  </div>
  <AddCartConfirm v-if="product" :item="{ title: product.title, qty: itemQty }" ref="cartConfirm"
    @add-item="addCart(product.id, itemQty, true)" @go-carts="goToCart" />

  <button @click="scrollToTop" class="btn bg-primary rounded-circle"
    :class="{ 'scroll-to-top-button': true, show: showScrollToTopButton }">
    <i class="bi bi-arrow-bar-up text-white"></i>
  </button>
</template>

<script setup>
import {ref, watch, watchEffect, onMounted, onBeforeUnmount, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import categories from '@/utils/config/categories'
import AddCartConfirm from '@/components/user/modal/AddCartConfirm.vue'
import SaveButton from '@/components/user/SaveButton.vue'
import SaleItem from '@/components/user/SaleItem.vue'
import {useCartStore} from '@/stores/cartStore'
import {storeToRefs} from 'pinia'
import {useProductStore} from '@/stores/productStore'
import {addCartCheck} from '@/utils/methods/addCartCheck'
import {useDeviceSize} from '@/composables/useDeviceSize'
const {isExtraSmallDevice} = useDeviceSize()
const productStore = useProductStore()
const {product, products} = storeToRefs(productStore)
import statusStore from '@/stores/statusStore'
const status = statusStore()

const cartStore = useCartStore()

const {cart} = storeToRefs(cartStore)

const {productsByCAT} = storeToRefs(productStore)
const {getProductByID, getProducts, filterByCategory} = productStore
const route = useRoute()
const cartConfirm = ref(null)
const id = ref('')
const itemQty = ref(1)
const saveButtonItem = ref({})
const showScrollToTopButton = ref(false)

const category_name = computed(() => {
  return categories[route.params.category] ? categories[route.params.category].name : ''
})

const sub_category_name = computed(() => {
  if (
    categories[route.params.category]?.sub_category &&
    categories[route.params.category].sub_category[route.params.subcategory]
  ) {
    return categories[route.params.category].sub_category[route.params.subcategory].name
  }
  return ''
})

const recommendItems = computed(() => {
  let items = []
  let removeID = id.value
  if (productsByCAT.value) {
    items = productsByCAT.value.filter((item) => item.id != removeID)
  }
  if (items.length === 0) {
    if (products.value && products.value.length >= 3) {
      items = products.value.slice(0, 3)
    }
  }

  return items
})
const router = useRouter()
const goToCart = () => {
  router.push('/user/cart/flow')
}

async function checkAndAddCart(id, qty = 1, retries = 3) {
  if (status.isAddLoading === undefined || status.isAddLoading) {
    if (retries === 0) {
      throw new Error('Maximum retries exceeded')
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return checkAndAddCart(id, qty, retries - 1)
  }
  let confirmAddCart = false
  if (cart.value) {
    cart.value.carts.forEach((element) => {
      if (element.product_id === id) {
        confirmAddCart = true
      }
    })
  }
  if (confirmAddCart) {
    const confirmModal = cartConfirm.value
    confirmModal.showModal()
  } else {
    addCart(id, qty, true)
  }
}

function addCart(id, qty = 1, redirect = false) {
  const isAdd = addCartCheck(id, qty)
  if (!isAdd) {
    return
  }

  if (redirect) {
    goToCart()
  }
}

const handleScroll = () => {
  showScrollToTopButton.value = window.pageYOffset > window.innerHeight / 2
}

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

onMounted(() => {
  id.value = route.params.productId
  getProductByID(id.value)
  getProducts()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watchEffect(() => {
  saveButtonItem.value = {
    title: product.value.title,
    id: product.value.id,
    imageUrl: product.value.imageUrl,
    on_stock: true
  }
})

watch(
  () => products,
  () => {
    filterByCategory(route.params.category)
  },
  {deep: true}
)

watch(
  () => route.params.productId,
  (newV, oldV) => {
    if (newV !== oldV) {
      id.value = route.params.productId
      getProductByID(id.value)
      getProducts()
    }
  }
)
</script>

<style lang="css" scoped>
.flex-image {
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  height: auto;
}

.scroll-to-top-button {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  opacity: 0;
  transform: translateY(3.125rem);
  transition: transform 0.3s ease-in-out;
  border: none;
}

.scroll-to-top-button.show {
  opacity: 1;
  transform: translateY(0px);
}

.custom-btn-xs {
  --bs-btn-padding-x: 0.3rem;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 1s ease-out,
    top 1s ease-out;
  top: -0.625rem;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  top: -5rem;
}

.animation {
  position: absolute;
  right: 50%;
}

.ellipsis {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
