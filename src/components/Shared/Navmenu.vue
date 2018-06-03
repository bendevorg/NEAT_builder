<template>
  <div class="navmenu">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile 
          v-for="game in getGames" 
          :key="game.index">
          <v-list-tile-action>
            <v-icon left>label</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="'/games/' + game.name">{{ game.name }}</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      color="indigo" 
      dark 
      fixed 
      app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import Content from './Content';

export default {
  name: 'Navmenu',
  components: {
    appContent: Content
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    getGames() {
      return this.$store.getters.games;
    }
  }
};
</script>
