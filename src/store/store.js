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
      actions: 0,
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
        width: 1020,
        height: 760
      },
      bestAgent: {}
    },
    player: {
      name: ''
    },
    brain: {
      type: ''
    },
    genetic: {
      speciesAmount: 0,
      currentGeneration: 1
    },
    neuralNetwork: {
      inputLayers: 1,
      outputLayers: 1,
      blurInput: 0
    },
    instruction:{
      name:''
    },
    QLearning: {
      amountOfInputs: 1
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
    brainType: state => state.brain.type,
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
    bestAgent: state => state.game.bestAgent,
    blurInput: state => state.neuralNetwork.blurInput,
    instructionName: state => state.instruction.name
  },
  mutations: {
    changeGames(state, payload) {
      state.games = payload;
    },
    changeGame(state, payload) {
      state.game.name = payload.name;
      state.game.id = payload.id;
      state.game.goal = payload.goal;
      state.game.actions = payload.actions;
    },
    changeGameName(state, payload) {
      state.game.name = payload;
    },
    changeBrainType(state, payload) {
      state.brain.type = payload
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
        outputLayers: state.game.actions,
        learningRate: parseFloat(payload.learningRate),
        inputs: payload.inputs,
        blurInput: state.neuralNetwork.blurInput
      };
    },
    changeQLearning(state, payload) {
      state.QLearning = {
        amountOfActions: state.game.actions,
        amountOfInputs: parseInt(payload.amountOfInputs),
        learningRate: parseFloat(payload.learningRate),
        futureSignificancy: parseFloat(payload.futureSignificancy),
        probabilityToExplore: parseFloat(payload.probabilityToExplore),
        exploreDecay: parseFloat(payload.exploreDecay),
        inputs: payload.inputs
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
    },
    changeBlurInput(state, payload) {
      state.neuralNetwork.blurInput = payload;
    },
    changeInstructionName(state, payload) {
      state.instruction.name = payload;
    }
  }
});
