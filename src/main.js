import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/normalize.css'
import 'amfe-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;


axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'http://192.168.8.57:3000';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')