// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.prototype.HOST = '/api'



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



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
