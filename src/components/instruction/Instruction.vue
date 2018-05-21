<template>
  <div class="mb-1 box-shadow" id="gameDescription">
      <h3>Bird variables</h3>
      <ul>
        <li v-for="el in birdInput" :key="el.index">
          {{ el.varname }} - {{ el.description }}
        </li>
      </ul>

      <h3>Pipes variables</h3>
      <ul>
        <li v-for="el in pipeInput" :key="el.index">
          {{ el.varname }} - {{ el.description }}
        </li>
      </ul>

      <h3>Game</h3>
      <ul>
        <li>game.height (Height size of game canvas)</li>
        <li>game.width (Width size of game canvas)</li>
      </ul>

      <h3>Objective</h3>
      <ul>
        <li>Reach the highest score within 1000 steps</li>
      </ul>
    
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    birdInput () {
      return this.$store.getters.getBirdInput
    },
    pipeInput () {
      return this.$store.getters.getPipeInput
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
