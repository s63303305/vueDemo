// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import VueResource from 'vue-resource'
import store from './vuex/store'
import App from './App.vue'

require('!style-loader!css-loader!./assets/css/animate.css');
require('!style-loader!css-loader!sass-loader!./assets/css/public.scss');



Vue.use(VueResource)
//Vue.config.productionTip = false; //关闭生产模式下给出的提示

/* eslint-disable no-new */
var vm = new Vue({
  router ,
  store,
  ...App
}).$mount('#app')

