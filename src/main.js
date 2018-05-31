import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import AsyncComputed from 'vue-async-computed';
import { routes } from './routes';
import { store } from './store/store';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import BootstrapVue from 'bootstrap-vue'
 
Vue.use(Vuetify)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(AsyncComputed);
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
