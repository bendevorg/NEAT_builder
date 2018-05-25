import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    game: {
      id: 'f7ca4cb4-a121-42c7-a03f-980fdbafa608',
      name: '',
      running: false,
      // TODO: Get this from an API
      instructions: [
        {
          name: 'Player',
          items: [
            { name: 'player.x', description: 'Player X position (Defined between 0 and the game.width)' },
            { name: 'player.y', description: 'Player Y position (Defined between 0 and the game.height)' },
            { name: 'player.width', description: 'Player width size' },
            { name: 'player.height', description: 'Player height size' },
            { name: 'player.velocity', description: 'Player velocity (velocity in the Y position is -13 and Max 13)' },
            { name: 'player.maxVelocity', description: 'Player maximum velocity in Y axis (13)' },
            { name: 'player.minVelocity ', description: 'Player minimum velocity in Y axis (-13)' },
          ]
        },
        {
          name: 'Blocks',
          items: [
            { name: 'blocks.closest.x', description: 'X of the closest block' },
            { name: 'blocks.closest.y', description: 'Y of the closest block' },
            { name: 'blocks.closest.width', description: 'width of the closest block' },
            { name: 'blocks.closest.height', description: 'height of the closest block' },
            { name: 'blocks.closest.velocity', description: 'velocity of the closest block (fixed at 6)' },
          ]
        },
        {
          name: 'Game',
          items: [
            { name: 'game.height', description: 'Height size of game canvas' },
            { name: 'game.width', description: 'Width size of game canvas' }
          ]
        },
        {
          name: 'Objective',
          items: [
            { name: 'Goal', description: 'Reach the highest score within 1000 steps' }
          ]
        }
      ],
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
          'player': 'params[0]',
          'blocks.closest': 'params[1]',
          'game': 'params[2]'
        }
      },
      canvas: {
        // TODO: Get this from an API
        width: 600,
        height: 400
      }, 
    },
    player: {
      name: ''
    },
    genetic: {
    },
    neuralNetwork: {
      inputLayers: 1
    },
    // Everything down from here is temporary... i don`t know how to handle these yet
    backend: {
      host: process.env.BACKEND_HOST
    },
  },
  getters: {
    //  Game getters
    gameInstructions: state => {
      return state.game.instructions;
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
    inputParameters: state => {
      return state.game.parameters.inputs;
    },
    inputLayers: state => {
      return state.neuralNetwork.inputLayers;
    },
    backendHost: state => {
      return state.backend.host;
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
