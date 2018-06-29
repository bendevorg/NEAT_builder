<template>
  <v-flex xs8 sm5>
    <v-layout row>
      <v-list>
       <v-list-tile>
          <v-list-tile-title class="title">Game Variables</v-list-tile-title>
       </v-list-tile>

        <template v-for="(instruction, index) in instructions">
          <v-container :key="instruction.title">
            <v-list-tile-title>{{ instruction.name }}</v-list-tile-title>
            <div v-for="item in instruction.items" :key="item.title">
              
              <v-list-tile :key="instruction.title">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              
            </div>
          </v-container>
          <v-divider v-if="index + 1 < instructions.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-layout>
  </v-flex>
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
