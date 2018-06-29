<template>
  <v-content>
    <!-- <v-container> -->
      <v-layout row wrap>
      <!-- <v-flex 
        xs12
    > -->
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
        <v-container v-if="post">
          <div class="game">
            <v-layout id="gameSetup" row wrap>
              <component 
                v-if="gameRunning" 
                :is="currentGame"/>
              <app-instruction v-if="!gameRunning"/>
              <app-input v-if="!gameRunning"/>
              <app-neural-network v-if="gameRunning"/>
              <app-leaderboard/>
            </v-layout>
          </div>
        </v-container>
      <!-- </v-flex> -->
        </v-layout>
    <!-- </v-container> -->
  </v-content>
</template>

<script>
import Instruction from "./instruction/Instruction";
import Input from "./input/Input";
import Leaderboard from "./leaderboard/Leaderboard";
import NeuralNetwork from "./NeuralNetwork";
import Gameover from "../Shared/Gameover";
import Runner from "./games/Runner";
import Snake from "./games/Snake";
import IAHero from "./games/IAHero";
import Cube from "./games/Cube";

export default {
  name: "Game",
  components: {
    AppInstruction: Instruction,
    AppInput: Input,
    AppLeaderboard: Leaderboard,
    AppNeuralNetwork: NeuralNetwork,
    AppGameover: Gameover,
    AppRunner: Runner,
    AppSnake: Snake,
    AppIAHero: IAHero,
    AppCube: Cube
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
    this.$store.commit("changeGameName", to.params.gameName);
    this.updateGame();
    next();
  },
  created() {
    this.$store.commit("changeGameName", this.$route.params.gameName);
    this.updateGame();
  },
  methods: {
    updateGame() {
      this.loading = true;
      this.post = this.error = null;
      const { games } = this.$store.getters;
      const selectedGame = games.find(
        game => game.name === this.$store.getters.gameName
      );
      this.$store.commit("changeGame", selectedGame);
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
