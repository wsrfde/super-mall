import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import toast from 'components/common/toast';
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;
//挂载事件总线
Vue.prototype.$bus = new Vue();

Vue.use(toast);
Vue.use(VueLazyLoad,{
  loading:require('assets/img/common/placeholder.png')
})
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// import request from 'network/request';
//
// request({
//   url:'/home/multidata'
// }).then(res =>{
//   console.log(res);
// })
