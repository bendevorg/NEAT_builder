import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    games: [],
    game: {
      id: '',
      name: '',
      running: false,
      // TODO: Get this from an API
      goal: 1000,
      info: {
        speed: 1,
        generationHighScore: 0,
        allTimeHighScore: 0,
        steps: 0,
        timeSpent: 0,
      },
      parameters: {
        // TODO: Get this from an API
        inputs: {  
          'player.head': 'params[0]',
          'player': 'params[1]',
          //'blocks.closest': 'params[1]',
          'food': 'params[2]',
          'game': 'params[3]'
        }
      },
      canvas: {
        // TODO: Get this from an API
        width: 300,
        height: 200
      }, 
    },
    player: {
      name: ''
    },
    genetic: {
    },
    neuralNetwork: {
      inputLayers: 1
    }
  },
  getters: {
    //  Game getters
    games: state => {
      return state.games;
    },
    gameId: state => {
      return state.game.id;
    },
    gameRunning: state => {
      return state.game.running;
    },
    gameCanvas: state => {
      return state.game.canvas;
    },
    gameName: state => {
      return state.game.name;
    },
    playerName: state => {
      return state.player.name;
    },
    inputParameters: state => {
      return state.game.parameters.inputs;
    },
    inputLayers: state => {
      return state.neuralNetwork.inputLayers;
    },
    genetic: state => {
      return state.genetic;
    },
    neuralNetwork: state => {
      return state.neuralNetwork;
    },
    goal: state => {
      return state.game.goal;
    },
    speed: state => {
      return state.game.info.speed;
    },
    generationHighScore: state => {
      return state.game.info.generationHighScore;
    },
    allTimeHighScore: state => {
      return state.game.info.allTimeHighScore;
    },
    steps: state => {
      return state.game.info.steps;
    },
    timeSpent: state => {
      return state.game.info.timeSpent;
    },
  },
  mutations: {
    changeGames(state, payload){
      state.games = payload;
    },
    changeGameId(state, payload){
      state.game.id = payload;
    },
    changeGameName(state, payload){
      state.game.name = payload;
    },
    changeGameRunning(state, payload) {
      state.game.running = payload;
    },
    changePlayerName(state, payload){
      state.player.name = payload;
    },
    changeSpeed(state, payload) {
      state.game.info.speed = payload;
    },
    changeScore(state, payload) {
      state.game.info.generationHighScore = payload.generationHighScore;
      state.game.info.allTimeHighScore = payload.allTimeHighScore;
    },
    changeProgression(state, payload) {
      state.game.info.steps = payload.steps;
      state.game.info.timeSpent = payload.timeSpent;
    },
    changeNeuralNetwork(state, payload){
      state.neuralNetwork = {
        inputLayers: parseInt(payload.inputLayers),
        hiddenLayers : parseInt(payload.hiddenLayers),
        learningRate: parseFloat(payload.learningRate),
        inputs: payload.inputs
      };
    },
    changeGenetic(state, payload) {
      state.genetic = {
        population: parseInt(payload.population),
        mutationRate: parseFloat(payload.mutationRate)
      };
    }
  }
});
