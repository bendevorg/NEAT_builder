<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Game msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Game from './components/Game.vue';

export default {
  name: 'app',
  methods: {},
  components: {
    Game
  }
};
</script>

<style lang="stylus" scoped>
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
