<template>
  <v-app>
  <main>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="post">
      <router-view/>
      <app-navmenu/>
    </div>
  </main>
  </v-app>
</template>

<script>
import Navmenu from './components/Shared/Navmenu.vue';
import API from './utils/API.js';

export default {
  name: 'app',
  data() {
    return {
      loading: true,
      error: null,
      post: null
    };
  },
  methods: {},
  components: {
    appNavmenu: Navmenu
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.error = this.post = null;
      this.loading = true;
      API
        .get('/games')
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
  },
  name: "App"
};
</script>

<<<<<<< HEAD

<style>
=======
<style lang="stylus" scoped>
>>>>>>> af7282a39acc577cb2d3ddeb3f58275894bb81f0
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
