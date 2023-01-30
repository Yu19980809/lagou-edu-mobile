import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  // 读取 store 中存储的用户信息
  const { user } = store.state
  // 检测是否存在用户数据，若有，则进行 token 设置
  if (user && user.acces_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 标记 Token 刷新状态
let isRefreshing = false

// 存储刷新时等待的请求
let waitedRequests = []

// 设置响应拦截器刷新 token
request.interceptors.response.use(response => {
  // 状态码问 2xx 的都会进入这里
  return response
}, async error => {
  // 超过 2xx 的会进入这里
  if (error.response) {
    // 请求发送成功，也收到了响应，但状态码超过 2xx
    // 1. 检测状态码是否为 401 (接口鉴权失败时返回状态码为 401)
    if (error.response.status === 401) {
      // 1.1. 检测是否存在用户登录信息
      if (!store.state.user) {
        // 若不存在，结束即可
        return Promise.reject(error)
      }
      // 1.2. 根据 refresh_token 请求新的 access_token
      // 发送请求前检测，是否已经存在刷新 Token 的请求
      if (isRefreshing) {
        // 将发送请求保存在函数中，存储到 failedRequests 中等待执行
        return waitedRequests.push(() => {
          // error.config 指的是失败请求的配置对象
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，尝试刷新 token
      const { data } = await request({
        method: 'GET',
        url: '/front/user/refresh_token',
        // 转换成接口要求的 urlencoded 格式
        data: new window.URLSearchParams({
          refredhtokrn: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        // 刷新 Token 失败
        store.commit('setUser', null)
        return Promise.reject(error)
      }
      // 刷新 token 成功
      store.commit('setUser', data.content)
      // 将 waitedRequests 中的所有请求重新发送
      waitedRequests.forEach(callback => callback())
      waitedRequests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
