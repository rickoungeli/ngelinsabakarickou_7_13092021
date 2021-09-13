import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './axios'
import store from './store/index'

Vue.config.productionTip = false

//let app = 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
/*
app.$on('login', () => { 
  console.log('ok')
})
*/
