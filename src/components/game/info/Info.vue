<template>
  <div id="gameInfo" class="row">
    <div class="col-md-6">
      <p>
        speed:
        <input id="speedSlider" type="range" min="1" max="10" value="1" v-model="speed" @input="changeSpeed">
        <span id="speed">{{speed}}</span>
        <br/> generation high score:
        <span id="generationHighScore">{{getGenerationHighScore}}</span>
        <br/> all time high score:
        <span id="allTimeHighScore">{{getAllTimeHighScore}}</span>
        <br/> current species:
        <span id="currentSpecies">{{getSpeciesAmount}}</span>
        <br/> current generation:
        <span id="currentGeneration">{{getCurrentGeneration}}</span>
        <br/> steps:
        <span id="stepsCount">{{getSteps}}</span>
        <br/> time spent:
        <span id="timeSpent">{{getTimeSpent}}</span> seconds
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameInfo',
  data () {
    return {
      speed: 1,
    };
  },
  props: {
    msg: String
  },
  computed: {
    getGenerationHighScore() {
      return this.$store.getters.generationHighScore;
    },
    getAllTimeHighScore() {
      return this.$store.getters.allTimeHighScore;
    },
    getSpeciesAmount() {
      return this.$store.getters.genetic.speciesAmount;
    },
    getCurrentGeneration() {
      return this.$store.getters.genetic.currentGeneration;
    },
    getSteps() {
      return parseInt(this.$store.getters.steps);
    },
    getTimeSpent() {
      return parseInt(this.$store.getters.timeSpent);
    },
  },
  methods: {
    changeSpeed(){
      this.$store.commit('changeSpeed', this.speed);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
