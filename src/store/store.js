import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    placeHolder: 0,
  },
  getters: {
    getHolder: state => {
      return state.placeHolder
    }
  },
  mutations: {
    changeHolder(state, payload){
      state.placeHolder = payload.placeHolder
    }
  }
});
