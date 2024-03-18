import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../views/HomeLayout.vue'
import { useFavicon } from "@vueuse/core";
const icon = useFavicon();
const shopFavIcon="logo_favicon.ico"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLayout,
      meta: {
        title: 'Koring Shop | 韓國流行服飾 - 最新韓國時尚、服飾、配件和潮流',
        icon:shopFavIcon
      },
      children: [
        {
          name:"HomeBody",
          path: '',
          component: () => import('../views/HomeBody.vue'),
          meta: {icon:`../${shopFavIcon}` },
        },
        {
          name:"UserCart",
          path: 'product/:category',
          component: () => import('../views/UserCart.vue'),
          meta: {icon:`../${shopFavIcon}` },
        },
      ],
    },
    {
      path: '/showcase',
      name: 'showcase',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShowCase.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      children:[
        {
          path:'products',
          component:()=>import('../views/Products.vue'),
        } ,{
          path: 'orders',
          component: () => import('../views/Orders.vue'),
        },
        {
          path: 'coupons',
          component: () => import('../views/Coupons.vue'),
        },
      ]
    },
    {
      path: '/user',
      component: () => import('../views/Userboard.vue'),
      children: [
        {
          path: 'cart',
          component: () => import('../views/UserCart.vue'),
        },
        {
          path: 'product/:productId',
          component: () => import('../views/UserProduct.vue'),
        },
        {
          path: 'checkout/:orderId',
          component: () => import('../views/UserCheckout.vue'),
        },
      ],
    },
  ]
})
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.meta.icon) {
    icon.value = to.meta.icon as string;
  } else{
    icon.value =""
  }
});
export default router
