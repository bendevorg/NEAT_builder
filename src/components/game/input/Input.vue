<template>
  <v-flex>
    <div id="NNParams">
      <v-subheader>Neural Network</v-subheader>
      <v-slider 
        v-model="neuralNetwork.inputLayers" 
        :label="`Inputs: ${neuralNetwork.inputLayers}`" 
        thumb-label
        ticks
        min="1"
        max="10"
        @input="changeInputLayersAmount"
      />
      <div id="inputList">
        <v-flex 
          v-for="index in getInputLayers" 
          :key="index"
          d-flex 
          xs6 
        >
          <v-text-field 
            v-model="neuralNetwork.inputs[index-1]" 
            :label="`Input ${index}`"
            single-line
          />
        </v-flex>
      </div>

      <v-flex d-flex>
        <v-text-field 
          v-model="neuralNetwork.hiddenLayers" 
          type="number" 
          name="Hidden Layers" 
          label="Hidden layers"
          placeholder="5"
        />
        <v-text-field 
          v-model="neuralNetwork.learningRate" 
          type="number" 
          name="Learning Rate" 
          label="Learning rate"
          min="0"
          max="1"
          step="0.1"
          placeholder="0.2"
        />
      </v-flex>

      <v-divider/>
    </div>


    <div id="GAParams">
      <v-subheader>Genetic Algorithm</v-subheader>
      <v-flex d-flex>
        <v-text-field 
          v-model="genetic.population" 
          type="number" 
          label="Species per generation"
          placeholder="500"
        />
        <v-text-field 
          v-model="genetic.mutationRate" 
          type="number" 
          label="Mutation rate"
          placeholder="0.01"
        />
      </v-flex>
    </div>

    <div 
      id="leaderboardParams">
      <div>
        <v-text-field 
          v-model="player.name" 
          label="Your AI name"
        />
      </div>
    </div>

    <div>
      <div>
        <v-btn 
          block
          color="primary" 
          @click="startGame">Start</v-btn>
      </div>
    </div>
  </v-flex>
</template>

<script>
import formatInputs from '../../../utils/formatInputs';

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
  created() {
    this.loadNeuralInputs();
    this.loadGeneticInputs();
    this.loadPlayerInputs();
  },
  methods: {
    changeInputLayersAmount() {
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    startGame() {
      this.neuralNetwork.inputs = formatInputs(this.neuralNetwork.inputs);
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
      this.$store.commit('changeGenetic', this.genetic);
      this.$store.commit('changePlayerName', this.player.name);
      this.$store.commit('changeGameRunning', true);
      this.saveNeuralInputs();
      this.saveGeneticInputs();
      this.savePlayerInputs();
    },
    saveNeuralInputs(){
      localStorage.setItem('neural_inputLayers', this.neuralNetwork.inputLayers)
      localStorage.setItem('neural_hiddenLayers', this.neuralNetwork.hiddenLayers)
      localStorage.setItem('neural_learningRate', this.neuralNetwork.inputLayers)
    },
    saveGeneticInputs(){
      localStorage.setItem('genetic_population', this.genetic.population)
      localStorage.setItem('genetic_mutationRate', this.genetic.mutationRate)
    },
    savePlayerInputs(){
      localStorage.setItem('player_name', this.player.name)
    },
    loadNeuralInputs(){
      if (localStorage.getItem('neural_inputLayers') > 0){
        this.neuralNetwork.inputLayers = localStorage.getItem('neural_inputLayers');
      }
      this.neuralNetwork.hiddenLayers = localStorage.getItem('neural_hiddenLayers');
      this.neuralNetwork.learningRate = localStorage.getItem('neural_learningRate');
    },
    loadGeneticInputs(){
      this.genetic.population = localStorage.getItem('genetic_population');
      this.genetic.mutationRate = localStorage.getItem('genetic_mutationRate');
    },
    loadPlayerInputs(){
      this.player.name = localStorage.getItem('player_name');
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
