<template>
  <v-flex xs6 sm7>
      <v-select
        :items="AIList"
        v-model="AIType"
        label="Choose your AI type"
        class="input-group--focused"
        item-value="text"
      ></v-select>
    <app-neural-network-input v-if="AITypes.neuralNetwork.includes(AIType)"/>
    <app-q-learning-input v-if="AITypes.QLearning.includes(AIType)"/>
    <app-genetic-algorithm-input v-if="AITypes.genetic.includes(AIType)"/>
    <app-leaderboard-input/>

    <div>
      <v-btn 
        block
        color="primary" 
        @click="startGame">Start</v-btn>
    </div>
  </v-flex>
</template>

<script>
import NeuralNetworkInput from './NeuralNetworkInput';
import QLearningInput from './QLearningInput';
import GeneticAlgorithmInput from './GeneticAlgorithmInput';
import LeaderboardInput from './LeaderboardInput';
import AITypes from '../../../utils/AITypes';

export default {
  name: 'Input',
  components: {
    AppNeuralNetworkInput: NeuralNetworkInput,
    AppQLearningInput: QLearningInput,
    AppGeneticAlgorithmInput: GeneticAlgorithmInput,
    AppLeaderboardInput: LeaderboardInput
  },
  data() {
    return {
      AIType: '',
      AITypes: AITypes,
      AIList: AITypes.list
    }
  },
  methods: {
    startGame() {
      this.$emit('start');
      this.$store.commit('changeBrainType', this.AIType);
      this.$store.commit('changeGameRunning', true);
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
