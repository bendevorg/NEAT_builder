<template>
  <v-flex 
    xs12 
    sm6 
    offset-sm3>
    <div 
      v-if="loading" 
      class="loading">
      Loading...
    </div>
    <div 
      v-if="error" 
      class="error">
      {{ error }}
    </div>
    <v-card v-if="post">
      <div class="game">
        <component 
          v-if="gameRunning" 
          :is="currentGame"/>
        <div 
          id="gameSetup" 
          class="row">
          <app-instruction v-if="!gameRunning"/>
          <app-input v-if="!gameRunning"/>
        </div>
        <app-leaderboard/>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import Instruction from './instruction/Instruction';
import Input from './input/Input';
import Leaderboard from './leaderboard/Leaderboard';
import Gameover from '../Shared/Gameover';
import Runner from './games/Runner';
import Snake from './games/Snake';

export default {
  name: 'Game',
  components: {
    AppInstruction: Instruction,
    AppInput: Input,
    AppLeaderboard: Leaderboard,
    AppGameover: Gameover,
    AppRunner: Runner,
    AppSnake: Snake
  },
  data() {
    return {
      loading: true,
      error: false,
      post: false
    };
  },
  computed: {
    currentGame() {
      return `App${this.$route.params.gameName}`;
    },
    getGames() {
      return this.$store.getters.game;
    },
    gameRunning() {
      return this.$store.getters.gameRunning;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit('changeGameName', to.params.gameName);
    this.updateGame();
    next();
  },
  created() {
    this.$store.commit('changeGameName', this.$route.params.gameName);
    this.updateGame();
  },
  methods: {
    updateGame() {
      this.loading = true;
      this.post = this.error = null;
      let games = this.$store.getters.games;
      let game = games.find(game => {
        return game.name == this.$store.getters.gameName;
      });
      this.$store.commit('changeGameId', game.id);
      this.loading = false;
      this.post = true;
    }
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
