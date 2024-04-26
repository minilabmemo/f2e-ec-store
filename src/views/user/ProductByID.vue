<template>
  <LoadingOverlay :active="status.isLoading" />
  <div v-if="!status.isLoading && !product" class="text-primary "> 該商品已下架。</div>
  <div class="" v-if="!status.isLoading">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link class="link-offset-2 " :to="`/product/${route.params.category}/all`">
            {{ category_name
            }}</router-link>
        </li>
        <li v-if="sub_category_name" class="breadcrumb-item ">
          <router-link class="link-offset-2 " :to="`/product/${route.params.category}/${route.params.subcategory}`"> {{
    sub_category_name
  }}</router-link>
        </li>

      </ol>
    </nav>
    <div class="row  justify-content-start  align-items-start flex-wrap ">
      <div class="col-12 col-md-4  px-sm-2 d-flex justify-content-center  align-items-center">
        <div style="max-width:300px"> <img :src="product.imageUrl" alt="image" class="flex-image mb-3"></div>

      </div>
      <div class="col-12 col-md-7  px-md-2 px-sm-4   d-flex justify-content-center  align-items-center">
        <article class="row  justify-content-center  align-items-baseline py-3 ">
          <h3 class="col-12">{{ product.title }}</h3>

          <div class="col-12 ">
            <div class="row justify-content-start  align-items-baseline   ">
              <div class="col-12 col-md-8 col-lg-auto">
                <span class="price " v-if="!product.origin_price"> 價格 ${{ $filters.currency(product.origin_price)
                  }}</span>
                <span class="price" v-show="product.price === product.origin_price"> 特惠價 ${{
    $filters.currency(product.origin_price) }}</span>
                <span class="text-500" v-show="product.price !== product.origin_price"> <del>原價 ${{
    $filters.currency(product.origin_price) }}</del></span>
                <span class="price  " v-show="product.price !== product.origin_price"> 優惠價 ${{
    $filters.currency(product.price) }}</span>
              </div>
              <div class="col-12 col-md-4">
                <span class=" text-500 " v-if="product.num"> 商品數量 {{ product.num }} 件</span>
              </div>
            </div>
            <hr>
            <div class="row fw-bold justify-content-center mb-1  ">
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
            <div class="d-flex justify-content-between   align-items-stretch ">
              <div class=" ">
                <SaveButton class="d-none d-xs-inline-block" :item="saveButtonItem" style="min-width:120px" />
                <SaveButton class="d-inline-block d-xs-none  btn  btn-sm " :item="saveButtonItem" />
              </div>
              <div class="  ">
                <button type="button" class=" d-none d-xs-inline-block   btn btn-primary " style="min-width:120px"
                  @click="checkQty(product.id, itemQty)">
                  <div class="d-flex flex-wrap justify-content-center ">
                    <span> 立即結帳</span>
                  </div>
                </button>
                <button type="button" class="d-inline-block d-xs-none  btn btn-primary btn-sm"
                  @click="checkQty(product.id, itemQty)">
                  <div class="d-flex flex-wrap justify-content-center ">
                    <span> 立即結帳</span>
                  </div>
                </button>
              </div>
              <div class="  ">
                <button type="button" class="d-none d-xs-inline-block btn btn-primary  " style="min-width:120px"
                  @click="addCart(product.id, itemQty, false)" :class="{ disabled: status.isCartLoading }">
                  加入購物車
                </button>
                <button type="button" class="d-inline-block d-xs-none  btn btn-primary btn-sm  "
                  @click="addCart(product.id, itemQty, false)" :class="{ disabled: status.isCartLoading }">
                  加入購物車
                </button>
              </div>

            </div>

          </div>
        </article>
      </div>

    </div>

    <div class="row d-flex g-3 justify-content-center my-3 text-center">
      <hr>
      <h2 class=" fw-bold ">Product Detail</h2>
      <div v-if="product.description">
        <div v-html="product.description.replace(/\n/g, '<br>')"></div>
      </div>
      <div v-for="  item   in   product.imagesUrl  " :key="item">
        <img :src="item" alt="image" class="img-fluid  col-6">
      </div>
      <div v-if="product.content">
        <div v-html="product.content.replace(/\n/g, '<br>')"></div>
      </div>

      <img :src="product.imageUrl" alt="image" class="img-fluid  col-6">

    </div>

    <div class="row flex-column  justify-content-center  align-items-center">
      <div class="my-2 my-md-5 col-11  ">
        <img src="@/assets/img/design/shopping_note.png" alt="shopping_note" class="img-fluid  ">
      </div>

      <div v-if="product && product.category && product.category.includes('dress')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_dress.png" alt="split" class="img-fluid ">
      </div>
      <div v-if="product && product.category
    && (product.category.includes('upper') || product.category.includes('coat'))" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_upper.png" alt="split" class="img-fluid  ">
      </div>
      <div v-if="product && product.category && product.category.includes('pants')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_pants.png" alt="split" class="img-fluid  ">
      </div>
      <div v-if="product && product.category && product.category.includes('skirt')" class="my-2 my-md-5col-6">
        <img src="@/assets/img/design/size_skirt.png" alt="split" class="img-fluid  ">
      </div>
    </div>

    <div class="row py-5" v-if="recommendItems.length > 0">

      <div class="col-12">
        <h4>您可能也喜歡</h4>
        <div class="row overflow-x-auto  flex-nowrap align-items-stretch  ">
          <SaleItem v-for="(item) in recommendItems" :key="item.id" :item="item" class="col-5 col-xs-4 col-md-3 "
            data-cy="item" :path="`${route.params.category}/${route.params.subcategory}`" />
        </div>

      </div>

    </div>

  </div>
  <AddCartConfirm v-if="product" :item="{ title: product.title, qty: itemQty }" ref="cartConfirm"
    @add-item="addCart(product.id, itemQty, true)" @go-carts="goToCart" />

  <button @click="scrollToTop" class="btn bg-primary   rounded-circle  "
    :class="{ 'scroll-to-top-button': true, 'show': showScrollToTopButton }">
    <i class="bi bi-arrow-bar-up text-white "></i>

  </button>
</template>

<script setup>
import {ref, watch, watchEffect, onMounted, onBeforeUnmount, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import categories from '@/utils/config/categories';
import AddCartConfirm from '@/components/user/modal/AddCartConfirm.vue';
import SaveButton from '@/components/user/SaveButton.vue';
import SaleItem from '@/components/user/SaleItem.vue';
import {useCartStore} from '@/stores/cartStore';
import {storeToRefs} from 'pinia'
import {useProductStore} from '@/stores/productStore';
import {addCartCheck} from '@/utils/methods/addCartCheck.js'
const productStore = useProductStore();
const {product, products, status} = storeToRefs(productStore);

const cartStore = useCartStore();

const {cart} = storeToRefs(cartStore);

const {productsByCAT} = storeToRefs(productStore);
const {getProductByID, getProducts, filterByCategory} = productStore;
const route = useRoute();
const cartConfirm = ref(null);
const id = ref('');
const itemQty = ref(1);
const saveButtonItem = ref({});
const showScrollToTopButton = ref(false);

const category_name = computed(() => {
  return categories[route.params.category] ? categories[route.params.category].name : '';
});

const sub_category_name = computed(() => {
  if (categories[route.params.category]?.sub_category && categories[route.params.category].sub_category[route.params.subcategory]) {
    return categories[route.params.category].sub_category[route.params.subcategory].name;
  }
  return '';
});

const recommendItems = computed(() => {

  let items = [];
  let removeID = id.value;
  if (productsByCAT.value) {
    items = productsByCAT.value.filter((item) => item.id != removeID);
  }
  if (items.length === 0) {
    if (products.value && products.value.length >= 3) {
      items = products.value.slice(0, 3);
    }
  }

  return items;
});
const router = useRouter();
const goToCart = () => {
  router.push('/user/cart/flow');
};

const checkQty = (id, qty = 1) => {
  let confirmAddCart = false;
  if (cart.value) {
    cart.value.carts.forEach(element => {
      if (element.product_id === id) {
        confirmAddCart = true;
      }
    });
  }
  if (confirmAddCart) {
    const confirmModal = cartConfirm.value;
    confirmModal.showModal();
  } else {
    addCart(id, qty, true);
  }
};

function addCart(id, qty = 1, redirect = false) {
  const isAdd = addCartCheck(id, qty)
  if (!isAdd) {
    return
  }

  if (redirect) {
    goToCart();
  }
};

const handleScroll = () => {
  showScrollToTopButton.value = window.pageYOffset > window.innerHeight / 2;
};

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: "smooth"});
};

onMounted(() => {
  id.value = route.params.productId;
  getProductByID(id.value);
  getProducts();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watchEffect(() => {
  saveButtonItem.value = {
    title: product.value.title,
    id: product.value.id,
    imageUrl: product.value.imageUrl,
    on_stock: true
  };
});

watch(() => products, () => {

  filterByCategory(route.params.category);

}, {deep: true});

watch(() => route.params.productId, (newV, oldV) => {
  if (newV !== oldV) {
    id.value = route.params.productId;
    getProductByID(id.value);
    getProducts();
  }
});

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
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.3s ease-in-out;
  border: none;

}

.scroll-to-top-button.show {
  opacity: 1;
  transform: translateY(0px);
}
</style>