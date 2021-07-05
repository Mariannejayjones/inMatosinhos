import Vue from 'vue'
import VueRouter from 'vue-router'
// import }Home from '../views/Home.vue'
import login from  '../components/login.vue'
import landing from  '../components/landing.vue'
import restaurants from '../components/restaurants.vue'
import eachrestaurant from '../components/eachrestaurant.vue'
import register from '../components/register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/landing',
    name: 'landing',
    component: landing
  },

  {
    path: '/restaurants',
    name: 'restaurants',
    component: restaurants
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/register',
    name: 'register',
    component: register
  },

  {
    path: '/restaurant/:id',
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
