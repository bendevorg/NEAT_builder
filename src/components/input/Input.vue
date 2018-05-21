<template>
  <div class="hello">
      <h1>total</h1>  
      <p>{{ inputTotal }}</p>
      <!-- eslint-disable-next-line -->
      <ul>
        <li v-for="input in inputTotal" :key="input.index">
          {{ input.name }}
        </li>
      </ul>
  <div class="row">
    <div class="col-md-6" id="canvascontainer"></div>
  </div>

  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3" />
    <b-form-select v-model="selected" :options="options" class="mb-3" size="sm" />
    <div>Selected: <strong>{{ selected }}</strong></div>
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
          <span id="inputAmount">1</span>
          <input type="range" id="inputLayers" min="1" max="10" step="1" value="1" placeholder="Input Layers" />
          <div id="inputList">
              <input type="text" id="input0" placeholder="Type your input variable"/>
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
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: {'C': '3PO'}, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  },
  computed: {
    inputTotal () {
      return this.$store.getters.getInputTotal
    }
  },
}
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
