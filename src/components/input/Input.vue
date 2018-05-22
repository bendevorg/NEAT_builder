<template>
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

    <div id="gameInfo" class="row" style="display:none;">
      <div class="col-md-6">
        <p>
          speed:
          <input id="speedSlider" type="range" min="1" max="10" value="1">
          <span id="speed">1</span>
          <br/> generation high score:
          <span id="hs">0</span>
          <br/> all time high score:
          <span id="ahs">0</span>
          <br/> steps:
          <span id="stepsCount">0</span>
          <br/> time spent:
          <span id="timeSpent">0</span> seconds
        </p>
      </div>
    </div>
    <div class="row" id="gameSetup">

      <div class="col-md-6">
        <div class="row" id="NNParams">
          <div class="col-md-6">
            <label>Neural Network</label>
            <br/>
            <label>Inputs: </label>
            <span id="inputCounter">{{ inputAmount }}</span>
            <input type="range" id="inputLayers" min="1" max="10" step="1" v-model="inputAmount" @input="changeVariableInputAmount" placeholder="Input Layers" />
            <div id="inputList">
              <app-variable-input/>
            </div>
            <input type="text" name="Hidden Layers" id="hiddenLayers" placeholder="Hidden Layers" />
            <input type="text" id="learningRate" placeholder="Learning Rate" />
            <p>FIXED Output layers: 2 (jump or do nothing)</p>
          </div>
        </div>
        <div class="row" id="GAParams">
          <div>
            <label>Genetic Algorithm</label>
            <br/>
            <input type="text" id="populationSize" placeholder="Species per generation" />
            <input type="text" id="mutationRate" placeholder="Mutation rate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VariableInput from './VariableInput.vue';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      inputAmount: 1
    };
  },
  computed: {
    totalInput() {
      return this.$store.getters.getTotalInput;
    }
  },
  methods: {
    changeVariableInputAmount(){
      this.$store.commit('changeVariableInputAmount', {
        variableInputAmount: this.inputAmount
      });
    }  
  },
  components: {
    appVariableInput: VariableInput
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
