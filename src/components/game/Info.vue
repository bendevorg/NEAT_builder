<template>
  <div id="gameInfo" class="row" style="display:none;">
    <div class="col-md-6">
      <p>
        speed:
        <input id="speedSlider" type="range" min="1" max="10" value="1">
        <span id="speed">1</span>
        <br/> generation high score:
        <span id="hs">0</span>
        <br/> all time high score:
        <span id="ahs">0</span>
        <br/> steps:
        <span id="stepsCount">0</span>
        <br/> time spent:
        <span id="timeSpent">0</span> seconds
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameInfo',
  props: {
    msg: String
  },
  computed: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
