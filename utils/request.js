import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'
import axios from 'axios'
import { Message } from 'element-ui'
// import { Loading, Message } from 'element-ui'

import { showLoading, hideLoading } from './loading'
// import qs from 'qs'
// const loadingInstance = Loading.service({
//   fullscreen: true,
//   text: '加载中……',
//   background: 'rgba(3, 3, 3, 0.6)',
//   target: document.querySelector('body')
// })

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use((config) => {
  showLoading()
  // 显示loading
  if (store.getters.token) {
    config.headers['Authorization'] = `${getToken()}`
  }
  config.headers['Content-Type'] = 'application/json'
  return config
}, (error) => {
  // 请求错误时弹框提示，或做些其他事
  return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use((response) => {
  // const code = response.data.code  拦截每次请求如果没有token返回登陆页面
  hideLoading()
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response
}, (error) => {
  hideLoading()
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response, reject) {
  reject(response)

  // 如果http状态码正常，则直接返回数据
  if (response.response.status === 400 && response.response.config.url === '/api/userlogin') {
    Message.error(decodeURIComponent(JSON.parse(response.response.data).error_description))
    return false
  }
  if (response.response.status === 401 && !store.getters.isUthorized) {
    store.dispatch('setUthorized', true)
    Message.error('登录信息过期,请重新登录')
    store.dispatch('user/resetToken')
    router.push({ path: '/login' })
    return false
  }
  if (response.response.status !== 401) {
    Message.error(response.message)
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState(res = {}, resolve) {
  if (typeof res.data === 'object') {
    // 隐藏loading
    // 统一判断后端返回的错误码(错误码与后台协商而定)
    if (res.data.code === '201') {
      // Message.warning(res.data.message)
    } else if (res.data.code !== '200') {
      if (res.data.message) {
        Message.error(res.data.message)
      }
    }
  }
  resolve(res.data)
}

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params, ...query) {
  const httpDefault = {
    method: method,
    // baseURL: '/api/',
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    ...query
  }
  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then((res) => {
        successState(res, resolve)
      }).catch((response) => {
        errorState(response, reject)
      }).finally(() => {
        // loadingInstance.close()
        hideLoading()
      })
  })
}

// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  post(url, params, ...query) {
    return apiAxios('POST', url, params, ...query)
  },
  get(url, params) {
    return apiAxios('GET', url, params)
  },
  put(url, params) {
    return apiAxios('PUT', url, params)
  },
  delete(url, params) {
    return apiAxios('DELETE', url, params)
  }
}
