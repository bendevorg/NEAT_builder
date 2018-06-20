<template>
  <div id="leaderboardParams">
    <div>
      <v-text-field 
        v-model="player.name" 
        label="Your AI name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardInput',
  data() {
    return {
      player: {
        name: ''
      }
    };
  },
  created() {
    this.loadInputs();
    this.$parent.$on('start', () => {
      this.changeInputs();
      this.saveInputs();
    });
  },
  methods: {
    changeInputs() {
      this.$store.commit('changePlayerName', this.player.name);
    },
    loadInputs() {
      this.player.name = localStorage.getItem('player_name');
    },
    saveInputs() {
      localStorage.setItem('player_name', this.player.name);
    }
  }
};
</script>

<style lang="stylus" scoped>
#input-list {
  font-family: monospace;
}
</style>
