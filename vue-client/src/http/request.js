import axios from "axios";
import { Loading, Message } from "element-ui";

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
  throw Error(error.response.data)
  //return Promise.reject(error)
})
export default axios;
