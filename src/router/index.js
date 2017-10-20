import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Register from '@/components/Register'
import Cart from '@/components/Cart'
import Order from '@/components/Order'
import Admin from '@/components/Admin'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/register/',
      name: 'Register',
      component: Register
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin
    }


  ]
})
