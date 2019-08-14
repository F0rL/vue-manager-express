import axios from "axios";
import { Loading, Message } from "element-ui";
import router from '../router'

let loadingInstance;
function startLoading() {
  loadingInstance = Loading.service({
    lock: true,
    text: "正在加载中...",
    background: "rgba(0,0,0,.7)"
  });
}

function endLoading() {
  loadingInstance.close();
}

//请求拦截
axios.interceptors.request.use(config => {
  //加载动画
  startLoading()
  if(localStorage.eleToken) {
    //设置统一的请求头
    config.headers.Authorization = localStorage.eleToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
  //结束加载动画
  endLoading()
  return response
}, error => {
  endLoading();
  Message.error({message: error.response.data})
  //获取错误状态码
  const {status} = error.response
  if(status === 401) {
    Message.error('token失效，请重新登录')
    localStorage.removeItem('eleToken')
    router.push('/login')
  }
  //throw Error(error.response.data)
  return Promise.reject(error)
})
export default axios;
