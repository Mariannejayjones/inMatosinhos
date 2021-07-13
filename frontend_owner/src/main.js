import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from'vue-axios'
import {boot} from '@/app-bootstrap'



Vue.config.productionTip = false
Vue.use(VueAxios, axios)
boot().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
