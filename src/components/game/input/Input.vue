<template>
  <v-flex>
  
    <app-neural-network-input/>
    <app-genetic-algorithm-input/>
    <app-leaderboard-input/>

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
import GeneticAlgorithmInput from './GeneticAlgorithmInput';
import LeaderboardInput from './LeaderboardInput';

export default {
  name: 'Input',
  components: {
    AppNeuralNetworkInput: NeuralNetworkInput,
    AppGeneticAlgorithmInput: GeneticAlgorithmInput,
    AppLeaderboardInput: LeaderboardInput
  },
  methods: {
    startGame() {
      this.$emit('start');
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
