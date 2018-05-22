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

  <app-game-info/>
  <div class="row" id="gameSetup">
    <app-instruction/>
    <app-input/>
  </div>
  <app-leaderboard/>
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
import GameInfo from './game/Info.vue';
import Instruction from "./instruction/Instruction.vue";
import Input from "./input/Input.vue";
import Leaderboard from './leaderboard/Leaderboard.vue';

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
    AppGameInfo: GameInfo,
    AppInstruction: Instruction,
    AppInput: Input,
    AppLeaderboard: Leaderboard
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
