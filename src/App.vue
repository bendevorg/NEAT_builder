<template>
  <v-app>
  <main>
    <router-view/>
    <app-navmenu/>
  </main>
  </v-app>
</template>

<script>
import Navmenu from "./components/Shared/Navmenu.vue";

export default {
  name: "app",
  data() {
    return {
      title: "Vuetify.js"
    };
  },
  methods: {},
  components: {
    appNavmenu: Navmenu
  },
  name: "App"
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
