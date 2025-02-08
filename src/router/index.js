import { createRouter, createWebHistory } from 'vue-router'
import ProductDetails from '../views/ProductDetails.vue'
import Login from '../views/Login.vue'
import Home from '../views/HomeView.vue'
import Cart from '../views/cart.vue'

const routes = [
  { path: '/', name: 'HomeView', component: Home },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
