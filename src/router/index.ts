import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Koring Shop | 韓國流行服飾 - 最新韓國時尚、服飾、配件和潮流'
      }
    },
    {
      path: '/showcase',
      name: 'showcase',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShowCaseView.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
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
});
export default router
