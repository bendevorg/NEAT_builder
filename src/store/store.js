import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    games: [],
    game: {
      id: '',
      name: '',
      running: false,
      info: {
        speed: 1,
        generationHighScore: 0,
        allTimeHighScore: 0,
        steps: 0,
        timeSpent: 0
      },
      goal: 0,
      parameters: {
        inputs: {}
      },
      canvas: {
        // TODO: Get this from an API
        width: 300,
        height: 200
      },
      bestAgent: {}
    },
    player: {
      name: ''
    },
    genetic: {
      speciesAmount: 0,
      currentGeneration: 1
    },
    neuralNetwork: {
      inputLayers: 1,
      outputLayers: 1
    },
    QLearning: {
      amountOfActions: 1
    }
  },
  getters: {
    //  Game getters
    games: state => state.games,
    gameId: state => state.game.id,
    gameRunning: state => state.game.running,
    gameCanvas: state => state.game.canvas,
    gameName: state => state.game.name,
    playerName: state => state.player.name,
    inputParameters: state => state.game.parameters.inputs,
    inputLayers: state => state.neuralNetwork.inputLayers,
    genetic: state => state.genetic,
    speciesAmount: state => state.genetic.speciesAmount,
    currentGeneration: state => state.genetic.currentGeneration,
    neuralNetwork: state => state.neuralNetwork,
    QLearning: state => state.QLearning,
    goal: state => state.game.goal,
    speed: state => state.game.info.speed,
    generationHighScore: state => state.game.info.generationHighScore,
    allTimeHighScore: state => state.game.info.allTimeHighScore,
    steps: state => state.game.info.steps,
    timeSpent: state => state.game.info.timeSpent,
    bestAgent: state => state.game.bestAgent
  },
  mutations: {
    changeGames(state, payload) {
      state.games = payload;
    },
    changeGame(state, payload) {
      state.game.name = payload.name;
      state.game.id = payload.id;
      state.game.goal = payload.goal;
      state.neuralNetwork.outputLayers = payload.actions;
    },
    changeGameName(state, payload) {
      state.game.name = payload;
    },
    changeGameInputs(state, payload) {
      state.game.parameters.inputs = payload;
    },
    changeGameRunning(state, payload) {
      state.game.running = payload;
    },
    changePlayerName(state, payload) {
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
    changeOutputAmount(state, payload) {
      state.neuralNetwork.outputLayers = payload;
    },
    changeNeuralNetwork(state, payload) {
      state.neuralNetwork = {
        inputLayers: parseInt(payload.inputLayers),
        hiddenLayers: parseInt(payload.hiddenLayers),
        outputLayers: state.neuralNetwork.outputLayers,
        learningRate: parseFloat(payload.learningRate),
        inputs: payload.inputs
      };
    },
    changeQLearning(state, payload) {
      state.QLearning = {
        amountOfActions: parseInt(payload.amountOfActions),
        learningRate: parseFloat(payload.learningRate),
        futureSignificancy: parseFloat(payload.futureSignificancy),
        probabilityToExplore: parseFloat(payload.probabilityToExplore),
        exploreDecay: parseFloat(payload.exploreDecay)
      };
    },
    changeGenetic(state, payload) {
      state.genetic.population = parseInt(payload.population);
      state.genetic.mutationRate = parseFloat(payload.mutationRate);
    },
    changeSpeciesAmount(state, payload) {
      state.genetic.speciesAmount = parseInt(payload);
    },
    changeCurrentGeneration(state, payload) {
      state.genetic.currentGeneration = parseInt(payload);
    },
    changeBestAgent(state, payload) {
      state.game.bestAgent = payload;
    }
  }
});
