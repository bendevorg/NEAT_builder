import {store} from '../store/store.js';
import API from './API.js';

function updateHighScore(activeAgents) {
  // What is highest score of the current population
  let generationHighScore = 0;
  let bestAgent = null;
  let allTimeHighScore = store.getters.allTimeHighScore;
  for (let i = 0; i < activeAgents.length; i++) {
    let score = activeAgents[i].score;
    if (score > generationHighScore) {
      generationHighScore = score;
      bestAgent = activeAgents[i];
    }
  }
  if (generationHighScore > allTimeHighScore)
    allTimeHighScore = generationHighScore;
  store.commit('changeScore', {generationHighScore, allTimeHighScore});
  store.commit('changeBestAgent', bestAgent);
}

function goalReached(){
  return store.getters.steps >= store.getters.goal;
}

function sendLeaderboardEntry(entryInfo){
  API
    .post('/leaderboard/' + store.getters.gameId + '/new', entryInfo)
    .then(response => {

    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  updateHighScore,
  goalReached,
  sendLeaderboardEntry
}