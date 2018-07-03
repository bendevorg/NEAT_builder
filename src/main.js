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

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(AsyncComputed);

Vue.use(Vuetify, {
  theme: {
    primary: "#00bcd4",
    primarylight: "#62efff",
    primarydark: "#008ba3",

    secondary: "#e91e63",
    secondarylight: "#ff6090",
    secondarydark: "#b0003a",

    //-summery
      // "primary": "#4dd0e1",
      // "secondary": "#ffeb3b",
      // "accent": "#03a9f4",
      // "error": "#FF5252",
      // "info": "#2196F3",
      // "success": "#4CAF50",
      // "warning": "#FFC107",
    //-summery

    //-purply
    // primary: "#9575CD",
    // secondary: "#673AB7",
    //-purpl

    // primary: "#673AB7", <- theme1
    // secondary: "#6200EA",
    //default
    accent: "#9575CD",
    error: "#f44336",
    warning: "#FF9800",
    info: "#2196f3",
    success: "#4caf50"
  }
})

// Vue.use(BootstrapVue);
Vue.http.options.root = 'http://localhost:3339/api';
const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
