import Vue from 'vue'
import VueRouter from 'vue-router'
// import }Home from '../views/Home.vue'
import login from  '../components/Login.vue'
import landing from  '../components/landing.vue'
import restaurants from '../components/restaurants.vue'
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
