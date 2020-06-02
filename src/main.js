// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Promise from 'promise'

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.prototype.HOST = '/api'

import Vuex from 'vuex';
Vue.use(Vuex);



// 定义全局的时间过滤器，格式化时间
Vue.filter('dateFormat', function (dateStr) {
  var dt = new Date(dateStr);
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, '0');
  var d = (dt.getDate()).toString().padStart(2, '0');
  var hh = dt.getHours().toString().padStart(2, '0');
  var mm = dt.getMinutes().toString().padStart(2, '0');
  var ss = dt.getSeconds().toString().padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
})

// const store = new Vuex.Store({

//   state: {
//     // 存储token
//     Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
//   },

//   mutations: {
//     // 修改token，并将token存入localStorage
//     changeLogin(state, user) {
//       console.log('state hh')
//       state.Authorization = user.Authorization;
//       localStorage.setItem('Authorization', user.Authorization);
//     }
//   }
// });

// export default store;
// 参考：https://www.cnblogs.com/web-record/p/9876916.html
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('USER_TOKEN_KEY')) {
      console.log(localStorage.getItem('USER_TOKEN_KEY'))
      config.headers.USER_TOKEN_KEY = localStorage.getItem('USER_TOKEN_KEY');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });
axios.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      console.log('token 失效')
      router.push({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
    })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
