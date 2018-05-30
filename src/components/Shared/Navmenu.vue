
<template>

  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="game in getGames" :key="game.index">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="'/games/' + game.name">{{game.name}}</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <app-content/>
  </v-app>
</template>

<script>
import Content from "./Content.vue"
import API from '../../utils/API.js';

export default {
  data() {
    return {
      games: [], 
      drawer: false
    };
  },
  computed: {
    getGames(){
      return this.games;
    }
  },
  beforeCreate() {
    API
      .get('/games')
      .then(games => {
        this.games = games.data.msg;
      })
      .catch(err => {
        console.log('Errow')
      });
  },
  components: {
    appContent: Content
  },
  name: "Navmenu"
};
</script>