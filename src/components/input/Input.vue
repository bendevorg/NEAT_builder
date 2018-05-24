<template>
      <!--
      <div class="col-md-6">
        <div>
          <b-form-select v-model="selected" :options="options" class="mb-3" />
          <b-form-select v-model="selected" :options="options" class="mb-3" size="sm" />
          <div>Selected: <strong>{{ selected }}</strong></div>
        </div>

        <div>
          <h2>Total Inputs</h2>
          <ul>
            <li v-for="input in totalInput" :key="input.index">
              {{ input }}
            </li>
          </ul>
        </div>
      </div>
      -->
  <div class="col-md-6">
    <div class="row" id="NNParams">
      <div class="col-md-6">
        <label>Neural Network</label>
        <br/>
        <label>Inputs: </label>
        <span id="inputCounter">{{ neuralNetwork.inputLayers }}</span>
        <input type="range" id="inputLayers" min="1" max="10" step="1" v-model="neuralNetwork.inputLayers" @input="changeInputLayersAmount" placeholder="Input Layers" />
        <div id="inputList">
          <input type="text" v-for="index in getInputLayers" :key="index" v-model="neuralNetwork.inputs[index-1]" placeholder="Type your input variable"/>
        </div>
        <input type="text" name="Hidden Layers" v-model="neuralNetwork.hiddenLayers" placeholder="Hidden Layers" />
        <input type="text" name="Learning Rate" v-model="neuralNetwork.learningRate" placeholder="Learning Rate" />
        <p>FIXED Output layers: 2 (jump or do nothing)</p>
      </div>
    </div>
    <div class="row" id="GAParams">
      <div class="col-md-6">
        <label>Genetic Algorithm</label>
        <br/>
        <input type="text" v-model="genetic.population"  placeholder="Species per generation" />
        <input type="text" v-model="genetic.mutationRate"  placeholder="Mutation rate" />
      </div>
    </div>
    <div>
      <div class="row" id="leaderboardParams">
        <div class="col-md-6">
          <label>Name</label>
          <input text="text" v-model="player.name" placeholder="Your AI name" />
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
import formatInputs from '../../utils/formatInputs.js';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      neuralNetwork: {
        inputLayers: 1,
        inputs: [],
        hiddenLayers: null,
        learningRate: null,
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
      return parseInt(this.neuralNetwork.inputLayers);
    }
  },
  methods: {
    changeInputLayersAmount(){
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    startGame(){
      //  Temp
      this.neuralNetwork.inputs = formatInputs(this.neuralNetwork.inputs);
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
      this.$store.commit('changeGenetic', this.genetic);
      this.$store.commit('changePlayerName', this.player.name);
      this.$store.commit('changeGameName', 'AppRunner');
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
