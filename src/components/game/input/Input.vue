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
      <p>FIXED Output layers: 2 (jump or do nothing)</p>

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
      localStorage.setItem('inputQt', this.neuralNetwork.inputLayers)
      return parseInt(this.neuralNetwork.inputLayers, 10);
    },
  },
  created() {
    if (localStorage.getItem('inputQt') > 0){
      this.neuralNetwork.inputLayers = localStorage.getItem('inputQt');
    }
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
      localStorage.setItem('inputQt', this.neuralNetwork.inputLayers)
    },
  }
};
</script>

<style lang="stylus" scoped>

</style>
