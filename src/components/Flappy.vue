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
      <app-instruction></app-instruction>
      <app-input></app-input>
  </div>
  <div class="row" id="leaderboard">
    <div class="col-md-6">
      <h3 class="text-left">LEADERBOARD</h3>
      <table class="table table-striped" id="highScoreTable">
        <thead id="leaderboardTable"> 
          <tr>
            <th>Name</th>
            <th>High Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <script>
    let apiUrl = window.location.protocol + '//' + window.location.hostname + ':3340';
    $(document).ready(function() {
      retrieveLeaderboard(1);
    });
    $('#inputLayers').change(function () {
      let amountInputLayers = $('#inputLayers').val();
      $('#inputList').html('');
      $('#inputAmount').html(amountInputLayers);
      for (let i = 0; i < amountInputLayers; i++) {
        $('#inputList').append(`<input type="text" id="input${i}" placeholder="Type your input variable"/>`);
      }
    });
    $('#startGame').on('click', function () {
      setParameters();
      let game = new p5(flappyBird);
    });
  </script> -->

  </div>
</template>

<script>
import Instruction from "./instruction/Instruction.vue";
import Input from "./input/Input.vue";
export default {
  name: "Flappy",
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true }
      ]
    };
  },
  props: {
    msg: String
  },
  computed: {
    inputTotal() {
      return this.$store.getters.getInputTotal;
    }
  },
  components: {
    AppInstruction: Instruction,
    AppInput: Input
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
