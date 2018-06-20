<template>
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
</template>

<script>

export default {
  name: 'GeneticAlgorithmInput',
  data() {
    return {
      genetic: {
        population: null,
        mutationRate: null
      }
    };
  },
  computed: {
    getInputLayers() {
      return parseInt(this.neuralNetwork.inputLayers, 10);
    }
  },
  created() {
    this.loadInputs();
    this.$parent.$on('start', () => {
      this.changeInputs();
      this.saveInputs();
    });
  },
  methods: {
    changeInputs() {
      this.$store.commit('changeGenetic', this.genetic);
    },
    loadInputs(){
      this.genetic.population = localStorage.getItem('genetic_population');
      this.genetic.mutationRate = localStorage.getItem('genetic_mutationRate');
    },
    saveInputs(){
      localStorage.setItem('genetic_population', this.genetic.population)
      localStorage.setItem('genetic_mutationRate', this.genetic.mutationRate)
    },
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
