import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],

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
        localStorage.setItem('user', JSON.stringify(user))    
      }
    },
    setToken(state, token) {
      
      state.token = token
      if (!token) {
        localStorage.removeItem('token')
      } else {
        localStorage.setItem('token', token) 
      }  
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user) //calls mutations //
    },
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    logout({ commit }) {
      commit('logout')
    }

  },

  modules: {
  }
})

