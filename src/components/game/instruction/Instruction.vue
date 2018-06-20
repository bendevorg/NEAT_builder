<template>
  <div id="gameDescription">
    <div 
      v-for="instruction in instructions" 
      :key="instruction.index">
      <h3>{{ instruction.name }}</h3>
      <ul>
        <li 
          v-for="item in instruction.items" 
          :key="item.index">
          {{ item.name }} - {{ item.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '../../../utils/API';

export default {
  name: 'Instructions',
  data: () => ({
    instructions: []
  }),
  asyncComputed: {
    getInstructions() {
      API.get(`/games/${this.$store.getters.gameId}/instructions`)
        .then(response => {
          this.instructions = response.data.msg;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // Should this be here?
    getInputs() {
      API.get(`/games/${this.$store.getters.gameId}/parameters`)
        .then(response => {
          let inputs = [];
          response.data.msg.forEach(input => {
            inputs[input.name] = input.value;
          })
          this.$store.commit('changeGameInputs', inputs);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
