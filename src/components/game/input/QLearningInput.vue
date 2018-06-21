<template>
  <div id="QLearningParams">
    <v-subheader>Q Learning</v-subheader>
    <v-slider 
      v-model="QLearning.amountOfActions" 
      :label="`Inputs: ${QLearning.amountOfActions}`" 
      thumb-label
      ticks
      min="1"
      max="10"
      @input="changeAmountOfActions"
    />
    <div id="input-list">
      <v-flex 
        v-for="index in getAmountOfActions" 
        :key="index"
        d-flex 
        xs12
      >
        <v-text-field 
          v-model="QLearning.inputs[index-1]" 
          :label="`Input ${index}`"
          single-line
        />
      </v-flex>
    </div>
    <v-flex d-flex>
      <v-text-field 
        v-model="QLearning.learningRate" 
        type="number" 
        label="Learning rate"
        placeholder="0.01"
      />
      <v-text-field 
        v-model="QLearning.futureSignificancy" 
        type="number" 
        label="Future reward discount"
        placeholder="0.01"
      />
      <v-text-field 
        v-model="QLearning.probabilityToExplore" 
        type="number" 
        label="Probability to explore"
        placeholder="0.01"
      />
      <v-text-field 
        v-model="QLearning.exploreDecay" 
        type="number" 
        label="Explore rate decay"
        placeholder="0.01"
      />
    </v-flex>
  </div>
</template>

<script>
import formatInputs from '../../../utils/formatInputs';

export default {
  name: 'QLearningInput',
  data() {
    return {
      QLearning: {
        amountOfActions: 1,
        inputs: [],
        learningRate: 0.01,
        futureSignificancy: 0.01,
        probabilityToExplore: 0.01,
        exploreDecay: 0.01
      }
    };
  },
  computed: {
    getAmountOfActions() {
      return parseInt(this.QLearning.amountOfActions, 10);
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
      this.QLearning.inputs = formatInputs(this.QLearning.inputs);
      this.$store.commit('changeQLearning', this.QLearning);
    },
    changeAmountOfActions() {
      this.$store.commit('changeQLearning', this.QLearning);
    },
    loadInputs() {
      if (localStorage.getItem('QLearning_amountOfActions') > 0) {
        this.QLearning.amountOfActions = localStorage.getItem('QLearning_amountOfActions');
      }
      this.QLearning.learningRate = localStorage.getItem('QLearning_learningRate');
      this.QLearning.futureSignificancy = localStorage.getItem('QLearning_futureSignificancy');
      this.QLearning.probabilityToExplore = localStorage.getItem('QLearning_probabilityToExplore');
      this.QLearning.exploreDecay = localStorage.getItem('QLearning_exploreDecay');
      
    },
    saveInputs(){
      localStorage.setItem('QLearning_amountOfActions', this.QLearning.amountOfActions)
      localStorage.setItem('QLearning_learningRate', this.QLearning.learningRate)
      localStorage.setItem('QLearning_futureSignificancy', this.QLearning.futureSignificancy)
      localStorage.setItem('QLearning_probabilityToExplore', this.QLearning.probabilityToExplore)
      localStorage.setItem('QLearning_exploreDecay', this.QLearning.exploreDecay)
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
