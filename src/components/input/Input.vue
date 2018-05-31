<template>
  <div class="col-md-6">
    <div 
      id="NNParams" 
      class="row">
      <div class="col-md-6">
        <label>Neural Network</label>
        <br>
        <label>Inputs: </label>
        <span id="inputCounter">{{ neuralNetwork.inputLayers }}</span>
        <input 
          id="inputLayers" 
          v-model="neuralNetwork.inputLayers" 
          type="range" 
          min="1" 
          max="10" 
          step="1" 
          placeholder="Input Layers" 
          @input="changeInputLayersAmount" >
        <div id="inputList">
          <input 
            v-for="index in getInputLayers" 
            :key="index" 
            v-model="neuralNetwork.inputs[index-1]" 
            type="text" 
            placeholder="Type your input variable">
        </div>
        <input 
          v-model="neuralNetwork.hiddenLayers" 
          type="text" 
          name="Hidden Layers" 
          placeholder="Hidden Layers" >
        <input 
          v-model="neuralNetwork.learningRate" 
          type="text" 
          name="Learning Rate" 
          placeholder="Learning Rate" >
        <p>FIXED Output layers: 2 (jump or do nothing)</p>
      </div>
    </div>
    <div 
      id="GAParams" 
      class="row">
      <div class="col-md-6">
        <label>Genetic Algorithm</label>
        <br>
        <input 
          v-model="genetic.population" 
          type="text" 
          placeholder="Species per generation" >
        <input 
          v-model="genetic.mutationRate" 
          type="text" 
          placeholder="Mutation rate" >
      </div>
    </div>
    <div>
      <div 
        id="leaderboardParams" 
        class="row">
        <div class="col-md-6">
          <label>Name</label>
          <input 
            v-model="player.name" 
            text="text" 
            placeholder="Your AI name" >
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <button @click="startGame">Start</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import formatInputs from '../../utils/formatInputs';

export default {
  name: 'Input',
  data() {
    return {
      neuralNetwork: {
        inputLayers: 1,
        inputs: [],
        hiddenLayers: null,
        learningRate: null
      },
      genetic: {
        population: null,
        mutationRate: null
      },
      player: {
        name: ''
      }
    };
  },
  computed: {
    getInputLayers() {
      return parseInt(this.neuralNetwork.inputLayers, 10);
    }
  },
  methods: {
    changeInputLayersAmount() {
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    startGame() {
      //  Temp
      this.neuralNetwork.inputs = formatInputs(this.neuralNetwork.inputs);
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
      this.$store.commit('changeGenetic', this.genetic);
      this.$store.commit('changePlayerName', this.player.name);
      this.$store.commit('changeGameRunning', true);
      this.$store.commit('changeGameName', 'AppSnake');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
