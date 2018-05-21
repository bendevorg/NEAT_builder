<template>
  <div class="mb-1 box-shadow" id="gameDescription">
      <h3>Bird variables</h3>
      <ul>
        <li v-for="birdVar in birdInput" :key="birdVar.index">
          {{ birdVar.varname }} - {{ birdVar.description }}
        </li>
      </ul>

      <h3>Pipes variables</h3>
      <ul>
        <li>pipes.closest.x (Closest x pipe)</li>
        <li>pipes.closest.bottom (Closest pipe bottom entrance)</li>
        <li>pipes.closest.top (Closes pipe top entrance)</li>
        <li>pipes.closest.width (Closest pipe width)</li>
        <li>pipes.closest.velocity (Closest pipe velocity (fixed at 6))</li>
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
  <!-- <script>
    let apiUrl = window.location.protocol + '//' + window.location.hostname + ':3340';
    $(document).ready(function() {
      retrieveLeaderboard(1);
    });
    $('#inputLayers').change(function () {
      let amountInputLayers = $('#inputLayers').val();
      $('#inputList').html('');
      $('#inputAmount').html(amountInputLayers);
      for (let i = 0; i < amountInputLayers; i++) {
        $('#inputList').append(`<input type="text" id="input${i}" placeholder="Type your input variable"/>`);
      }
    });
    $('#startGame').on('click', function () {
      setParameters();
      let game = new p5(flappyBird);
    });
  </script> -->

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
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
