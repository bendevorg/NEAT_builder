<template>
  <v-app>
    <v-flex xs12 sm6 offset-sm3>
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <v-card v-if="post">
        <div class="game">
          <component v-bind:is="currentGame" v-if="gameRunning"></component>
          <div class="row" id="gameSetup">
            <app-instruction v-if="!gameRunning"/>
            <app-input v-if="!gameRunning"/>
          </div>
          <app-leaderboard/>
        </div>
      </v-card>
    </v-flex>
  </v-app>
</template>

<script>
import Instruction from './instruction/Instruction.vue';
import Input from './input/Input.vue';
import Leaderboard from './leaderboard/Leaderboard.vue';
import Gameover from './Shared/Gameover.vue';
import Runner from './game/Runner.vue';
import Snake from './game/Snake.vue';

export default {
  name: 'Game',
  data(){
    return {
      loading: true,
      error: false,
      post: false
    };
  },
  computed: {
    currentGame(){
      return `App${this.$route.params.gameName}`;
    },
    getGames(){
      return this.$store.getters.game;
    },
    gameRunning: function(){
      return this.$store.getters.gameRunning;
    }
  },
  components: {
    AppInstruction: Instruction,
    AppInput: Input,
    AppLeaderboard: Leaderboard,
    AppGameover: Gameover,
    AppRunner: Runner,
    AppSnake: Snake
  },
  created() {
    this.$store.commit('changeGameName', this.$route.params.gameName);
    let games = this.$store.getters.games;
    let game = games.find(game => {
      if (game.name == this.$store.getters.gameName)
        return game.id;
      return false;
    });
    this.$store.commit('changeGameId', game.id);
    this.loading = false;
    this.post = true;
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
