<template>
  <div class="game">
    <component v-bind:is="currentGame"></component>
    <div class="row" id="gameSetup">
      <app-instruction  v-if="!gameRunning"/>
      <app-input v-if="!gameRunning"/>
    </div>
    <app-leaderboard/>
  </div>
</template>

<script>
import Instruction from "./instruction/Instruction.vue";
import Input from "./input/Input.vue";
import Leaderboard from './leaderboard/Leaderboard.vue';
import Runner from './game/Runner.vue';
import Snake from './game/Snake.vue';

export default {
  name: "Game",
  props: {
    msg: String
  },
  computed: {
    currentGame(){
      return this.$store.getters.gameName;
    },
    gameRunning: function(){
      return this.$store.getters.gameRunning;
    }
  },
  components: {
    AppInstruction: Instruction,
    AppInput: Input,
    AppLeaderboard: Leaderboard,
    AppRunner: Runner,
    AppSnake: Snake
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
