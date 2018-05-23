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
          <tr v-for="entry in getEntries" :key="entry.index">
            <th>{{entry.name}}</th>
            <th>{{entry.score}}</th>
            <th>{{entry.time}}</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import API from '../../utils/API.js';

export default {
  name: 'Leaderboard',
  data: () => {
    return {
      entries: []
    }
  },
  props: {
    msg: String
  },
  computed: {
    getEntries(){
      return this.entries
    }
  },
  mounted() {
    API
      .get('/leaderboard/' + this.$store.getters.gameId)
      .then(response => {
        this.entries = response.data.msg
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
