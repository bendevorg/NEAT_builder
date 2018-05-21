<template>
  <div class="mb-12 box-shadow" id="gameDescription">
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

      <h3>Game variables</h3>
      <ul>
        <li v-for="el in gameInput" :key="el.index">
          {{ el.varname }} - {{ el.description }}
        </li>
      </ul>

      <h3>Objective</h3>
      <ul>
        <li>Reach the highest score within 1000 steps</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  props: {
    msg: String
  },
  computed: {
    birdInput () {
      return this.$store.getters.getBirdInput
    },
    pipeInput () {
      return this.$store.getters.getPipeInput
    },
    gameInput () {
      return this.$store.getters.getGameInput
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
