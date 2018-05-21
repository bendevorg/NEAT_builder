import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    inputTotal: [
      { id: '1', name: 'user 1',},
      { id: '2', name: 'user 2',},
    ],
  },
  getters: {
    getInputTotal: state => {
      return state.inputTotal
    }
  },
  mutations: {
    changeHolder(state, payload){
      state.placeHolder = payload.placeHolder
    }
  }
});
