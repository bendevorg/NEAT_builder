import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // TODO: GET this from an API
    gameInstructions: [
      {
        name: 'Bird',
        items: [
          { name: 'bird.x', description: 'Bird X position (Defined between 0 and the game.width)' },
          { name: 'bird.y', description: 'Bird Y position (Defined between 0 and the game.height)' },
          { name: 'bird.radius', description: 'Bird radius size' },
          { name: 'bird.velocity', description: 'Bird velocity (velocity in the Y position is -5 and Max 5)' },
          { name: 'bird.maxVelocity', description: 'Bird maximum velocity (5)' },
          { name: 'bird.minVelocity', description: 'Bird minimum velocity (-5)' },
          { name: 'bird.score', description: 'Actual bird score' },
          { name: 'birds.scoreSum', description: 'All birds sums' }
        ]
      },
      {
        name: 'Pipe',
        items: [
          { name: 'pipes.closest.x', description: 'Closest x pipe' },
          { name: 'pipes.closest.bottom', description: 'Closest pipe bottom entrance' },
          { name: 'pipes.closest.top', description: 'Closes pipe top entrance' },
          { name: 'pipes.closest.width', description: 'Closest pipe width' },
          { name: 'pipes.closest.velocity', description: 'Closest pipe velocity (fixed at 6)' },
        ]
      },
      {
        name: 'Game',
        items: [
          { name: 'game.height', description: 'Height size of game canvas' },
          { name: 'game.width', description: 'Width size of game canvas' }
        ]
      }
    ],
    gameInfo:{
      name: '',
      speed: 1,
      generationHighScore: 0,
      allTimeHighScore: 0,
      steps: 0,
      timeSpent: 0,
      goal: 1000
    },
    // Everything down from here is temporary... i don`t know how to handle these yet
    gameId: 'f7ca4cb4-a121-42c7-a03f-980fdbafa608',
    backend: {
      host: 'http://localhost:3340/api'
    },
    game: {
      width: 600,
      height: 400
    },
    genetic: {
    },
    neuralNetwork: {
      inputLayers: 1
    }
  },
  getters: {
    gameInstructions: state => {
      return state.gameInstructions;
    },
    getInputLayers: state => {
      return state.neuralNetwork.inputLayers;
    },
    backendHost: state => {
      return state.backend.host;
    },
    gameId: state => {
      return state.gameId;
    },
    gameParameters: state => {
      return state.game;
    },
    genetic: state => {
      return state.genetic;
    },
    neuralNetwork: state => {
      return state.neuralNetwork;
    },
    speed: state => {
      return state.gameInfo.speed;
    },
    generationHighScore: state => {
      return state.gameInfo.generationHighScore;
    },
    allTimeHighScore: state => {
      return state.gameInfo.allTimeHighScore;
    },
    steps: state => {
      return state.gameInfo.steps;
    },
    timeSpent: state => {
      return state.gameInfo.timeSpent;
    },
    goal: state => {
      return state.gameInfo.goal;
    },
    gameName: state => {
      return state.gameInfo.name;
    }
  },
  mutations: {
    changeHolder(state, payload) {
      state.placeHolder = payload.placeHolder
    },
    changeSpeed(state, payload) {
      state.gameInfo.speed = payload.speed;
    },
    changeScore(state, payload) {
      state.gameInfo.generationHighScore = payload.generationHighScore;
      state.gameInfo.allTimeHighScore = payload.allTimeHighScore;
    },
    changeProgression(state, payload) {
      state.gameInfo.steps = payload.steps;
      state.gameInfo.timeSpent = payload.timeSpent;
    },
    changeGameName(state, payload){
      state.gameInfo.name = payload.name
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
