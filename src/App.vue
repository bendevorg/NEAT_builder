<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Flappy msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Flappy from './components/Flappy.vue'

export default {
  name: 'app',
  components: {
    Flappy
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
