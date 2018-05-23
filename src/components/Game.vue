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
  <app-runner/>
  <div class="row" id="gameSetup">
    <app-instruction/>
    <app-input/>
  </div>
  <app-leaderboard/>
  <!-- <script>
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
import Leaderboard from './leaderboard/Leaderboard.vue';
import Runner from './game/Runner.vue';

export default {
  name: "Game",
  data() {
    return {
      game: null
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
    AppInput: Input,
    AppLeaderboard: Leaderboard,
    AppRunner: Runner
  },
  mounted() {
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
