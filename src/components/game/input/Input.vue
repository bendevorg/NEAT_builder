<template>
  <v-flex>
  
    <app-neural-network-input/>

    <div id="GAParams">
      <v-subheader>Genetic Algorithm</v-subheader>
      <v-flex d-flex>
        <v-text-field 
          v-model="genetic.population" 
          type="number" 
          label="Species per generation"
          placeholder="500"
        />
        <v-text-field 
          v-model="genetic.mutationRate" 
          type="number" 
          label="Mutation rate"
          placeholder="0.01"
        />
      </v-flex>
    </div>

    <div 
      id="leaderboardParams">
      <div>
        <v-text-field 
          v-model="player.name" 
          label="Your AI name"
        />
      </div>
    </div>

    <div>
      <div>
        <v-btn 
          block
          color="primary" 
          @click="startGame">Start</v-btn>
      </div>
    </div>
  </v-flex>
</template>

<script>
import NeuralNetworkInput from './NeuralNetworkInput';

export default {
  name: 'Input',
  components: {
    AppNeuralNetworkInput: NeuralNetworkInput
  },
  data() {
    return {
      genetic: {
        population: null,
        mutationRate: null
      },
      player: {
        name: ''
      }
    };
  },
  created() {
    this.loadGeneticInputs();
    this.loadPlayerInputs();
  },
  methods: {
    changeInputLayersAmount() {
      this.$store.commit('changeNeuralNetwork', this.neuralNetwork);
    },
    startGame() {
      this.$emit('start');
      this.$store.commit('changeGenetic', this.genetic);
      this.$store.commit('changePlayerName', this.player.name);
      this.$store.commit('changeGameRunning', true);
      this.saveGeneticInputs();
      this.savePlayerInputs();
    },
    saveGeneticInputs(){
      localStorage.setItem('genetic_population', this.genetic.population)
      localStorage.setItem('genetic_mutationRate', this.genetic.mutationRate)
    },
    savePlayerInputs(){
      localStorage.setItem('player_name', this.player.name)
    },
    loadGeneticInputs(){
      this.genetic.population = localStorage.getItem('genetic_population');
      this.genetic.mutationRate = localStorage.getItem('genetic_mutationRate');
    },
    loadPlayerInputs(){
      this.player.name = localStorage.getItem('player_name');
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
