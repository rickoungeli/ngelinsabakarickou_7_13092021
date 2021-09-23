import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './axios'
import store from './store/index'
import VueLuxon from "vue-luxon"

Vue.config.productionTip = false

//let app = 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueLuxon, {
  input: {
      zone: "utc",
      format: "iso"
  },
  output: "short"
})