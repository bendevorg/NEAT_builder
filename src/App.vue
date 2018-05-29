<template>
  <div id="app">
    <router-view name="menu-top"/>
    <router-view name="right-compo"/>
    <router-view></router-view>
    <!-- <Game msg="Welcome to Your Vue.js App"/> -->
    <router-view name="foot-compo"/>
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "app",
  methods: {
  },
  components: {
    Game
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
