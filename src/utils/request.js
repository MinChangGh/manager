import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/common'
import { ToastPlugin } from 'vux';
import Vue from 'vue';
Vue.use(ToastPlugin);

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error);
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error);
    Vue.$vux.toast.show({
      type: 'text',
      position: 'middle',
      text: '网络错误'
    })
    return Promise.reject(error)
  })

export default service
