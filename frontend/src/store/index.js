import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  getters: {
    user: state => state.user,
    token: state => state.token

  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if (!user) {
        localStorage.removeItem('user')
      } else {
      localStorage.setItem('user', JSON.stringify(user))        }
    },
    setToken(state, token) {
      
      state.token = token
      if (!token) {
        localStorage.removeItem('token')
      } else {
      localStorage.setItem('token', token) 
      }  
    },
    
  },
  
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user) //calls mutations //
  },
    setToken ({ commit }, token) {
      commit('setToken', token)
    },

  },

  modules: {
  }
})
