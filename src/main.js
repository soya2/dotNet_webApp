import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import index from './components/index.vue'
import detail from './components/detail.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.imjad.cn/cloudmusic/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  { path: '/', component: index },
  { path: '/detail', component: detail }
]

const router = new Router({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
