// import Cookies from 'js-cookie'
import Element from 'element-ui'
import store from '../store'
import router from '../router'
const TokenKey = 'Authorization'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(data) {
  // return Cookies.set(TokenKey, data.token_type + ' ' + data['access_token'], { expires: data.expires_in })
  return localStorage.setItem(TokenKey, data.token_type + ' ' + data['access_token'])
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem(TokenKey)
  localStorage.removeItem('org')
  localStorage.removeItem('customerLogin')
  return
}
export function setUpLoadHeaders() {
  Element.Upload.props.onError.default = (e) => {
    Element.Message({
      showClose: true,
      message: '上传未成功 ，请重新上传！',
      type: 'error'
    })
    if (e.status === 401) {
      store.dispatch('user/resetToken')
      router.push({ path: '/login' })
    }
    return e
  }
  Element.Upload.props.headers.default = () => ({
    Authorization: `${getToken()}`
  })
}
console.log('b');
console.log('c');