<template>
  <div class="row" id="leaderboard">
    <div class="col-md-6">
      <h3 class="text-left">LEADERBOARD</h3>
      <table class="table table-striped" id="highScoreTable">
        <thead id="leaderboardTable"> 
          <tr>
            <th>Name</th>
            <th>High Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Entry from './Entry.vue';

export default {
  name: 'Leaderboard',
  props: {
    msg: String
  },
  computed: {
  },
  components: {
    Entry
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
