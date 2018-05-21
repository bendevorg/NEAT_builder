import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    birdInput: [
      { varname:'bird.x', description: 'Bird X position (Defined between 0 and the game.width)' },
      { varname:'bird.y', description: 'Bird Y position (Defined between 0 and the game.height)' },
      { varname:'bird.radius', description: 'Bird radius size' },
      { varname:'bird.velocity', description: 'Bird velocity (velocity in the Y position is -5 and Max 5)' },
      { varname:'bird.maxVelocity', description: 'Bird maximum velocity (5)' },
      { varname:'bird.minVelocity', description: 'Bird minimum velocity (-5)' },
      { varname:'bird.score', description: 'Actual bird score' },
      { varname:'birds.scoreSum', description: 'All birds sums' },
    ],
  },
  getters: {
    getBirdInput: state => {
      return state.birdInput
    }
  },
  mutations: {
    changeHolder(state, payload){
      state.placeHolder = payload.placeHolder
    }
  }
});
