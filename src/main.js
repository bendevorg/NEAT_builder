import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';
// import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
// Vue.use(BootstrapVue);
Vue.http.options.root = 'http://localhost:3339/api';
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
