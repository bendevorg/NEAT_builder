<template>
  <div class="col-md-6" id="gameDescription">
    <div v-for="instruction in getInstructions" :key="instruction.index">
      <h3>{{instruction.name}}</h3>
      <ul>
        <li v-for="item in instruction.items" :key="item.index">
          {{ item.name }} - {{ item.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '../../../utils/API.js';

export default {
  name: 'Instructions',
  props: {
    msg: String
  },
  data: () => {
    return {
      instructions: []
    }
  },
  computed: {
    getInstructions(){
      return this.instructions;
    }
  },
  mounted() {
    API
      .get(`/game/ ${this.$store.getters.gameId} /instructions`)
      .then(response => {
        this.instructions = response.data.msg
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
