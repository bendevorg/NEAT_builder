<template>
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
    <div id="input-list">
      <v-flex 
        v-for="index in getInputLayers" 
        :key="index"
        d-flex 
        xs12
      >
        <v-text-field 
          v-model="neuralNetwork.inputs[index-1]" 
          :label="`Input ${index}`"
          single-line
          @blur="storeInputIndex(index)"
        />
      </v-flex>
    </div>

    <v-flex d-flex>
      <v-tooltip bottom>
        <v-text-field 
          v-model="neuralNetwork.hiddenLayers" 
          type="number" 
          name="Hidden Layers" 
          label="Hidden layers"
          placeholder="5"
          slot="activator"
        />
        <span>HIDDEN'S TOOLTIP</span>
      </v-tooltip>

      <v-tooltip bottom>
        <v-text-field 
          v-model="neuralNetwork.learningRate" 
          type="number" 
          name="Learning Rate" 
          label="Learning rate"
          min="0"
          max="1"
          step="0.1"
          placeholder="0.2"
          slot="activator"
        />
        <span>LEARNIN'S TOOLTIP</span>
      </v-tooltip>
    </v-flex>

    <v-divider/>
  </div>
</template>

<script>
import formatInputs from '../../../utils/formatInputs';

export default {
  name: 'NeuralNetworkInput',
  data() {
    return {
      neuralNetwork: {
        inputLayers: 1,
        inputs: [],
        literalInputs: [],
        hiddenLayers: null,
        learningRate: null
      }
    };
  },
  computed: {
    getInputLayers() {
      return parseInt(this.neuralNetwork.inputLayers, 10);
    },
  },
  created() {
    this.loadInputs();
    this.$parent.$on('start', () => {
      this.saveInputs();
      this.changeInputs();
    });
  },
  methods: {
    changeInputs() {
      this.neuralNetwork.literalInputs = this.neuralNetwork.inputs;
      this.neuralNetwork.inputs = formatInputs(this.neuralNetwork.inputs);
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    changeInputLayersAmount() {
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    storeInputIndex(index){
      this.$store.commit('changeBlurInput', index);
    },
    loadInputs() {
      if (
        localStorage.getItem(`neural_inputs_${this.$store.getters.gameName}`) &&
        localStorage.getItem(`neural_inputs_${this.$store.getters.gameName}`).length > 0
      ) {
        localStorage
          .getItem(`neural_inputs_${this.$store.getters.gameName}`)
          .split(',')
          .forEach(input => {
            if (input && input.trim().length > 0) this.neuralNetwork.inputs.push(input);
          });
      }
      this.neuralNetwork.inputLayers = localStorage.getItem(
        `neural_inputLayers_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`neural_inputLayers_${this.$store.getters.gameName}`)
        : this.neuralNetwork.inputLayers;
      this.neuralNetwork.hiddenLayers = localStorage.getItem(
        `neural_hiddenLayers_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`neural_hiddenLayers_${this.$store.getters.gameName}`)
        : this.neuralNetwork.hiddenLayers;
      this.neuralNetwork.learningRate = localStorage.getItem(
        `neural_learningRate_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`neural_learningRate_${this.$store.getters.gameName}`)
        : this.neuralNetwork.learningRate;
    },
    saveInputs() {
      localStorage.setItem(
        `neural_inputs_${this.$store.getters.gameName}`,
        this.neuralNetwork.inputs.slice()
      );
      localStorage.setItem(
        `neural_inputLayers_${this.$store.getters.gameName}`,
        this.neuralNetwork.inputLayers
      );
      localStorage.setItem(
        `neural_hiddenLayers_${this.$store.getters.gameName}`,
        this.neuralNetwork.hiddenLayers
      );
      localStorage.setItem(
        `neural_learningRate_${this.$store.getters.gameName}`,
        this.neuralNetwork.learningRate
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
