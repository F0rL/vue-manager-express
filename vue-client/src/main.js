import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './http/request'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$request = request


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
