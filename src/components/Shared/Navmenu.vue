<template>
  <div class="navmenu">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-subheader>
          Games
        </v-subheader>
        <v-list-tile 
          v-for="game in getGames" 
          :key="game.index"
          :to="{path: `/games/${game.name}`}">
          <v-list-tile-action>
            <v-icon left>label</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ game.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed 
      app
      dark
      class="secondary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>NEAT Builder</v-toolbar-title>
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
