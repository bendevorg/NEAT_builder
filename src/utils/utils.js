import {store} from '../store/store.js';
import API from './API.js';

function updateHighScore(activeAgents) {
  // What is highest score of the current population
  let generationHighScore = 0;
  let allTimeHighScore = store.getters.allTimeHighScore;
  for (let i = 0; i < activeAgents.length; i++) {
    let score = activeAgents[i].score;
    if (score > generationHighScore) {
      generationHighScore = score;
    }
  }
  if (generationHighScore > allTimeHighScore)
    allTimeHighScore = generationHighScore;
  store.commit('changeScore', {generationHighScore, allTimeHighScore});
}

function goalReached(){
  let steps = store.getters.steps;
  return store.getters.steps >= store.getters.goal;
}

export default {
  updateHighScore,
  goalReached
}