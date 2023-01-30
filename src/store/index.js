import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户数据,先尝试读取本地存储
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user')) || null
  },
  mutations: {
    // 用于修改用户数据
    setUser (state, payload) {
      // payload 为请求到的用户数据，JSON格式不便操作，转换为对象进行存储
      state.user = JSON.parse(payload)
      // 将数据保存到本地存储中（注意：本地存储无法存储对象）
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
