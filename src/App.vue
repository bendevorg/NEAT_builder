<template>
  <v-app>
    <div 
      v-if="loading" 
      class="loading">
      Loading...
    </div>
    <div 
      v-if="error" 
      class="error">
      {{ error }}
    </div>
    <div v-if="post">
      <app-navmenu/>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import Navmenu from './components/Shared/Navmenu';
import API from './utils/API';

export default {
  name: 'App',
  components: {
    appNavmenu: Navmenu
  },
  data() {
    return {
      loading: true,
      error: null,
      post: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      API.get('/games')
        .then(games => {
          this.$store.commit('changeGames', games.data.msg);
          this.loading = false;
          this.post = true;
        })
        .catch(error => {
          console.log('Errow');
          this.error = error;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  img {
    display: block;
    margin: auto;
  }
}
</style>
