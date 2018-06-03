import Vue from 'vue';
import VueResource from 'vue-resource';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AsyncComputed from 'vue-async-computed';
import Vuetify from 'vuetify';
import App from './App.vue';
import routes from './routes';
import { store } from './store/store';
// import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuetify);
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
