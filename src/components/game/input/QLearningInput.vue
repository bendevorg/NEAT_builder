<template>
  <div id="QLearningParams">
    <v-subheader>Q Learning</v-subheader>
    <v-slider 
      v-model="QLearning.amountOfInputs" 
      :label="`Inputs: ${QLearning.amountOfInputs}`" 
      thumb-label
      ticks
      min="1"
      max="10"
      @input="changeAmountOfInputs"
    />
    <div id="input-list">
      <v-flex 
        v-for="index in getamountOfInputs" 
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
        amountOfInputs: 1,
        inputs: [],
        learningRate: 0.01,
        futureSignificancy: 0.01,
        probabilityToExplore: 0.01,
        exploreDecay: 0.01
      }
    };
  },
  computed: {
    getamountOfInputs() {
      return parseInt(this.QLearning.amountOfInputs, 10);
    }
  },
  created() {
    this.loadInputs();
    this.$parent.$on('start', () => {
      this.saveInputs();
      this.changeInputs();
    });
  },
  methods: {
    changeInputs() {
      this.QLearning.inputs = formatInputs(this.QLearning.inputs);
      this.$store.commit('changeQLearning', this.QLearning);
    },
    changeAmountOfInputs() {
      this.$store.commit('changeQLearning', this.QLearning);
    },
    loadInputs() {
      if (
        localStorage.getItem(`QLearning_inputs_${this.$store.getters.gameName}`) &&
        localStorage.getItem(`QLearning_inputs_${this.$store.getters.gameName}`).length > 0
      ) {
        localStorage
          .getItem(`QLearning_inputs_${this.$store.getters.gameName}`)
          .split(',')
          .forEach(input => {
            if (input && input.trim().length > 0) this.QLearning.inputs.push(input);
          });
      }
      this.QLearning.amountOfInputs = localStorage.getItem(
        `QLearning_amountOfInputs_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`QLearning_amountOfInputs_${this.$store.getters.gameName}`)
        : this.QLearning.amountOfInputs;
      this.QLearning.learningRate = localStorage.getItem(
        `QLearning_learningRate_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`QLearning_learningRate_${this.$store.getters.gameName}`)
        : this.QLearning.learningRate;
      this.QLearning.futureSignificancy = localStorage.getItem(
        `QLearning_futureSignificancy_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`QLearning_futureSignificancy_${this.$store.getters.gameName}`)
        : this.QLearning.futureSignificancy;
      this.QLearning.probabilityToExplore = localStorage.getItem(
        `QLearning_probabilityToExplore_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`QLearning_probabilityToExplore_${this.$store.getters.gameName}`)
        : this.QLearning.probabilityToExplore;
      this.QLearning.exploreDecay = localStorage.getItem(
        `QLearning_exploreDecay_${this.$store.getters.gameName}`
      )
        ? localStorage.getItem(`QLearning_exploreDecay_${this.$store.getters.gameName}`)
        : this.QLearning.exploreDecay;
    },
    saveInputs() {
      localStorage.setItem(
        `QLearning_inputs_${this.$store.getters.gameName}`,
        this.QLearning.inputs.slice()
      );
      localStorage.setItem(
        `QLearning_amountOfInputs_${this.$store.getters.gameName}`,
        this.QLearning.amountOfInputs
      );
      localStorage.setItem(
        `QLearning_learningRate_${this.$store.getters.gameName}`,
        this.QLearning.learningRate
      );
      localStorage.setItem(
        `QLearning_futureSignificancy_${this.$store.getters.gameName}`,
        this.QLearning.futureSignificancy
      );
      localStorage.setItem(
        `QLearning_probabilityToExplore_${this.$store.getters.gameName}`,
        this.QLearning.probabilityToExplore
      );
      localStorage.setItem(
        `QLearning_exploreDecay_${this.$store.getters.gameName}`,
        this.QLearning.exploreDecay
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
