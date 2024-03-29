import { createRouter, createWebHashHistory } from 'vue-router'
import HomeLayout from '../views/user/HomeLayout.vue'
import { useFavicon } from "@vueuse/core";
const icon = useFavicon();
const shopFavIcon="logo_favicon.ico"
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          component: () => import('../views/user/HomeBody.vue'),
          meta: {icon:`../${shopFavIcon}` },
        },  
        {
          name:"NoMatchRoute",
          path:  '/:pathMatch(.*)*',
          redirect: { name: 'HomeBody' } 
        }
          
        ,  
        {
          path: 'product/:category/:subcategory',
          component: () => import('../views/user/ProductsLayout.vue'),
          children:[
            {
              name:"ProductsByCAT",  
              path: '',
              component: () => import('../views/user/ProductsByCAT.vue'),
            },
            {
              name:"ProductsByID",
              path: 'id/:productId',
              component: () => import('../views/user/ProductByID.vue'),
            }, {
              name:"ProductByKey",
              path: 'keyword/:keyword',
              component: () => import('../views/user/ProductsByKey.vue'),
            }
          ]
        },
        {
          name:"UserCartFlow",
          path: 'user/cartflow',
          component: () => import('../views/user/UserCartFlow.vue'),
          meta: {icon:`../${shopFavIcon}` },
        }, 
        {
          name:"UserOrders",
          path: 'user/orders',
          component: () => import('../views/user/UserOrders.vue'),
          meta: {icon:`../${shopFavIcon}` },
        }, 
        {
          name:"UserSaves",
          path: 'user/saves',
          component: () => import('../views/user/UserSaves.vue'),
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
      path: '/admin/dashboard',
      name: 'dashboard',
      meta: {
        title: '後台管理',
       
      },
      component: () => import('../views/admin/Dashboard.vue'),
      children:[
        {
          path:'products',
          component:()=>import('../views/admin/ProductsManage.vue'),
        } ,{
          path: 'orders',
          component: () => import('../views/admin/Orders.vue'),
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/Coupons.vue'),
        },
      ]
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
