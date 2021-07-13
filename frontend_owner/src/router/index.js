import Vue from 'vue'
import VueRouter from 'vue-router'
import login from  '../components/login.vue'
import youRestaurant from  '../components/yourRestaurantList.vue'
import eachrestaurant from '../components/eachrestaurant.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/restaurants',
    name: 'youRestaurant',
    component: youRestaurant
  },

  {
    path: '/restaurants/:id',
    name: 'eachrestaurant',
    component: eachrestaurant
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
