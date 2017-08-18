import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 保存初始数据
  state,
  // 开发使用严格模式
  strict: process.env.NODE_ENV !== 'production'
})
