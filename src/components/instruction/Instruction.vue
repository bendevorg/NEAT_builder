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

export default {
  name: 'Instructions',
  props: {
    msg: String
  },
  computed: {
    getInstructions(){
      return this.$store.getters.gameInstructions;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
