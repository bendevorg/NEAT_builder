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
            <template v-for="item in instruction.items" >
              <v-tooltip :key="item.title" bottom>
                <v-list-tile 
                  ripple
                  slot="activator"
                  @click="doCopy(item.name)"
                  class="list-tile"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <span>Click to copy!</span>
              </v-tooltip>
            </template>

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
  },
  methods: {
    doCopy(str) {
      this.$copyText(str).then(res => {
        console.log(res)
      })
      .catch(err => {
          console.log(err);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  .v-list__tile__sub-title {
    white-space: normal;
  }
  .list-tile >>> .v-list__tile.v-list__tile--link{
    height: 100%;
  }
</style>
