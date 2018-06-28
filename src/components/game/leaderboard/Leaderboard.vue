<template>
  <v-flex id="leaderboard" xs10>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline">Leaderboard</h3>
        </div>
      </v-card-title>
      <div>
        <table 
          id="highScoreTable" 
          class="table table-striped">
          <thead id="leaderboardTable"> 
            <tr>
              <th>Name</th>
              <th>High Score</th>
              <th>Time</th>
            </tr>
            <tr 
              v-for="entry in getEntries" 
              :key="entry.index">
              <th>{{ entry.name }}</th>
              <th>{{ entry.score }}</th>
              <th>{{ entry.time }}</th>
            </tr>
          </thead>
          <tbody/>
        </table>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import API from '../../../utils/API';

export default {
  name: 'Leaderboard',
  data: () => ({
      entries: []
    }),
  asyncComputed: {
    getEntries(){
      return API
        .get(`/leaderboard/${this.$store.getters.gameId}`)
        .then(response => {
          this.entries = response.data.msg;
          return this.entries;
        })
        .catch(err => {
          console.log(err);
          return [];
        });
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
