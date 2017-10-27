import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Register from '@/components/Register'
import Cart from '@/components/Cart'
import Order from '@/components/Order'
import Admin from '@/components/Admin'
import AddBook from '@/components/admin/AddBook'
import AddUser from '@/components/admin/AddUser'
import EditUser from '@/components/admin/EditUser'
import UserOrders from '@/components/admin/UserOrders'
import EditBook from '@/components/admin/EditBook'

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
      component: Admin,
      children: [
        { path: 'addbook', component: AddBook },
        { path: 'adduser', component: AddUser },
        { path: 'edituser/:id', component: EditUser },
        { path: 'orderuser', component: UserOrders },
        { path: 'editbook/:id', component: EditBook },
      ]
    }


  ]
})
